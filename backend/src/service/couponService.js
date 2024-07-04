import Coupon from "../models/coupon";

const handleCreateNewCoupon = async (data) => {
    try {
        const newCoupon = await Coupon.create({
            ...data,
            expiry: Date.now() + data.expiry * 24 * 60 * 60 * 1000
        });
        if (!newCoupon) {
            return {
                EM: "Create new coupon failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Create new coupon successfully!",
            EC: 0,
            DT: newCoupon
        }
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "handleCreateNewCoupon func" in couponService.js: ${error.message} `,
            EC: 1,
        })
    }
}

const handleGetCoupons = async () => {
    try {
        const coupons = await Coupon.find();
        if (!coupons) {
            return {
                EM: "Get coupons failed!",
                EC: 1,
                DT: []
            }
        }
        return {
            EM: "Get coupons successfully!",
            EC: 0,
            DT: coupons
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetCoupons function" in couponService.js: ${error.message} `,
            EC: 1,
            DT: []
        }
    }
}

const handleGetACoupon = async (_cid) => {
    try {
        const coupon = await Coupon.findById(_cid);
        if (!coupon) {
            return {
                EM: "Get coupon failed!",
                EC: 1,
                DT: []
            }
        }
        return {
            EM: "Get coupon successfully!",
            EC: 0,
            DT: coupon
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetBlog function" in blogService.js: ${error.message} `,
            EC: 1,
            DT: []
        }
    }
}

const handleUpdateCoupon = async (_cid, data) => {
    try {
        if (data.expiry) {
            data.expiry = Date.now() + data.expiry * 24 * 60 * 60 * 1000
        }
        const updateCoupon = await Coupon.findByIdAndUpdate(_cid, data, { new: true });
        if (!updateCoupon) {
            return {
                EM: "Update coupon failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Update coupon successfully!",
            EC: 0,
            DT: updateCoupon
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateCoupon function" in couponService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteCoupon = async (_cid) => {
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(_cid);
        if (!deleteCoupon) {
            return {
                EM: "Delete coupon failed!",
                EC: 1
            }
        }
        return {
            EM: "Delete coupon successfully!",
            EC: 0
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleDeleteCoupon function" in couponService.js: ${error.message} `,
            EC: 1,
        }
    }
}

module.exports = {
    handleCreateNewCoupon, handleGetCoupons, handleGetACoupon, handleUpdateCoupon, handleDeleteCoupon
}