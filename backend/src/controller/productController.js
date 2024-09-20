const productService = require("../service/productService.js");

const createNewProduct = async (req, res) => {
    try {
        const { title, price, options, description, category } = req.body;

        if (!title || !price || options.length < 5 || !description || !category || !req.files) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ dữ liệu!",
                EC: 1
            })
        }

        const response = await productService.handleCreateNewProduct(req.body, req.files);
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
        console.log(`There is an error in the "createNewProduct function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const response = await productService.handleGetProducts(req.query);
        if (response && response.EC === 0) {
            return res.status(200).json({
                totalPages: response.totalPages,
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            totalPages: 0
        })
    } catch (error) {
        console.log(`There is an error in the "getProducts function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const getAProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                EM: "Vui lòng chọn sản phẩm muốn xem!",
                EC: 1
            })
        }
        const response = await productService.handleGetAProduct(slug);
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
        console.log(`There is an error in the "getAProduct function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.body;
        if (!pid) {
            return res.status(400).json({
                EM: "Vui lòng chọn sản phẩm muốn xóa!",
                EC: 1
            })
        }
        const response = await productService.handleDeleteProduct(pid);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        console.log(`There is an error in the "deleteProduct function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { _id, title, price, options, description, category } = req.body;
        console.log("check updateProduct:", req.body);
        console.log("check updateProduct files:", req.files);
        if (!_id || !title || !price || !options || !description || !category) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầu đủ dữ liệu!",
                EC: 1
            })
        }
        const response = await productService.handleUpdateProduct(_id, req.body, req.files);
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
        console.log(`There is an error in the "updateProduct function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}


const ratings = async (req, res) => {
    try {
        const { _id } = req.user;
        const { pid, star } = req.body;
        if (!pid || +star === 0) {
            return res.status(400).json({
                EM: "Vui lòng chọn số sao muốn đánh giá cho sản phẩm!",
                EC: 1
            })
        }
        const response = await productService.handleRatings(_id, req.body);
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
        console.log(`There is an error in the "ratings function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const getRatingByUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const { oid } = req.query;
        console.log("check ,", _id, oid)
        const response = await productService.handleGetRatingByUser(_id, oid);
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
        console.log(`There is an error in the "getRatingOrder function" in productControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
        })
    }

}


module.exports = {
    createNewProduct, getAProduct, getProducts, deleteProduct, updateProduct,
    ratings, getRatingByUser
}