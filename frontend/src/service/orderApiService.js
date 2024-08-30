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

const apiGetOrdersByAdmin = (data) => {
    return axios.get("/order/getOrderByAdmin", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const apiGetOrdersByUser = (data) => {
    return axios.get("/order/getOrderByUser", data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
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



export {
    apiCreateOrder, apiGetOrdersByAdmin, apiUpdateOrderByAdmin, apiCreateOrderByGuest, apiUpdateOrderByUser,
    apiGetOrdersByUser
}
