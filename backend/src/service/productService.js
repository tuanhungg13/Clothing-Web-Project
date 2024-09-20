const Product = require("../models/products.js");
const slugify = require('slugify');
const Order = require("../models/order.js")

const handleCreateNewProduct = async (data, files) => {
    try {
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
        const newProduct = await Product.create({
            title: data.title,
            price: data.price,
            slug: data.slug,
            description: data.description,
            brand: data.brand,
            options: optionsWithImages,
            stock: stock,
            category: data.category
        });

        if (!newProduct) {
            return ({
                EM: "Tạo sản phẩm thất bại!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Tạo sản phẩm thành công!",
            EC: 0,
            DT: newProduct
        }
        )
    } catch (error) {
        console.log(`There is an error in the "handleCreateNewProduct function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}


const handleGetProducts = async (data) => {
    try {
        const queries = { ...data };
        const excluderFields = ["sort", "limit", "page"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        //Format lại các operators cho đúng cú pháp của mongodb;
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, condition => `$${condition}`);
        queryString = JSON.parse(queryString);

        //Filter
        if (queries.size) {
            queryString["options"] = {
                $elemMatch: {
                    sizeQuantity: {
                        $elemMatch: {
                            size: queries.size,
                            quantity: { $gt: 0 }
                        }
                    }
                }
            };
        }


        if (queries?.title) {
            queryString.title = { $regex: `.*${queries.title}.*`, $options: "i" };
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
        const totalPages = Math.ceil(counts / limit);
        if (!listProduct) {
            return {
                EM: "Lấy danh sách sản phẩm thất bại!",
                EC: 1,
                DT: [],
                totalPages: 0
            }
        }
        return ({
            EM: "Lấy danh sách sản phẩm thành công!",
            EC: 0,
            DT: listProduct,
            totalPages: totalPages
        })
    } catch (error) {
        console.log(`There is an error in the "handleGetProducts function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra.Vui lòng thử lại!",
            EC: 1,
            DT: {},
            totalPages: 0
        }
    }
}

const handleGetAProduct = async (slug) => {
    try {
        const product = await Product.findOne({ slug: slug }).populate("category ratings.postedBy", "categoryName userName avatar");
        const allSizes = [...new Set(product.options.flatMap(option => option.sizeQuantity.map(sizeQtt => sizeQtt.size)))];
        if (!product) {
            return {
                EM: "Lấy thông tin sản phẩm thất bại!",
                EC: 1,
                DT: {},
            }
        }
        return {
            EM: "Lấy thông tin sản phẩm thành công!",
            EC: 0,
            DT: {
                ...product.toObject(),
                allSizes: allSizes
            }
        }
    } catch (error) {
        console.log(`There is an error in the "handleAGetProduct function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra.Vui lòng thử lại!",
            EC: 1,
            DT: {},
        }
    }
}

const handleDeleteProduct = async (pid) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(pid);
        if (!deleteProduct) {
            return {
                EM: "Xóa sản phẩm thất bại!",
                EC: 1
            }
        }
        return {
            EM: "Xóa sản phẩm thành công!",
            EC: 0
        }
    } catch (error) {
        console.log(`There is an error in the "handleDeleteProduct function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        }
    }
}

const handleUpdateProduct = async (pid, data, files) => {
    try {
        data.options = JSON.parse(data.options)
        if (data.title) {
            data.slug = slugify(data.title);
        }
        const stock = data.options.reduce((total, option) => {
            return total + option.sizeQuantity.reduce((sum, sizeQtt) => {
                return sum + sizeQtt.quantity;
            }, 0);
        }, 0);
        const optionsWithImages = data.options.map((option, index) => {
            // Lọc bỏ các image rỗng hoặc không hợp lệ
            const filteredImages = (option.images || []).filter(image => image && typeof image === 'string');
            return {
                ...option,
                images: [
                    ...filteredImages,
                    ...(files[`option[${index}][images]`]?.length > 0 ? files[`option[${index}][images]`].map(file => file.path) : [])
                ]
            }
        })
        const updateProduct = await Product.findByIdAndUpdate(pid, {
            title: data.title,
            price: +data.price,
            slug: data.slug,
            description: data.description,
            brand: data.brand,
            options: optionsWithImages,
            stock: stock,
            category: data.category
        }, { new: true });

        if (!updateProduct) {
            return {
                EM: "Cập nhật sản phẩm thát bại!",
                EC: 1,
                DT: {}
            };
        }

        return {
            EM: "Cập nhật sản phẩm thành công!",
            EC: 0,
            DT: updateProduct
        };
    } catch (error) {
        console.log(`There is an error in the "handleUpdateProduct function" in productService.js: ${error.message}`)
        return {
            EM: "Có lỗi xảy ra.Vui lòng thử lại",
            EC: 1,
            DT: {}
        };
    }
};




const handleRatings = async (uid, data) => {
    try {
        //Tìm sản phẩm và đẩy đánh giá người dùng vào mảng ratings của sản phẩm đó
        const rating = await Product.findByIdAndUpdate(data.pid, {
            $push: {
                ratings: {
                    star: data.star,
                    comment: data.comment,
                    postedBy: uid,
                    createdAt: Date.now(),
                    orderInfor: data.orderInfor
                }
            }
        }, {
            new: true
        });
        if (!rating) {
            return {
                EM: "Đánh giá sản phẩm thất bại!",
                EC: 1,
                DT: []
            }
        }
        const updateStatusOrder = await Order.findByIdAndUpdate(data.orderInfor, { status: "Đã đánh giá" })
        const updatedProduct = await Product.findById(data.pid).populate("ratings.postedBy", "userName");
        //Số lượt đánh giá
        const ratingsCount = updatedProduct.ratings.length;
        //Tổng sao đán giá
        const sumRatings = updatedProduct.ratings.reduce((sum, item) => sum + item.star, 0);
        //Tổng sao trung bình
        updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingsCount) / 10;
        await updatedProduct.save();
        return {
            EM: "Đánh giá sản phẩm thành công!",
            EC: 0,
            DT: updatedProduct
        }
    } catch (error) {
        console.log(`There is an error in the "handleRatings function" in productService.js: ${error.message} `)
        return ({
            EM: "Có lỗi xảy ra.Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const handleGetRatingByUser = async (uid, oid) => {
    try {
        console.log(oid)
        const order = await Order.findById(oid).populate('products.product').exec();
        console.log(order)
        if (!order) {
            return {
                EM: "Không tìm thấy đơn hàng!",
                EC: 1,
                DT: []
            };
        }
        // 2. Tạo danh sách sản phẩm và các thuộc tính liên quan từ đơn hàng
        const results = order.products.map(item => {
            const product = item.product; // Lấy thông tin sản phẩm từ đơn hàng
            // Lọc các đánh giá phù hợp với `uid` và `oid`
            const matchingRatings = product.ratings.find(rating =>
                rating.postedBy.toString() === uid &&
                rating.orderInfor.toString() === oid
            );
            return {
                productInfo: {
                    title: product.title,
                    price: product.price,
                    options: product.options,
                },
                orderDetails: {
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price
                },
                ratings: matchingRatings
            };
        });

        return {
            EM: "Lấy thông tin sản phẩm và đánh giá thành công!",
            EC: 0,
            DT: results
        };

    } catch (error) {
        console.log(`There is an error in the "handleGetRatingByUser function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
            DT: []
        };
    }
};



module.exports = {
    handleCreateNewProduct, handleGetAProduct, handleGetProducts, handleDeleteProduct, handleUpdateProduct,
    handleRatings, handleGetRatingByUser
}