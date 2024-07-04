import couponService from "../service/couponService";

const createNewCoupon = async (req, res) => {
    try {
        const { title, discount, expiry } = req.body;
        if (!title || !discount || !expiry) {
            return res.status(400).json({
                EM: "Missing require parameters!",
                EC: 1
            })
        }
        const response = await couponService.handleCreateNewCoupon(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createNewCoupon func" in couponController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getCoupons = async (req, res) => {
    try {
        const response = await couponService.handleGetCoupons();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getCoupons func" in couponController.js: ${error.message} `,
            EC: 1,
        })
    }
}


const getACoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await couponService.handleGetACoupon(cid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getACoupon func" in couponController.js: ${error.message} `,
            EC: 1,
        })
    }
}


const updateCoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        if (!cid || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Missing require parameters!",
                EC: 1
            })
        }
        const response = await couponService.handleUpdateCoupon(cid, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateCoupon func" in couponController.js: ${error.message} `,
            EC: 1,
        })
    }
}


const deleteCoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await couponService.handleDeleteCoupon(cid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteCoupon func" in couponController.js: ${error.message} `,
            EC: 1,
        })
    }
}

module.exports = {
    createNewCoupon, getACoupon, getCoupons, updateCoupon, deleteCoupon
}