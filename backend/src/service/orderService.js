import Order from "../models/order";
import User from "../models/users"
const handleCreateNewOrder = async (data) => {
    try {
        const newOrder = await Order.create(data);
        if (data.orderBy.user) {
            const user = await User.findByIdAndUpdate(data.orderBy.user, {
                cart: []
            })
        }
        if (!newOrder) {
            return ({
                EM: "Creating a new bill failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Bill created successfully!",
            EC: 0,
            DT: newOrder
        }
        )
    } catch (error) {
        return {
            EM: `There is an error in the "handleCreateNewBill function" in billService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleGetOrders = async (data) => {
    try {
        const queries = { ...data };
        console.log("check req.query:", data)
        const excluderFields = ["sort", "limit", "page", "fields"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        //Format lại các operators cho đúng cú pháp của mongodb;
        let queryString = JSON.stringify(queries);
        console.log(queryString)
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, condition => `$${condition}`);
        console.log("2:", queryString)
        queryString = JSON.parse(queryString);

        //Filter
        if (queries?.title) {
            queryString.title = { $regex: queries.title, $options: "i" }
            console.log("3:", queryString)
        }
        let queryCommand = Order.find(queryString).populate("products.product", "title price options");

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
        const counts = await Order.find(queryString).countDocuments();
        if (!listOrder) {
            return {
                EM: "Get orders failed!",
                EC: 1,
                DT: [],
                counts
            }
        }
        return ({
            EM: "Get orders successfully!",
            EC: 0,
            DT: listOrder,
            counts
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetOrders function" in orderService.js: ${error.message} `,
            EC: 1,
            DT: {},
            counts: ""
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
                EM: "Update order by admin failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Update order by admin successfully!",
            EC: 0,
            DT: updateOrderByAdmin
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateOrderByAdmin function" in orderService.js: ${error.message} `,
            EC: 1,
            DT: {},
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
                EM: "Update order by user failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Update order by user successfully!",
            EC: 0,
            DT: updateOrderByUser
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateOrderByAdmin function" in orderService.js: ${error.message} `,
            EC: 1,
            DT: {},
        }
    }
}

module.exports = {
    handleCreateNewOrder, handleGetOrders, handleUpdateOrderByAdmin, handleUpdateOrderByUser
}

