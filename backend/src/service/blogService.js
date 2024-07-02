import Blog from "../models/blog";

const handleCreateNewBlog = async (data) => {
    try {
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

const handleGetBlogs = async () => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return {
                EM: "Get blogs failed!",
                EC: 1,
                DT: []
            }
        }
        return {
            EM: "Get blogs successfully!",
            EC: 0,
            DT: blogs
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetBlogs function" in blogService.js: ${error.message} `,
            EC: 1,
            DT: []
        }
    }
}

const handleUpdateBlog = async (_bid, data) => {
    try {
        const updateBlog = await Blog.findByIdAndUpdate(_bid, data, { new: true });
        if (!updateBlog) {
            return {
                EM: "Update blog failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Update blog successfully!",
            EC: 0,
            DT: updateBlog
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateBlog function" in blogService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteBlog = async (_bid) => {
    try {
        const deleteBlog = await Blog.findByIdAndDelete(_bid);
        if (!deleteBlog) {
            return {
                EM: "Delete blog failed!",
                EC: 1
            }
        }
        return {
            EM: "Delete successfully!",
            EC: 0
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleDeleteBlog function" in blogService.js: ${error.message} `,
            EC: 1,
        }
    }
}

const handleLikeBlog = async (_id, _bid) => {
    try {
        const blog = await Blog.findById(_bid);
        const isLiked = blog.likes.find(item => item.toString() === _id);
        if (isLiked) {
            await Blog.findByIdAndUpdate(_bid, {
                $pull: { likes: _id }
            }, {
                new: true
            })
            return {
                EM: "Unlike successfully!",
                EC: 0
            }
        }
        else {
            await Blog.findByIdAndUpdate(_bid, {
                $push: { likes: _id, }
            }, { new: true })
            return {
                EM: "Like successfully!",
                EC: 0
            }
        }

    } catch (error) {
        return {
            EM: `There is an error in the "handleLikeBlog function" in blogService.js: ${error.message} `,
            EC: 1,
        }
    }
}

module.exports = {
    handleCreateNewBlog, handleGetBlogs, handleUpdateBlog, handleDeleteBlog, handleLikeBlog
}