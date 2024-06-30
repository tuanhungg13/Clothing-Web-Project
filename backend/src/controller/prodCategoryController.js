import prodCategoryService from "../service/prodCategoryService";

const createProductCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({
                EM: "Missing reuire parameter!",
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

module.exports = {
    createProductCategory
}