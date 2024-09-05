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

const apiGetBlogDetails = (param) => {
    return axios.get(`/blog/${param}`)
}

export { apiCreateBlog, apiGetBlogs, apiGetBlogDetails }