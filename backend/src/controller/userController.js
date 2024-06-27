import userService from '../service/userService';


const register = async (req, res) => {
    try {
        const { email, phoneNumber, userName, password } = req.body;
        if (!email || !phoneNumber || !userName || !password) {
            return res.status(400).json({
                EM: "Missing require parameters register", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleRegister(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC
        })

    } catch (error) {
        console.log("Error from 'register func' of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "register function" in usersControllers.js',
            EC: 1
        })
    }
}

const login = async (req, res) => {
    try {
        const { loginValue, password } = req.body;
        if (!loginValue || !password) {
            console.log("check req.body", loginValue, password)
            return res.status(400).json({
                EM: "Missing require parameters login", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleLogin(req.body);
        //Thêm refresh token vào cookie
        res.cookie('refreshToken', response.refreshToken, { httpOnly: true, secure: true, maxAge: 604800000 })
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            accessToken: response.accessToken,
            DT: response.DT
        })

    } catch (error) {
        console.log("Error from 'login func of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "login function" in userControllers.js',
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
        console.log("Error from 'getUserById func' of userController.js: ", error);
        return res.status(500).json({
            EM: 'There is an error in the "getUserById function" in userControllers.js',
            EC: 1,
        })
    }
}


const refreshAccessToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        console.log("check cookie:", cookie)
        if (!cookie && !cookie.refreshToken) throw new Error("Cookie not found");
        const response = await userService.handleRefreshAccessToken(cookie);
        console.log("check response:", response)
        return res.status(200).json({
            EC: response.EC,
            newAccessToken: response.newAccessToken
        })
    } catch (error) {
        console.log("Error from 'refreshAccessToken func' of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "refreshAccessToken function" in userControllers.js',
            EC: 1
        })
    }
}

const logout = async (req, res) => {
    try {
        const cookie = req.cookies;
        res.clearCookie('refreshToken', { httpOnly: true, secure: true })
        return res.status(200).json({
            EM: "Successfully logged out!",
            EC: 0
        })
    } catch (error) {
        console.log("Error from 'logout func' of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "logout function" in userControllers.js',
            EC: 1
        })
    }
}




const updateUser = async (req, res) => {
    try {
        const { role, email, ...information } = req.body;
        const { _id } = req.user;
        console.log("check update: ", _id, information)
        if (!_id || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                EM: "Missing require parameters",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUser(_id, information);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log("Error from 'updateUser func' of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "updateUser function" in userControllers.js',
            EC: 1,
        })
    }
}



const getAllUsers = async (req, res) => {
    try {
        const response = await userService.handleGetAllUsers(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })

    } catch (error) {
        console.log("Error from 'getAllUsers func' of userController.js: ", error)
        return res.status(500).json({
            EM: 'There is an error in the "getAllUsers function" in userControllers.js',
            EC: 1,
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            return res.status(400).json({
                EM: '_id not found!',
                EC: 1
            })
        }
        const response = await userService.handleDeleteUser(_id)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "deleteUser function" in userControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

const updateUserByAdmin = async (req, res) => {
    try {
        const { _id } = req.query;
        const { isBlocked, role } = req.body;
        if (!_id || (!isBlocked && !role)) {
            return res.status(400).json({
                EM: "Missing require parameters!",
                EC: 1
            })
        }
        const response = await userService.handleUpdateUserByAdmin(_id, { isBlocked, role });
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: `There is an error in the "updateUserByAdmin function" in userControllers.js: ${error.message} `,
            EC: 1,
        })
    }
}

module.exports = {
    register, login, getUserById, refreshAccessToken, logout, getAllUsers, updateUser, deleteUser, updateUserByAdmin
}