const Coupon = require("../models/coupon.js");

const handleCreateNewCoupon = async (data) => {
    try {
        const newCoupon = await Coupon.create({
            ...data,
            expiry: Date.now() + data.expiry * 24 * 60 * 60 * 1000
        });
        if (!newCoupon) {
            throw new Error("Tạo phiếu giảm giá thất bại!")
        }
        return {
            EM: "Tạo phiếu giảm giá thành công!",
            EC: 0,
            DT: newCoupon
        }
    } catch (error) {
        console.log(`There is an error in the "handleCreateNewCoupon func" in couponService.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const handleGetCoupons = async () => {
    try {
        const coupons = await Coupon.find();
        if (!coupons) {
            throw new Error("Lấy danh sách phiếu giảm giá thất bại!")
        }
        return {
            EM: "Lấy danh sách phiếu giảm giá thành công!",
            EC: 0,
            DT: coupons
        }
    } catch (error) {
        console.log(`There is an error in the "handleGetCoupons function" in couponService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: []
        }
    }
}

const handleGetACoupon = async (_cid) => {
    try {
        const coupon = await Coupon.findById(_cid);
        if (!coupon) {
            throw new Error("Lấy phiếu giảm giá thất bại!")
        }
        return {
            EM: "Lấy phiếu giảm giá thành công!",
            EC: 0,
            DT: coupon
        }
    } catch (error) {
        console.log(`There is an error in the "handleGetBlog function" in blogService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
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
            throw new Error("Cập nhật phiếu giảm giá thất bại!")
        }
        return {
            EM: "Cập nhật phiếu giảm giá thành công!",
            EC: 0,
            DT: updateCoupon
        }
    } catch (error) {
        console.log(`There is an error in the "handleUpdateCoupon function" in couponService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteCoupon = async (_cid) => {
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(_cid);
        if (!deleteCoupon) {
            throw new Error("Xóa phiếu giảm giá thất bại!")
        }
        return {
            EM: "Xóa phiếu giảm giá thành công!",
            EC: 0
        }
    } catch (error) {
        console.log(`There is an error in the "handleDeleteCoupon function" in couponService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        }
    }
}

module.exports = {
    handleCreateNewCoupon, handleGetCoupons, handleGetACoupon, handleUpdateCoupon, handleDeleteCoupon
}