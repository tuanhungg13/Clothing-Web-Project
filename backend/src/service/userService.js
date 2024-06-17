import User from "../models/users"
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

const handleHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
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
        if (checkEmail) {
            return ({
                EM: 'Email already exists!',
                EC: 1
            })
        }
        else if (checkPhoneNumber) {
            return ({
                EM: 'Phone number already exists!',
                EC: 1
            })
        }
        const hashPassword = handleHashPassword(rawUserData.password);
        const newUser = await User.create({
            email: rawUserData.email,
            phoneNumber: rawUserData.phoneNumber,
            userName: rawUserData.userName,
            password: hashPassword,
        })
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

module.exports = {
    handleRegister
}