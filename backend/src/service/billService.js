import Bill from "../models/bill";

const handleCreateNewBill = async (data) => {
    try {
        const newBill = await Bill.create(data);
        if (!newBill) {
            return ({
                EM: "Creating a new bill failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "Bill created successfully!",
            EC: 0,
            DT: newBill
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

const handleGetBills = async (data) => {
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
        let queryCommand = Bill.find(queryString);

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
        const listBill = await queryCommand.exec();
        const counts = await Bill.find(queryString).countDocuments();
        if (!listBill) {
            return {
                EM: "Get bills failed!",
                EC: 1,
                DT: [],
                counts
            }
        }
        return ({
            EM: "Get bills successfully!",
            EC: 0,
            DT: listBill,
            counts
        })
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetBills function" in billService.js: ${error.message} `,
            EC: 1,
            DT: {},
            counts: ""
        }
    }
}

module.exports = {
    handleCreateNewBill, handleGetBills
}

