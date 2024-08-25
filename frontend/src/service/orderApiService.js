import axios from "../untils/axios";

const apiCreateOrder = (data) => {
    return axios.post("/order/", data)
}

const apiGetOrders = (data) => {
    return axios.get("/order/", data)
}

export { apiCreateOrder, apiGetOrders }
