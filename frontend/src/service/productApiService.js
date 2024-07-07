import axios from "../untils/axios"
const getProducts = (...params) => {
    const paramString = params.length > 0 ? params.join("&") : "";
    return axios({
        url: "/product/?" + paramString,
        method: "GET"
    })
}


export { getProducts }