const orderService = require("../service/orderService.js");
const jwt = require("jsonwebtoken")
const createNewOrder = async (req, res) => {
    try {
        const { products, orderBy } = req.body;
        if (req?.headers?.authorization?.startsWith("Bearer") && req?.headers?.authorization?.length > 15) {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        EM: "Token không hợp lệ!",
                        EC: 1
                    })
                }
                return decode;
            })
            req.user = decode
        }

        if (!products || products.length <= 0) {
            return res.status(400).json({
                EM: "Không có sản phẩm trong giỏ hàng!",
                EC: 1
            })
        }
        if (!orderBy || !orderBy.address || !orderBy.phoneNumber || !orderBy.email) {
            return res.status(400).json({
                EM: "Thông tin mua hàng không đầy đủ!",
                EC: 1
            });
        }

        const response = await orderService.handleCreateNewOrder(req.body, req.user);
        if (response && response.EC === 1) {
            return res.status(500).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT,
            })
        }
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
        })
    } catch (error) {
        console.log(`There is an error in the "createNewOrder function" in orderControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}

const getOrdersByAdmin = async (req, res) => {
    try {
        const response = await orderService.handleGetOrdersByAdmin(req.query);
        if (response && response.EC === 0) {
            return res.status(200).json({
                totalPages: response.totalPages,
                EM: response.EM,
                EC: response.EC,
                DT: response.DT

            })
        }
        return res.status(500).json({
            totalPages: response.totalPages,
            EM: response.EM,
            EC: response.EC,
            DT: response.DT

        })
    } catch (error) {
        console.log(`There is an error in the "getOrders function" in orderControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: []
        })
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const response = await orderService.handleGetOrdersByUser(_id, req.query);
        if (response && response.EC === 0) {
            return res.status(200).json({
                totalPages: response.totalPages,
                EM: response.EM,
                EC: response.EC,
                DT: response.DT

            })
        }
        return res.status(500).json({
            totalPages: response.totalPages,
            EM: response.EM,
            EC: response.EC,
            DT: response.DT

        })
    } catch (error) {
        console.log(`There is an error in the "getOrdersByUser function" in orderControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }

}


const updateOrderByAdmin = async (req, res) => {
    try {
        const { oid } = req.body;
        if (!oid) {
            return res.status(400).json({
                EM: "Thiếu id đơn hàng!!",
                EC: 1
            })
        }
        const response = await orderService.handleUpdateOrderByAdmin(req.body)
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
        console.log(`There is an error in the "updateOrderByAdmin function" in orderControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const updateOrderByUser = async (req, res) => {
    try {
        const { oid } = req.body;
        if (!oid) {
            return res.status(400).json({
                EM: "Thiếu id đơn hàng!",
                EC: 1
            })
        }
        const response = await orderService.handleUpdateOrderByUser(req.body)
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
        console.log(`There is an error in the "updateOrderByUser function" in orderControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! VUi lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}

module.exports = { createNewOrder, getOrdersByAdmin, updateOrderByAdmin, updateOrderByUser, getOrdersByUser }