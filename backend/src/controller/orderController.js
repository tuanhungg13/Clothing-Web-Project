import orderService from "../service/orderService";
const createNewOrder = async (req, res) => {
    try {
        const { products, orderBy } = req.body;
        const { _id } = req.user;
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

        const response = await orderService.handleCreateNewOrder(req.body, _id);
        if (response.EC === 1) {
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
        return res.status(500).json({
            EM: `There is an error in the "createNewOrder function" in orderControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const response = await orderService.handleGetOrders(req.query);
        return res.status(200).json({
            counts: response.counts,
            EM: response.EM,
            EC: response.EC,
            DT: response.DT

        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getOrders function" in orderControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}


const updateOrderByAdmin = async (req, res) => {
    try {
        const { oid } = req.body;
        if (!oid) {
            return res.status(400).json({
                EM: "Missing input!",
                EC: 1
            })
        }
        const response = await orderService.handleUpdateOrderByAdmin(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
        })

    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateOrderByAdmin function" in orderControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}


const updateOrderByUser = async (req, res) => {
    try {
        const { oid } = req.body;
        if (!oid) {
            return res.status(400).json({
                EM: "Missing input!",
                EC: 1
            })
        }
        const response = await orderService.handleUpdateOrderByUser(req.body)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
        })

    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateOrderByUser function" in orderControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

module.exports = { createNewOrder, getOrders, updateOrderByAdmin, updateOrderByUser }