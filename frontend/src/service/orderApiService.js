import axios from "../untils/axios";

const apiCreateOrder = (data) => {
    return axios.post("/order/", data)
}

export { apiCreateOrder }
