import axios from "../untils/axios";

const apiCreateBlog = (data) => {
    return axios.post("/blog/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export { apiCreateBlog }