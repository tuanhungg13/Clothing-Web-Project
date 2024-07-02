import Product from "../models/products";
import slugify from 'slugify'

const handleCreateNewProduct = async (data) => {
    try {
        data.slug = slugify(data.title);
        data.size = data.size.split(",");
        data.color = data.color.split(",");
        const newProduct = await Product.create(data);
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
        console.log("check req.query:", data)
        const excluderFields = ["sort", "limit", "page", "fields"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        //Format lại các operators cho đúng cú pháp của mongodb;
        let queryString = JSON.stringify(queries);
        console.log(queryString)
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, condition => `$${condition}`);
        console.log("2:", queryString)
        queryString = JSON.parse(queryString);

        //Filter
        if (queries?.title) {
            queryString.title = { $regex: queries.title, $options: "i" }
            console.log("3:", queryString)
        }
        let queryCommand = Product.find(queryString);

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
                counts
            }
        }
        return ({
            EM: "Get products successfully!",
            EC: 0,
            DT: listProduct,
            counts
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

const handleUpdateProduct = async (pid, data) => {
    try {
        if (data.slug) {
            data.slug = slugify(data.slug);
        }
        if (data.size) {
            data.size = data.size.split(",");
        }
        if (data.color) {
            data.color = data.color.split(",");
        }
        const updateProduct = await Product.findByIdAndUpdate(pid, data, { new: true });
        if (!updateProduct) {
            return {
                EM: "Update product failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Update product successfully!",
            EC: 0,
            DT: updateProduct
        }
    } catch (error) {
        return ({
            EM: `There is an error in the "handleUpdateProduct function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        })
    }
}


const handleRatings = async (_id, data) => {
    try {
        const rating = await Product.findByIdAndUpdate(data.pid, {
            $push: { ratings: { star: data.star, comment: data.comment, postedBy: _id } }
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
        const updatedProduct = await Product.findById(data.pid);
        const ratingsCount = updatedProduct.ratings.length;
        const sumRatings = updatedProduct.ratings.reduce((sum, item) => sum + item.star, 0);
        console.log("check totalRatings: ", ratingsCount, sumRatings)
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
    handleCreateNewProduct, handleGetProducts, handleDeleteProduct, handleUpdateProduct,
    handleRatings
}