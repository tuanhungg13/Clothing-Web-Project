import axios from "../untils/axios"
const getProducts = () => {
    return axios({
        url: "/product/",
        method: "GET"
    })
}

export { getProducts }