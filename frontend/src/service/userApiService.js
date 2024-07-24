import axios from "../untils/axios";

export const apiRegister = (email, phoneNumber, userName, password) => {
    return (
        axios.post("/user/register", { email, phoneNumber, userName, password })
    )
}

export const apiLogin = (loginValue, password) => {
    return (
        axios.post("/user/login", { loginValue, password }
        )
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
        axios.put('/user/addToCart', { pid: data.pid, color: data.color, size: data.size, quantity: data.quantity })
    )
}

export const apiRemoveFromCart = (data) => {
    return (
        axios.put(
            '/user/removeFromCart', { pid: data.pid, color: data.color, size: data.size }, {
            headers: {
                'Content-Type': 'application/json' // Đảm bảo rằng dữ liệu được gửi dưới dạng JSON
            }
        }
        )
    )
}