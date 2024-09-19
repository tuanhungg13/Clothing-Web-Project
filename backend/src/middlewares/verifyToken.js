const jwt = require('jsonwebtoken')

const verifyAccessToken = (req, res, next) => {
    try {
        if (req?.headers?.authorization?.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        EM: "Token không hợp lệ!",
                        EC: 1
                    })
                }
                req.user = decode;
                next();
            })
        }
        else {
            return res.status(401).json({
                EM: "Vui lòng cung cấp token xác thực!",
                EC: 1
            })
        }

    } catch (error) {
        console.log(`Error from 'verifyAccessToken funct' from verifyToken.js : ${error.message} `)
        return res.status(500).json({
            EM: "Có lỗi xảy ra! VUi lòng thử lại!",
            EC: 1
        })
    }
}

const isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({
            EM: 'Bạn không đủ quyền hạn truy cập!',
            EC: 1
        })
    }
    next();

}


module.exports = { verifyAccessToken, isAdmin }