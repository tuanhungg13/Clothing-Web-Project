import axios from "../untils/axios";

export const apiRegister = (email, phoneNumber, userName, password) => {
    return (
        axios({
            url: "/user/register",
            method: "POST",
            data: { email, phoneNumber, userName, password }
        })
    )
}

export const apiLogin = (loginValue, password) => {
    return (
        axios({
            url: "/user/login",
            method: "POST",
            data: loginValue, password,
            withCredentials: true
        })
    )
}

export const apiLogout = () => {
    return (
        axios({
            url: "/user/logout",
            method: "POST"
        })
    )
}

export const apiGetCurrent = () => { //lấy thông tin người dùng
    return (
        axios({
            url: "/user/current",
            method: "GET"
        })
    )
}
