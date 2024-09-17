import userService from '../service/userService';


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
            EM: `Server: There is an error in the "register function" in usersControllers.js: ${error.message}`,
            EC: 1
        })
    }
}

const login = async (req, res) => {
    try {
        const { loginValue, password } = req.body;
        if (!loginValue || !password) {
            return res.status(400).json({
                EM: "Missing require parameters login", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleLogin(req.body);
        //Thêm refresh token vào cookie
        if (response && response.EC === 0) {
            res.cookie('refreshToken', response.newRefreshToken, { maxAge: 86400000 })
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
        return res.status(500).json({
            EM: `Server: There is an error in the "login function" in userControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}


const getUserById = async (req, res) => {
    try {
        const { _id } = req.user;
        if (!_id) {
            return res.status(400).json({
                EM: "Missing _id parameters", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleGetUserById(_id);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "getUserById function" in userControllers.js : ${error.message}`,
            EC: 1,
        })
    }
}


const refreshAccessToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie && !cookie.refreshToken) throw new Error("Cookie not found");
        const response = await userService.handleRefreshAccessToken(cookie);
        if (response.EC === 0) {
            res.cookie('refreshToken', response.newRefreshToken, { maxAge: 86400000 })
        }
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            accessToken: response.newAccessToken
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "refreshAccessToken function" in userControllers.js: ${error.message}`,
            EC: 1
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true })
        res.clearCookie('accessToken', { httpOnly: true })
        return res.status(200).json({
            EM: "Successfully logged out!",
            EC: 0
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "logout function" in userControllers.js: ${error.message}`,
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
                EM: "Missing require parameters",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUser(_id, information, req.file);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log("Error from 'updateUser func' of userController.js: ",)
        return res.status(500).json({
            EM: `Server: There is an error in the "updateUser function" in userControllers.js: ${error.message}`,
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
        console.log("Error from 'getAllUsers func' of userController.js: ",)
        return res.status(500).json({
            EM: `Server: There is an error in the "getAllUsers function" in userControllers.js: ${error.message}`,
            EC: 1,
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).json({
                EM: '_id not found!',
                EC: 1
            })
        }
        const response = await userService.handleDeleteUser(uid)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "deleteUser function" in userControllers.js: ${error.message} `,
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
                EM: "Missing require parameters!",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUserByAdmin(uid, { isBlocked, role });
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "updateUserByAdmin function" in userControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const { pid, quantity, color, size, price } = req.body;
        console.log("check addToCart:", pid, quantity, color, size, price)
        if (!pid || !quantity || !color || !size || !price) {
            return res.status(400).json({
                EM: "Không đủ thông tin sản phẩm!",
                EC: 1
            })
        }
        const response = await userService.handleAddToCart(_id, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "addToCart function" in userControllers.js: ${error.message} `,
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
                EM: "Missing inputs!",
                EC: 1
            })
        }
        const response = await userService.handleRemoveFromCart(_id, req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `Server: There is an error in the "removeFromCart function" in userControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

module.exports = {
    register, login, getUserById, refreshAccessToken, logout,
    getAllUsers, updateUser, deleteUser, updateUserByAdmin,
    addToCart, removeFromCart
}