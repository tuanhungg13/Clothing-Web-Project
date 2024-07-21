import User from "../models/users"
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt';
import jwt from 'jsonwebtoken';
import products from "../models/products";

const salt = bcrypt.genSaltSync(10);

const handleHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const checkPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

const checkEmailExist = async (email) => {
    if (await User.findOne({
        email: email
    })) {
        return true;
    }
    return false;
}

const checkPhoneNumberExist = async (phoneNumber) => {
    if (await User.findOne({
        phoneNumber: phoneNumber
    })) {
        return true;
    }
    return false;
}

const handleRegister = async (rawUserData) => {
    try {
        const checkEmail = await checkEmailExist(rawUserData.email);
        const checkPhoneNumber = await checkPhoneNumberExist(rawUserData.phoneNumber);
        const errors = {};
        let EC = 0;
        if (checkEmail) {
            errors.email = "Email đã tồn tại!";
            EC += 1;
        }
        if (checkPhoneNumber) {
            errors.phoneNumber = "Số điện thoại đã tồn tại!";
            EC += 1;

        }
        if (Object.keys(errors).length > 0) {
            return {
                EM: "Lỗi xác thực!",
                EC: EC,
                errors: errors
            }
        }
        const hashPassword = handleHashPassword(rawUserData);
        rawUserData.password = hashPassword
        const newUser = await User.create(rawUserData)
        return ({
            EM: newUser ? "A user is created successfully" : "Registration failed",
            EC: newUser ? 0 : 1
        })
    } catch (error) {
        console.log("Error from 'handleRegister function' of userService.js", error)
        return ({
            EM: 'There is an error in the "handleRegister function" in userService.js',
            EC: 1
        })
    }
}



const handleLogin = async (loginData) => {
    try {
        let user = await User.findOne({
            $or: [
                { email: loginData.loginValue },
                { phoneNumber: loginData.loginValue }
            ]
        }).populate("cart.product", "title price options")
        if (user) {
            // console.log("found user with phone/email")
            // console.log("rawData:", loginData);
            // console.log('check loginData.password:', loginData.password);
            // console.log("check user.password: ", user.password)
            const checkPw = await checkPassword(loginData.password, user.password)
            if (checkPw) {    // check inputPasword vs password in database
                const { password, role, refreshToken, ...userData } = user.toObject();
                const accessToken = generateAccessToken(user._id, role);
                const newRefreshToken = generateRefreshToken(user._id);
                await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true })
                //Lưu resfresh token vào cookies

                return ({
                    EM: user ? "Login successfully" : "Login failed",
                    EC: user ? 0 : 1,
                    accessToken,
                    newRefreshToken,
                    DT: user ? userData : []
                })
            }
        }
        return ({
            EM: "Email/số điện thoại hoặc mật khẩu không chính xác!",
            EC: 1,
        })
    } catch (error) {
        console.log("Error from 'handleLogin function' of userService.js", error)
        return ({
            EM: 'There is an error in the "handleLogin function" in userService.js',
            EC: 1
        })
    }
}


const handleGetUserById = async (_id) => {
    try {
        const user = await User.findById(_id).select("-password -role -refreshToken").populate("cart.product", "price title slug options");;
        return ({
            EM: user ? 'Successfully retrieved user data!' : 'User not found!',
            EC: user ? 0 : 1,
            DT: user ? user : {}
        })

    } catch (error) {
        console.log("Error from 'handleRegister function' of userService.js", error)
        return ({
            EM: 'There is an error in the "handleRegister function" in userService.js',
            EC: 1,
            DT: {}
        })
    }
}

const handleRefreshAccessToken = async (cookie) => {
    try {

        const decode = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decode._id, refreshToken: cookie.refreshToken });
        if (user) {
            const newAccessToken = generateAccessToken(user._id, user.role);
            const newRefreshToken = generateRefreshToken(user._id)
            user.refreshToken = newRefreshToken;
            await user.save()
            return {
                EC: 0,
                EM: "get accessToken successfully!",
                newAccessToken,
                newRefreshToken
            }

        }
        return ({
            EC: 1,
            EM: "Refresh token not matched!",
            newAccessToken: "",
            newRefreshToken: ""
        })

    } catch (error) {
        return ({
            EM: `There is an error in the "handleRefreshAccessToken function" in userService.js : ${error.message}`,
            EC: 1
        })
    }

}

