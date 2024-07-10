import axios from "axios";

// Đặt cấu hình mặc định lúc tạo ra instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let localStorageData = window.localStorage.getItem("persist:profile")
    if (localStorageData && typeof localStorageData === "string") {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData?.token)
        config.headers = { Authorization: `Bearer ${accessToken}` }
        return config
    }
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
}, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.data;
});

export default instance