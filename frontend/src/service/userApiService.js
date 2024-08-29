import axios from "../untils/axios";

export const apiRegister = (data) => {
    return (
        axios.post("/user/register", data)
    )
}

export const apiLogin = (data) => {
    return (
        axios.post("/user/login", data)
    )
}

export const apiLogout = () => {
    return (
        axios.post("/user/logout")
    )
}

export const apiGetCurrent = () => { //lấy thông tin người dùng
    return (
        axios.get("/user/current")
    )
}

export const apiAddToCart = (data) => {
    return (
        axios.put('/user/addToCart', {
            pid: data.pid,
            color: data.color,
            size: data.size,
            quantity: data.quantity,
            price: data.price
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    )
}

export const apiRemoveFromCart = (data) => {
    return (
        axios.put('/user/removeFromCart', { pid: data.pid, color: data.color, size: data.size }, {
            headers: {
                'Content-Type': 'application/json' // Đảm bảo rằng dữ liệu được gửi dưới dạng JSON
            }
        }
        )
    )
}


//admin

export const apiGetAllUsers = (params) => {
    return (
        axios.get("/user/",
            { params })
    )
}

export const apiUpdateByAdmin = (params, data) => {
    return (
        axios.put("/user/",
            data,
            { params })
    )
}

export const apiDeleteByAdmin = (params) => {
    return (
        axios.delete("/user/", { params })
    )
}

export const apiUpdateByUser = (params, data) => {
    return (axios.put("/user/current", data, { params }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
}