const prodCategoryService = require("../service/prodCategoryService.js");

const createProductCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({
                EM: "Thiếu tên danh mục!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleCreateProductCategory(req.body);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`There is an error in the "createProductCategory func" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const getAllProdCategory = async (req, res) => {
    try {
        const response = await prodCategoryService.handleGetAllProdCategory();
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`There is an error in the "getAllProdCategory func" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const updateProdCategory = async (req, res) => {
    try {
        const { pcid } = req.params;
        if (!req.body.categoryName || !pcid) {
            return res.status(400).json({
                EM: "Vui lòng cung cấp đầy đủ thông tin danh mục!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleUpdateProdCategory(pcid, req.body);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`There is an error in the "updateProdCategory func" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const deleteProdCategory = async (req, res) => {
    try {
        const { pcid } = req.params;
        if (!pcid) {
            return res.status(400).json({
                EM: "Vui lòng cung cập thông tin danh mục sản phẩm!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleDeleteProdCategory(pcid);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`There is an error in the "deleteProdCategory func" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}


module.exports = {
    createProductCategory, getAllProdCategory, updateProdCategory, deleteProdCategory
}