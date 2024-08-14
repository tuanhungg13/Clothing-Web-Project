import products from "../models/products";
import orderService from "../service/orderService";
import jwt from "jsonwebtoken"
const createNewOrder = async (req, res) => {
    try {
        const { products, orderBy } = req.body;
        console.log(products)
        if (!products) {
            return res.status(400).json({
                EM: "Missing product!",
                EC: 0
            })
        }
        if (!orderBy || !orderBy.address || !orderBy.phoneNumber || !orderBy.email) {
            return res.status(400).json({
                EM: "Missing buyer information!",
                EC: 0
            });
        }
        if (req?.headers?.authorization?.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if (decode) req.body.orderBy.user = decode._id
        }
        console.log("check user:", req.body)
        const response = await orderService.handleCreateNewOrder(req.body);
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
            EM: `There is an error in the "getBills function" in billControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

module.exports = { createNewOrder, getOrders }