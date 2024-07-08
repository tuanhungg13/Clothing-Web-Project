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

export { apiGetProducts, apiGetProductDetails }