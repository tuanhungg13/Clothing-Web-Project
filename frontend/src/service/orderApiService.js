import axios from "../untils/axios";

const apiCreateOrder = (data) => {
    return axios.post("/order/", data)
}

const apiGetOrders = (data) => {
    return axios.get("/order/", data)
}

const apiUpdateOrderByAdmin = (data) => {
    return axios.put("/order/admin", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export { apiCreateOrder, apiGetOrders, apiUpdateOrderByAdmin }
