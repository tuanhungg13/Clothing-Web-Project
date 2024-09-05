import blogService from "../service/blogService";

const createNewBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title, description, req.file)
        if (!title || !description) {
            return res.status(400).json({
                EM: "Missing require parameter!",
                EC: 1
            })
        }
        const response = await blogService.handleCreateNewBlog(req.body, req.file);
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
        return res.status(500).json({
            EM: `There is an error in the "createNewBlog func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getBlogs = async (req, res) => {
    try {
        const response = await blogService.handleGetBlogs(req.query);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT,
                totalPages: response.totalPages
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            totalPages: response.totalPages
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getBlogs func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}

const getBlog = async (req, res) => {
    try {
        const { bid } = req.params;
        if (!bid) {
            return res.status(400).json({
                EM: "Missing blog id",
                EC: 1
            })
        }
        const response = await blogService.handleGetBlog(bid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "getBlog func" in blogController.js: ${error.message} `,
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

const likeBlog = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bid } = req.params
        if (!_id || !bid) {
            return res.status(400).json({
                EM: "_id or bid not found!",
                EC: 1
            })
        }
        const response = await blogService.handleLikeBlog(_id, bid);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "likeBlog func" in blogController.js: ${error.message} `,
            EC: 1,
        })
    }
}


module.exports = {
    createNewBlog, getBlogs, updateBlog, deleteBlog, likeBlog, getBlog
}