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
        console.log("check", req.file, req.body, bid)
        if (!bid || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ dữ liệu!",
                EC: 1
            })
        }
        const response = await blogService.handleUpdateBlog(bid, req.body, req.file);
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
    createNewBlog, getBlogs, updateBlog, deleteBlog, getBlog
}