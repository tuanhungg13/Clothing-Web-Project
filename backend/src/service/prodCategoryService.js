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

module.exports = {
    handleCreateProductCategory
}