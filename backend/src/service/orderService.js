const Order = require("../models/order.js");
const User = require("../models/users.js");
const handleCreateNewOrder = async (data, uid) => {
    try {
        const initialTotalPrice = data?.products?.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        }, 0);
        const totalPrice = (initialTotalPrice + data.shippingPrice) * (1 - (data.discount / 100));
        if (uid) {
            data.orderBy.user = uid
        }
        else {
            data.products = data.products.map(item => {
                const product = {
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.price,
                    color: item.color,
                    size: item.size
                }
                return product
            })
        }

        const newOrder = await Order.create({ ...data, totalPrice: totalPrice, initialTotalPrice: initialTotalPrice });
        if (newOrder && uid) {
            await User.findByIdAndUpdate(data.orderBy.user, {
                cart: []
            })
        }
        if (!newOrder) {
            throw new Error("Tạo đơn hàng thất bại! Vui lòng thử lại!")
        }
        return ({
            EM: "Tạo đơn hàng thành công!",
            EC: 0,
            DT: newOrder
        }
        )
    } catch (error) {
        console.log(`There is an error in the "handleCreateNewOrder function" in orderService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra. Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

const handleGetOrdersByAdmin = async (data) => {
    try {
        const queries = { ...data };
        const excluderFields = ["sort", "limit", "page"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        //Format lại các operators cho đúng cú pháp của mongodb;
        let queryString = JSON.stringify(queries);
        console.log(queryString)
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, condition => `$${condition}`);
        queryString = JSON.parse(queryString);

        //Filter
        if (queries?.title) {
            queryString.title = { $regex: queries.title, $options: "i" }
        }
        let queryCommand = Order.find(queryString).populate("products.product", "title price options");

        //sort
        if (data.sort) {
            const sortBy = data.sort.split(",").join(" ")
            queryCommand = queryCommand.sort(sortBy);
        }

        //pagination page
        const page = +data.page || 1;
        const limit = +data.limit || process.env.LIMIT_ITEM;
        const offset = (page - 1) * limit;
        queryCommand = queryCommand.skip(offset).limit(limit)

        //Excute query
        const listOrder = await queryCommand.exec();
        const counts = await Order.find(queryString).countDocuments();
        const totalPages = Math.ceil(counts / limit);
        if (!listOrder) {
            return {
                EM: "Lấy đơn hàng thất bại!",
                EC: 1,
                DT: [],
                totalPages: 0
            }
        }
        return ({
            EM: "Lấy đơn hàng thành công!",
            EC: 0,
            DT: listOrder,
            totalPages
        })
    } catch (error) {
        console.log(`There is an error in the "handleGetOrdersByAdmin function" in orderService.js: ${error.message} `)
        return {
            EM: `Có lỗi xảy ra. Vui lòng thử lại`,
            EC: 1,
            DT: {},
            totalPages: 0
        }
    }
}

const handleGetOrdersByUser = async (uid, data) => {
    try {
        const queries = { ...data };
        const excluderFields = ["sort", "limit", "page"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        let queryCommand = Order.find({ 'orderBy.user': `${uid}` }).populate("products.product", "title price options");

        //sort
        if (data.sort) {
            const sortBy = data.sort.split(",").join(" ")
            queryCommand = queryCommand.sort(sortBy);
        }

        //field limiting
        if (data.fields) {
            const fields = data.fields.split(",").join(" ");
            queryCommand = queryCommand.select(fields);
        }

        //pagination page
        const page = +data.page || 1;
        const limit = +data.limit || process.env.LIMIT_ITEM;
        const offset = (page - 1) * limit;
        queryCommand = queryCommand.skip(offset).limit(limit)

        //Excute query
        const listOrder = await queryCommand.exec();
        const counts = await Order.find({ 'orderBy.user': `${uid}` }).countDocuments();
        const totalPages = Math.ceil(counts / limit);
        if (!listOrder) {
            return {
                EM: "Lấy đơn hàng thất bại!",
                EC: 1,
                DT: [],
                totalPages
            }
        }
        return ({
            EM: "Lấy đơn hàng thành công!",
            EC: 0,
            DT: listOrder,
            totalPages
        })
    } catch (error) {
        console.log(`There is an error in the "handleGetOrdersByUser function" in orderService.js: ${error.message} `)
        return {
            EM: `Có lỗi xảy ra. Vui lòng thử lại`,
            EC: 1,
            DT: {},
            totalPages: 0
        }
    }
}


const handleUpdateOrderByAdmin = async (data) => {
    try {
        const updateOrderByAdmin = await Order.findByIdAndUpdate(data.oid, {
            status: data.status
        }, { new: true })
        if (!updateOrderByAdmin) {
            return ({
                EM: "Cập nhật đơn hàng thất bại!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Cập nhật đơn hàng thành công!",
            EC: 0,
            DT: updateOrderByAdmin
        })
    } catch (error) {
        console.log(`There is an error in the "handleUpdateOrderByAdmin function" in orderService.js: ${error.message} `)
        return {
            EM: `Có lỗi xảy ra. Vui lòng thử lại`,
            EC: 1,
            DT: {}
        }
    }
}

const handleUpdateOrderByUser = async (data) => {
    try {
        const updateOrderByUser = await Order.findByIdAndUpdate(data.oid, {
            status: data.status
        }, { new: true })
        if (!updateOrderByUser) {
            return ({
                EM: "Cập nhật đơn hàng thất bại",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Cập nhật đơn hàng thành công!",
            EC: 0,
            DT: updateOrderByUser
        })
    } catch (error) {
        console.log(`There is an error in the "handleUpdateOrderByUser function" in orderService.js: ${error.message} `)
        return {
            EM: `Có lỗi xảy ra. Vui lòng thử lại`,
            EC: 1,
            DT: {}
        }
    }
}

module.exports = {
    handleCreateNewOrder, handleGetOrdersByAdmin, handleUpdateOrderByAdmin, handleUpdateOrderByUser, handleGetOrdersByUser
}

