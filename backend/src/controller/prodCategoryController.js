import prodCategoryService from "../service/prodCategoryService";

const createProductCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleCreateProductCategory(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createProductCategory func" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getAllProdCategory = async (req, res) => {
    try {
        const response = await prodCategoryService.handleGetAllProdCategory();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getAllProdCategory func" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const updateProdCategory = async (req, res) => {
    try {
        const { pcid } = req.params;
        console.log("check update:", pcid, req.body.categoryName)
        if (!req.body.categoryName || !pcid) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleUpdateProdCategory(pcid, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateProdCategory func" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const deleteProdCategory = async (req, res) => {
    try {
        const { pcid } = req.params;
        if (!pcid) {
            return res.status(400).json({
                EM: "Missing reuire parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleDeleteProdCategory(pcid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteProdCategory func" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}


module.exports = {
    createProductCategory, getAllProdCategory, updateProdCategory, deleteProdCategory
}