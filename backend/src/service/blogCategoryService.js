import BlogCategory from "../models/blogCategory";

const handleCreateBlogCategory = async (data) => {
    try {
        const newBlogCategory = await BlogCategory.create(data);
        if (!newBlogCategory) {
            return {
                EM: "create new blog category failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Create new blog category successfully!",
            EC: 0,
            DT: newBlogCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleCreateBlogCategory function" in blogCategoryService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}


const handleGetAllBlogCategory = async () => {
    try {
        const allBlogCategory = await BlogCategory.find().select("_id categoryName");
        if (!allBlogCategory) {
            return {
                EM: "Get all blogCategory failed!",
                EC: 1,
                DT: []
            }
        }
        return {
            EM: "Get all blogCategory successfully!",
            EC: 0,
            DT: allBlogCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleGetAllBlogCategory function" in blogCategoryService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleUpdateBlogCategory = async (_bcid, data) => {
    try {
        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(_bcid, data, { new: true });
        if (!updateBlogCategory) {
            return {
                EM: "Update blogCategory failed!",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "Update blogCategory successfully!",
            EC: 0,
            DT: updateBlogCategory
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleUpdateBlogCategory function" in blogCategoryService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

const handleDeleteBlogCategory = async (_bcid) => {
    try {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(_bcid);
        if (!deleteBlogCategory) {
            return {
                EM: "Delete blogCategory failed!",
                EC: 1,
            }
        }
        return {
            EM: "Delete blogCategory successfully!",
            EC: 0
        }
    } catch (error) {
        return {
            EM: `There is an error in the "handleDeleteBlogCategory function" in blogCategoryService.js: ${error.message} `,
            EC: 1,
            DT: {}
        }
    }
}

module.exports = {
    handleCreateBlogCategory, handleGetAllBlogCategory, handleDeleteBlogCategory, handleUpdateBlogCategory
}