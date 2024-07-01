import ProductCategory from "../models/productCategory";

const handleCreateProductCategory = async (data) => {
    try {
        const newProdCategory = await ProductCategory.create(data);
        if (!newProdCategory) {
            return {
                EM: "create new product category failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Create new product category successfully!",
            EC: 0,
            DT: newProdCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleCreateNewProduct function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}


const handleGetAllProdCategory = async () => {
    try {
        const allProdCategory = await ProductCategory.find().select("_id categoryName");
        if (!allProdCategory) {
            return {
                EM: "Get all product category failed!",
                EC: 1,
                DT: []
            }
        }
        return {
            EM: "Get all product category successfully!",
            EC: 0,
            DT: allProdCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetAllProdCategory function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleUpdateProdCategory = async (_pcid, data) => {
    try {
        const updateProdCategory = await ProductCategory.findByIdAndUpdate(_pcid, data, { new: true });
        if (!updateProdCategory) {
            return {
                EM: "Update productCategory failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Update productCategory successfully!",
            EC: 0,
            DT: updateProdCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateProdCategory function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteProdCategory = async (_pcid) => {
    try {
        const deleteProdCategory = await ProductCategory.findByIdAndDelete(_pcid);
        if (!deleteProdCategory) {
            return {
                EM: "Delete productCategory failed!",
                EC: 1,
            }
        }
        return {
            EM: "Delete productCategory successfully!",
            EC: 0
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleDeleteProdCategory function" in productService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

module.exports = {
    handleCreateProductCategory, handleGetAllProdCategory, handleDeleteProdCategory, handleUpdateProdCategory
}