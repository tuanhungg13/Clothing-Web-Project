import axios from "../untils/axios"

const getProductCategories = () => {
    return axios({
        url: "/productCategory/",
        method: "GET"
    })
}

export { getProductCategories }