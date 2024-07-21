import jwt from 'jsonwebtoken'

const verifyAccessToken = (req, res, next) => {
    try {
        if (req?.headers?.authorization?.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        EM: "Invalid access token",
                        EC: 1
                    })
                }
                req.user = decode;
                next();
            })
        }
        else {
            return res.status(401).json({
                EM: "Require authentication!!!",
                EC: 1
            })
        }

    } catch (error) {
        return res.status(500).json({
            EM: `Error from 'verifyAccessToken funct' from verifyToken.js : ${error.message} `,
            EC: 1
        })
    }
}

const isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(401).json({
            EM: 'Require admin role!',
            EC: 1
        })
    }
    next();

}


module.exports = { verifyAccessToken, isAdmin }