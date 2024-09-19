const ProductCategory = require("../models/productCategory.js");

const handleCreateProductCategory = async (data) => {
    try {
        const newProdCategory = await ProductCategory.create(data);
        if (!newProdCategory) {
            throw new Error("Tạo danh mục sản phẩm thất bại!")
        }
        return {
            EM: "Tạo danh mục sản phẩm thành công!",
            EC: 0,
            DT: newProdCategory
        }
    } catch (error) {
        console.log(`There is an error in the "handleCreateNewProduct function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}


const handleGetAllProdCategory = async () => {
    try {
        const allProdCategory = await ProductCategory.find().select("_id categoryName");
        if (!allProdCategory) {
            throw new Error("Lấy danh sách danh mục sản phẩm thất bại!")
        }
        return {
            EM: "Lấy danh sách danh mục sản phẩm thành công!",
            EC: 0,
            DT: allProdCategory
        }
    } catch (error) {
        console.log(`There is an error in the "handleGetAllProdCategory function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

const handleUpdateProdCategory = async (_pcid, data) => {
    try {
        const updateProdCategory = await ProductCategory.findByIdAndUpdate(_pcid, data, { new: true });
        if (!updateProdCategory) {
            throw new Error("Cập nhật danh mục sản phẩm thất bại!")
        }
        return {
            EM: "Cập nhật danh mục sản phẩm thành công!",
            EC: 0,
            DT: updateProdCategory
        }
    } catch (error) {
        console.log(`There is an error in the "handleUpdateProdCategory function" in productService.js: ${error.message} `)
        return {
            EM: " Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteProdCategory = async (_pcid) => {
    try {
        const deleteProdCategory = await ProductCategory.findByIdAndDelete(_pcid);
        if (!deleteProdCategory) {
            throw new Error("Xóa danh mục sản phẩm thất bại!")
        }
        return {
            EM: "Xóa danh mục sản phẩm thành công!",
            EC: 0
        }
    } catch (error) {
        console.log(`There is an error in the "handleDeleteProdCategory function" in productService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

module.exports = {
    handleCreateProductCategory, handleGetAllProdCategory, handleDeleteProdCategory, handleUpdateProdCategory
}