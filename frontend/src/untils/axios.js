import axios from "axios";

// Đặt cấu hình mặc định lúc tạo ra instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true // Đảm bảo gửi cookie trong yêu cầu

});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let localStorageData = window.localStorage.getItem("persist:profile")
    if (localStorageData && typeof localStorageData === "string") {
        localStorageData = JSON.parse(localStorageData)
        if (localStorageData.accessToken) {
            const accessToken = JSON.parse(localStorageData?.accessToken)
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            };
            return config
        }
    }
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đón chặn response
let isRefreshing = false;
let failedRequestsQueue = [];
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
}, async function (error) {
    const originalRequest = error.config;
    if (error && error.response && error.response.status === 401) {
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedRequestsQueue.push({ resolve, reject });
            }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axios(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const response = await instance.get('/user/refreshAccessToken');
            if (response && response.EC === 0) {
                const newAccessToken = response.accessToken;
                // Cập nhật accessToken trong localStorage
                let localStorageData = window.localStorage.getItem("persist:profile");
                if (localStorageData && typeof localStorageData === "string") {
                    localStorageData = JSON.parse(localStorageData);
                    localStorageData.accessToken = JSON.stringify(newAccessToken);
                    window.localStorage.setItem("persist:profile", JSON.stringify(localStorageData));
                }
                // Gửi lại request gốc với accessToken mới
                failedRequestsQueue.forEach((req) => req.resolve(newAccessToken));
                failedRequestsQueue = [];
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
            else {
                const response = await instance.post('/user/logout')
                if (response && response.EC === 0) {
                    let localStorageData = window.localStorage.getItem("persist:profile");
                    if (localStorageData && typeof localStorageData === "string") {
                        localStorageData = JSON.parse(localStorageData);
                        localStorageData.accessToken = "";
                        localStorageData.isLoggedIn = false;
                        window.localStorage.setItem("persist:profile", JSON.stringify(localStorageData));
                    }
                }
            }
        } catch (error) {
            console.log("Failed to refresh access token", error);
        }
    }

    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data;
});

export default instance