import userService from '../service/userService';


const register = async (req, res) => {
    try {
        const { email, phoneNumber, userName, password } = req.body;
        if (!email || !phoneNumber || !userName || !password) {
            return res.status(200).json({
                EM: "Missing require parameters", //error message
                EC: "1",                            //error code
            })
        }
        const response = await userService.handleRegister(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC
        })

    } catch (error) {
        console.log("Error from function Register of usersController.js", error)
        return res.status(500).json({
            EM: 'There is an error in the "register function" in usersControllers.js',
            EC: 1
        })
    }
}

module.exports = {
    register
}