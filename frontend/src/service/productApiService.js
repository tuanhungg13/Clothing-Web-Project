import axios from "../untils/axios"
const apiGetProducts = (params) => {
    return axios({
        url: "/product/",
        method: "GET",
        params
    })
}

const apiGetProductDetails = (slug) => {
    return axios({
        url: `/product/${slug}`,
        method: "GET"
    })
}

const apiCreateProduct = (data) => {
    return axios.post("/product/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
}

export { apiGetProducts, apiGetProductDetails, apiCreateProduct }