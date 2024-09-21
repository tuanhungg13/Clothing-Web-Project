const userService = require('../service/userService.js');


const register = async (req, res) => {
    try {
        const { email, phoneNumber, userName, password } = req.body;
        if (!email || !phoneNumber || !userName || !password) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ thông tin!", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleRegister(req.body);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            errors: response.errors
        })

    } catch (error) {
        console.log("Error from 'register func' of userController.js: ", error)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! VUi lòng thử lại!",
            EC: 1
        })
    }
}

const login = async (req, res) => {
    try {
        const { loginValue, password } = req.body;
        if (!loginValue || !password) {
            return res.status(400).json({
                EM: "Vui lòng nhập đày đủ thông tin đăng nhập!", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleLogin(req.body);
        //Thêm refresh token vào cookie
        if (response && response.EC === 0) {
            res.cookie('refreshToken', response.newRefreshToken,
                {
                    maxAge: 86400000, httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
                })
            return res.status(200).json({
                EM: response.EM,
                accessToken: response.accessToken,
                EC: response.EC,
                DT: response.DT
            })
        }
        else {
            return res.status(500).json({
                EM: response.EM,
                EC: response.EC,
            })
        }



    } catch (error) {
        console.log(`Server: There is an error in the "login function" in userControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! VUi lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const getUserById = async (req, res) => {
    try {
        const { _id } = req.user;
        if (!_id) {
            return res.status(400).json({
                EM: "Vui lòng cung cấp id người dùng!", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleGetUserById(_id);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`Server: There is an error in the "getUserById function" in userControllers.js : ${error.message}`)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! VUi lòng thử lại!",
            EC: 1,
            DT: {}
        })
    }
}


const refreshAccessToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (Object.keys(cookie).length === 0 && !cookie.refreshToken) {
            throw new Error("Không tìm thấy dữ liệu từ cookie");
        }
        const response = await userService.handleRefreshAccessToken(cookie);
        if (response && response.EC === 0) {
            res.cookie('refreshToken', response.newRefreshToken,
                {
                    maxAge: 86400000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
                })
            return res.status(200).json({
                EC: response.EC,
                EM: response.EM,
                accessToken: response.newAccessToken
            })
        }
        return res.status(500).json({
            EC: response.EC,
            EM: response.EM,
            accessToken: response.newAccessToken
        })
    } catch (error) {
        console.log(`Server: There is an error in the "refreshAccessToken function" in userControllers.js: ${error.message}`)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true })
        return res.status(200).json({
            EM: "Đăng xuất thành công!",
            EC: 0
        })
    } catch (error) {
        console.log(`Server: There is an error in the "logout function" in userControllers.js: ${error.message}`)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1
        })
    }
}




const updateUser = async (req, res) => {
    try {
        const { role, email, ...information } = req.body;
        const { _id } = req.user;
        if (!_id || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Vui lòng nhập đầy đủ thông tin!",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUser(_id, information, req.file);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`Server: There is an error in the "updateUser function" in userControllers.js: ${error.message}`)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}



const getAllUsers = async (req, res) => {
    try {
        const response = await userService.handleGetAllUsers(req.query);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            totalPages: response.totalPages,
            DT: response.DT
        })

    } catch (error) {
        console.log(`Server: There is an error in the "getAllUsers function" in userControllers.js: ${error.message}`)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).json({
                EM: 'Vui lòng cung cấp id người dùng!',
                EC: 1
            })
        }
        const response = await userService.handleDeleteUser(uid)
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        console.log(`Server: There is an error in the "deleteUser function" in userControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const updateUserByAdmin = async (req, res) => {
    try {
        const { uid } = req.query;
        const { isBlocked, role } = req.body;
        if (!uid || (!isBlocked && !role)) {
            return res.status(400).json({
                EM: "Vui lòng điền đầy đủ thông tin!",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUserByAdmin(uid, { isBlocked, role });
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`Server: There is an error in the "updateUserByAdmin function" in userControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const { pid, quantity, color, size, price } = req.body;
        if (!pid || !quantity || !color || !size || !price) {
            return res.status(400).json({
                EM: "Không đủ thông tin sản phẩm!",
                EC: 1
            })
        }
        const response = await userService.handleAddToCart(_id, req.body);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`Server: There is an error in the "addToCart function" in userControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const { pid, color, size } = req.body;
        if (!pid || !color || !size) {
            return res.status(400).json({
                EM: "Thiếu thông tin sản phẩm!",
                EC: 1
            })
        }
        const response = await userService.handleRemoveFromCart(_id, req.body);
        if (response && response.EC === 0) {
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        }
        return res.status(500).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(`Server: There is an error in the "removeFromCart function" in userControllers.js: ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! Vui lòng thử lại!",
            EC: 1,
        })
    }
}

module.exports = {
    register, login, getUserById, refreshAccessToken, logout,
    getAllUsers, updateUser, deleteUser, updateUserByAdmin,
    addToCart, removeFromCart
}