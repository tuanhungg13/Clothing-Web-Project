import axios from "../untils/axios";

const apiCreateBlog = (data) => {
    return axios.post("/blog/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const apiGetBlogs = (data) => {
    return axios.get("/blog/", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const apiGetBlogDetails = (params) => {
    return axios.get(`/blog/${params}`)
}

const apiUpdateBlog = (params, data) => {
    return axios.put(`/blog/update/${params}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export { apiCreateBlog, apiGetBlogs, apiGetBlogDetails, apiUpdateBlog }