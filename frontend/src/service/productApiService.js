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

const apiUpdateProduct = (data) => {
    return axios.put(`/product/update`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const apiDeleteProduct = (data) => {
    console.log("check data", data)
    return axios.delete(`/product/delete`, { data: { pid: data.pid } })
}

const apiRatings = (data) => {
    return axios.post("/product/rating", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export { apiGetProducts, apiGetProductDetails, apiCreateProduct, apiUpdateProduct, apiDeleteProduct, apiRatings }