const handleGetAllUsers = async () => {
    try {
        const listUsers = await User.find().select('-password -refreshToken')
        if (!listUsers) {
            return ({
                EM: "get the list of failed users!",
                EC: 1,
                DT: []
            })
        }
        return ({
            EM: "get the list of successful users!",
            EC: 0,
            DT: listUsers
        })
    } catch (error) {
        console.log("Error from 'handleGetAllUsers function' of userService.js", error)
        return ({
            EM: 'There is an error in the "handleGetAllUsers function" in userService.js',
            EC: 1,
            DT: []
        })
    }
}

const handleUpdateUser = async (_id, information) => {
    try {
        if (information.password) {
            information.password = handleHashPassword(information.password);
        }
        const userUpdate = await User.findByIdAndUpdate(_id, information, { new: true }).select("-password -role -refreshToken");
        if (!userUpdate) {
            return {
                EM: "User update failed",
                EC: 1,
                DT: {}
            }
        }
        return {
            EM: "User updated successfully",
            EC: 0,
            DT: userUpdate
        }
    } catch (error) {
        console.log("Error from 'handleUpdateUser function' of userService.js", error)
        return ({
            EM: 'There is an error in the "handleUpdateUser function" in userService.js',
            EC: 1,
            DT: ''
        })
    }
}

const handleDeleteUser = async (_id) => {
    try {
        const deleteUser = await User.findByIdAndDelete(_id);
        if (!deleteUser) {
            return ({
                EM: "User delete failed!",
                EC: 1
            })
        }
        return ({
            EM: "User deleted successfully",
            EC: 0
        })
    } catch (error) {
        return ({
            EM: `There is an error in the "handleUpdateUser function" in userService.js: ${error.message}`,
            EC: 1,
        })
    }
}

const handleUpdateUserByAdmin = async (_id, data) => {
    try {
        console.log("check data update:", data)
        const userUpdate = await User.findByIdAndUpdate(_id, data, { new: true }).select("-password -refreshToken ")
        if (!userUpdate) {
            return ({
                EM: "User update failed!",
                EC: 1,
                DT: {}
            })
        }
        return ({
            EM: "User updated successfully",
            EC: 0,
            DT: userUpdate
        })
    } catch (error) {
        return ({
            EM: `There is an error in the "handleUpdateUserByAdmin function" in userService.js: ${error.message}`,
            EC: 1,
        })
    }
}


const handleAddToCart = async (_id, data) => {
    try {
        const user = await User.findById(_id);
        const alreadyProduct = user?.cart?.find(item => item.product.toString() === data.pid);
        if (alreadyProduct) {
            if (alreadyProduct.color === data.color && alreadyProduct.size === data.size) {
                const cart = await User.updateOne({
                    cart: { $elemMatch: alreadyProduct }
                }, { $inc: { "cart.$.quantity": data.quantity } }, { new: true })
                return {
                    EM: "Add to cart successfully!",
                    EC: 0,
                    DT: cart
                }
            }
            else {
                const cart = await User.findByIdAndUpdate(_id, {
                    $push: { cart: { product: data.pid, quantity: data.quantity, size: data.size, color: data.color } }
                }, { new: true })
                return {
                    EM: "Add to cart successfully!",
                    EC: 0,
                    DT: cart
                }
            }
        }
        else {
            const cart = await User.findByIdAndUpdate(_id, {
                $push: { cart: { product: data.pid, quantity: data.quantity, size: data.size, color: data.color } }
            }, { new: true })
            return {
                EM: "Add to cart successfully!",
                EC: 0,
                DT: cart
            }
        }
    } catch (error) {
        return ({
            EM: `There is an error in the "handleAddToCart function" in userService.js: ${error.message}`,
            EC: 1,
        })
    }
}

module.exports = {
    handleRegister, handleLogin, handleGetUserById, handleRefreshAccessToken, handleGetAllUsers,
    handleUpdateUser, handleDeleteUser, handleUpdateUserByAdmin, handleAddToCart
}