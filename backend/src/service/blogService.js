const Blog = require("../models/blog.js");

const handleCreateNewBlog = async (data, file) => {
    try {
        data = { ...data, image: file.path }
        const newBlog = await Blog.create(data);
        if (!newBlog) {
            return {
                EM: "Create new blog failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Create new blog successfully!",
            EC: 0,
            DT: newBlog
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleCreateNewBlog function" in blogService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleGetBlogs = async (data) => {
    try {
        const queries = { ...data };
        const excluderFields = ["sort", "limit", "page"];
        //Loại bỏ các trường sort, limit, page, fields khỏi queries;
        excluderFields.forEach(item => delete queries[item]);
        let queryCommand = Blog.find();
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
        const listBlog = await queryCommand.exec();
        const counts = await Blog.find().countDocuments();
        const totalPages = Math.ceil(counts / limit);
        if (!listBlog) {
            throw new Error("Lấy danh sách blog thất bại!")
        }
        return ({
            EM: "Lấy danh sách sản phẩm thành công!",
            EC: 0,
            DT: listBlog,
            totalPages: totalPages
        })
    } catch (error) {
        console.log(`There is an error in the "handleGetBlogs function" in blogService.js: ${error.message} `)
        return {
            EM: `Có lỗi xảy ra. Vui lòng thử lại!`,
            EC: 1,
            DT: [],
            totalPages: 0
        }
    }
}

const handleGetBlog = async (_bid) => {
    try {
        const blog = await Blog.findByIdAndUpdate(_bid, { $inc: { views: 1 } }, { new: true })
        if (!blog) {
            throw new Error("Xem chi tiết blog thất bại!")
        }
        return {
            EM: "Xem chi tiết blog thành công!",
            EC: 0,
            DT: blog
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

const handleUpdateBlog = async (_bid, data, file) => {
    try {
        if (file) {
            data.image = file.path
        }
        const updateBlog = await Blog.findByIdAndUpdate(_bid, data, { new: true });
        if (!updateBlog) {
            throw new Error("Cập nhật blog thất bại!")
        }
        return {
            EM: "Cập nhật blog thành công!",
            EC: 0,
            DT: updateBlog
        }
    } catch (error) {
        console.log(`There is an error in the "handleUpdateBlog function" in blogService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteBlog = async (_bid) => {
    try {
        const deleteBlog = await Blog.findByIdAndDelete(_bid);
        if (!deleteBlog) {
            throw new Error("Xóa blog thành công!")
        }
        return {
            EM: "Xóa blog thất bại!",
            EC: 0
        }
    } catch (error) {
        console.log(`There is an error in the "handleDeleteBlog function" in blogService.js: ${error.message} `)
        return {
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        }
    }
}



module.exports = {
    handleCreateNewBlog, handleGetBlogs, handleUpdateBlog, handleDeleteBlog,
    handleGetBlog
}