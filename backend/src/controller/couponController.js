const couponService = require("../service/couponService.js");

const createNewCoupon = async (req, res) => {
    try {
        const { title, discount, expiry } = req.body;
        if (!title || !discount || !expiry) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ thông tin tạo phiếu giảm giá!",
                EC: 1
            })
        }
        const response = await couponService.handleCreateNewCoupon(req.body);
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
        console.log(`There is an error in the "createNewCoupon func" in couponController.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}

const getCoupons = async (req, res) => {
    try {
        const response = await couponService.handleGetCoupons();
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
        console.log(`There is an error in the "getCoupons func" in couponController.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: []
        })
    }
}


const getACoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await couponService.handleGetACoupon(cid);
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
        console.log(`There is an error in the "getACoupon func" in couponController.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const updateCoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        if (!cid || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ thông tin phiếu giảm giá!!",
                EC: 1
            })
        }
        const response = await couponService.handleUpdateCoupon(cid, req.body);
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
        console.log(`There is an error in the "updateCoupon func" in couponController.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const deleteCoupon = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await couponService.handleDeleteCoupon(cid);
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
        console.log(`There is an error in the "deleteCoupon func" in couponController.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}

module.exports = {
    createNewCoupon, getACoupon, getCoupons, updateCoupon, deleteCoupon
}