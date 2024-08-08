import Product from "../models/products";
import slugify from 'slugify'

const handleCreateNewProduct = async (data, files) => {
    try {
        let newProduct;
        data.slug = slugify(data.title);
        data.options = JSON.parse(data.options)
        //tính số lượng tất cả sản phẩm
        const stock = data.options.reduce((total, option) => {
            return total + option.sizeQuantity.reduce((sum, sizeQtt) => {
                return sum + sizeQtt.quantity;
            }, 0);
        }, 0);
        const optionsWithImages = data.options.map((option, index) => ({
            ...option,
            images: files[`option[${index}][images]`].map(file => file.path)
        }));
        newProduct = await Product.create({
            title: data.title,
            price: data.price,
            slug: data.slug,
            description: data.description,
            brand: data.brand,
            options: optionsWithImages,
            stock: stock,
            discount: data.discount,
            expiry: data.expiry,
            category: data.category
        });

        if (!newProduct) {
            return ({
                EM: "Creating a new product failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Product created successfully!",
            EC: 0,
            DT: newProduct
        }
        )
    } catch (error) {
        return {
            EM: `There is an error in the "handleCreateNewProduct function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}


const handleGetProducts = async (data) => {
    try {
        const queries = { ...data };
        const excluderFields = ["sort", "limit", "page", "fields"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        //Format lại các operators cho đúng cú pháp của mongodb;
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, condition => `$${condition}`);
        queryString = JSON.parse(queryString);

        //Filter
        if (queries?.title) {
            queryString.title = { $regex: queries.title, $options: "i" }
            console.log("3:", queryString)
        }
        let queryCommand = Product.find(queryString).populate("category", "categoryName");

        //sort
        if (data.sort) {
            const sortBy = data.sort.split(",").join(" ")
            queryCommand = queryCommand.sort(sortBy);
        }

        //field limiting
        if (data.fields) {
            const fields = data.fields.split(",").join(" ");
            queryCommand = queryCommand.select(fields);
        }

        //pagination page
        const page = +data.page || 1;
        const limit = +data.limit || process.env.LIMIT_ITEM;
        const offset = (page - 1) * limit;
        queryCommand = queryCommand.skip(offset).limit(limit)

        //Excute query
        const listProduct = await queryCommand.exec();
        const counts = await Product.find(queryString).countDocuments();
        if (!listProduct) {
            return {
                EM: "Get products failed!",
                EC: 1,
                DT: [],
            }
        }
        return ({
            EM: "Get products successfully!",
            EC: 0,
            DT: listProduct,
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetProducts function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {},
            counts: ""
        }
    }
}

const handleGetAProduct = async (slug) => {
    try {
        const product = await Product.findOne({ slug: slug }).populate("category ratings.postedBy", "categoryName userName");
        const allSizes = [...new Set(product.options.flatMap(option => option.sizeQuantity.map(sizeQtt => sizeQtt.size)))];
        if (!product) {
            return {
                EM: "Get a product failed!",
                EC: 1,
                DT: {},
            }
        }
        return {
            EM: "Get a product successfully!",
            EC: 0,
            DT: {
                ...product.toObject(),
                allSizes: allSizes
            }
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleAGetProduct function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {},
            quantity: 0
        }
    }
}

const handleDeleteProduct = async (pid) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(pid);
        if (!deleteProduct) {
            return {
                EM: "Delete product failed!",
                EC: 1
            }
        }
        return {
            EM: "Delete product successfully!",
            EC: 0
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleDeleteProduct function" in productService.js: ${error.message} `,
            EC: 1,
        }
    }
}

const handleUpdateProduct = async (pid, optId, sqttId, data) => {
    try {
        if (data.title) {
            dataUpdate.slug = slugify(data.title);
        }
        let updateProduct;

        // Nếu có optId và sqttId, cập nhật cả quantity của sizeQuantity trong options
        if (optId && sqttId) {
            updateProduct = await Product.findOneAndUpdate(
                {
                    _id: pid,
                    'options._id': optId,
                    'options.sizeQuantity._id': sqttId
                },
                {
                    $set: {
                        'options.$[opt].sizeQuantity.$[sqtt].quantity': data.quantity
                    }
                },
                {
                    new: true,
                    arrayFilters: [
                        { 'opt._id': optId },
                        { 'sqtt._id': sqttId }
                    ]
                }
            ).populate("category", "categoryName");
            updateProduct.stock = updateProduct.options.reduce((total, option) => {
                return total + option.sizeQuantity.reduce((sum, sizeQtt) => {
                    return sum + sizeQtt.quantity;
                }, 0);
            }, 0);
            await updateProduct.save()
        } else {
            // Nếu không có optId và sqttId, chỉ cập nhật thông tin cơ bản
            if (data.description) data.description = JSON.parse(data.description)
            updateProduct = await Product.findByIdAndUpdate(
                pid, data, { new: true }).populate("category", "categoryName");
        }

        if (!updateProduct) {
            return {
                EM: "Update product failed!",
                EC: 1,
                DT: {}
            };
        }

        return {
            EM: "Update product successfully!",
            EC: 0,
            DT: updateProduct
        };
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateProduct function" in productService.js: ${error.message}`,
            EC: 1,
            DT: {}
        };
    }
};




const handleRatings = async (_id, data) => {
    try {
        //Tìm sản phẩm và đẩy đánh giá người dùng vào mảng ratings của sản phẩm đó
        const rating = await Product.findByIdAndUpdate(data.pid, {
            $push: { ratings: { star: data.star, comment: data.comment, postedBy: _id, createdAt: Date.now() } }
        }, {
            new: true
        });
        if (!rating) {
            return {
                EM: "Rating failed!",
                EC: 1,
                DT: []
            }
        }
        const updatedProduct = await Product.findById(data.pid).populate("ratings.postedBy", "userName");
        //Số lượt đánh giá
        const ratingsCount = updatedProduct.ratings.length;
        //Tổng sao đán giá
        const sumRatings = updatedProduct.ratings.reduce((sum, item) => sum + item.star, 0);
        console.log("check totalRatings: ", ratingsCount, sumRatings)
        //Tổng sao trung bình
        updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingsCount) / 10;
        await updatedProduct.save();
        return {
            EM: "Rating successfully!",
            EC: 0,
            DT: updatedProduct
        }
    } catch (error) {
        return ({
            EM: `There is an error in the "handleRatings function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        })
    }
}



module.exports = {
    handleCreateNewProduct, handleGetAProduct, handleGetProducts, handleDeleteProduct, handleUpdateProduct,
    handleRatings
}