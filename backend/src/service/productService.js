import Product from "../models/products";
import slugify from 'slugify'

const handleCreateNewProduct = async (data) => {
    try {
        data.slug = slugify(data.title);
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


const handleGetAllProducts = async () => {
    try {
        const allProduct = await Product.find();
        if (!allProduct) {
            return ({
                EM: "get all products failed!!",
                EC: 1,
                DT: []
            })
        }
        return ({
            EM: " Get all products successfully!",
            EC: 0,
            DT: allProduct
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetAllProducts function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
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

module.exports = { handleCreateNewProduct, handleGetAllProducts, handleDeleteProduct, handleUpdateProduct }