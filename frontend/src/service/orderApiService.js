import axios from "../untils/axios";

const apiCreateOrder = (data) => {
    return axios.post("/order/", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const apiCreateOrderByGuest = (data) => {
    return axios.post("/order/", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const apiGetOrders = (data) => {
    return axios.get("/order/", data)
}

const apiUpdateOrderByAdmin = (data) => {
    return axios.put("/order/updateOrderByAdmin", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const apiUpdateOrderByUser = (data) => {
    return axios.put("/order/updateOrderByUser", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export { apiCreateOrder, apiGetOrders, apiUpdateOrderByAdmin, apiCreateOrderByGuest, apiUpdateOrderByUser }
