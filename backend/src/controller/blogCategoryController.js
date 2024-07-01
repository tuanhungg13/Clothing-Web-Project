import prodCategoryService from "../service/prodCategoryService";

const createBlogCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleCreateBlogCategory(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createBlogCategory func" in blogCategoryControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getAllBlogCategory = async (req, res) => {
    try {
        const response = await prodCategoryService.handleGetAllBlogCategory();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getAllBlogCategory func" in blogCategoryControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const updateBlogCategory = async (req, res) => {
    try {
        const { bcid } = req.params;
        console.log("check update:", bcid, req.body.categoryName)
        if (!req.body.categoryName || !bcid) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleUpdateBlogCategory(bcid, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateBlogCategory func" in blogCategoryControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const deleteBlogCategory = async (req, res) => {
    try {
        const { bcid } = req.params;
        if (!bcid) {
            return res.status(400).json({
                EM: "Missing reuire parameter!",
                EC: 1
            })
        }
        const response = await prodCategoryService.handleDeleteBlogCategory(bcid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteBlogCategory func" in blogCategoryControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}


module.exports = {
    createBlogCategory, getAllBlogCategory, updateBlogCategory, deleteBlogCategory
}