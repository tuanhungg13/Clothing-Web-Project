import blogService from "../service/blogService";

const createNewBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await blogService.handleCreateNewBlog(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "createNewBlog func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getBlogs = async (req, res) => {
    try {
        const response = await blogService.handleGetBlogs();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getBlogs func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { bid } = req.params;
        if (!bid || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Missing inputs!",
                EC: 1
            })
        }
        const response = await blogService.handleUpdateBlog(bid, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateBlog func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { bid } = req.params;
        if (!bid) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await blogService.handleDeleteBlog(bid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteBlog func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}


module.exports = {
    createNewBlog, getBlogs, updateBlog, deleteBlog
}