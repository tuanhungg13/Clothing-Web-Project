import productService from "../service/productService";

const createNewProduct = async (req, res) => {
    try {
        const { title, description, brand, price } = req.body;
        if (!title || !price || !description || !brand) {
            return res.status(400).json({
                EM: "Missing require parameters",
                EC: 1
            })
        }
        const response = await productService.handleCreateNewProduct(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createNewProduct function" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const response = await productService.handleGetProducts(req.query);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            counts: response.counts
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getProducts function" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        if (!pid) {
            return res.status(400).json({
                EM: "pid not found!",
                EC: 1
            })
        }
        const response = await productService.handleDeleteProduct(pid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteProduct" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        if (!pid || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Missing require parameters",
                EC: 1
            })
        }
        const response = await productService.handleUpdateProduct(pid, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateProduct" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const ratings = async (req, res) => {
    try {
        const { _id } = req.user;
        const { pid, star } = req.body;
        console.log("check pid,start", pid, star)
        if (!pid || !star) {
            return res.status(400).json({
                EM: "Missing require parameters",
                EC: 1
            })
        }
        const response = await productService.handleRatings(_id, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "ratings" in productControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}



module.exports = { createNewProduct, getProducts, deleteProduct, updateProduct, ratings }