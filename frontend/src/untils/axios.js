import axios from "axios";
import Cookies from 'js-cookie'
// Đặt cấu hình mặc định lúc tạo ra instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true // Đảm bảo gửi cookie trong yêu cầu

});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
        config.headers = { Authorization: `Bearer ${accessToken}` }
        return config
    }
    // else if () {

    // }
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
}, async function (error) {
    console.log("accessToken expiry!", error)
    if (error && error.response && error.response.status === 401) {
        try {
            console.log("call api accessToken");
            await instance.post('/user/refreshAccessToken');

        } catch (error) {
            console.log("Failed to refresh access token", error);
        }
    }
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.data;
});

export default instance