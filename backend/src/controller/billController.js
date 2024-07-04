import products from "../models/products";
import billService from "../service/billService";

const createNewBill = async (req, res) => {
    try {
        const { products } = req.body;
        console.log(products)
        if (!products) {
            return res.status(400).json({
                EM: "Missing product!",
                EC: 0
            })
        }
        const response = await billService.handleCreateNewBill(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createNewBill function" in billControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getBills = async (req, res) => {
    try {
        const response = await billService.handleGetBills(req.query);
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

module.exports = { createNewBill, getBills }