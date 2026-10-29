const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access token invalid."
            });
        };

        const dcoded = await jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = dcoded;

        next();

    } catch (error) {
        console.log("Authorization error: ", error);

        return res.status(401).json({
            message: "User unauthorized.!"
        })
    }
}

module.exports = authMiddleware;