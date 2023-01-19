const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    // const token = req.headers.cookie
    // // console.log(token.split("=")[1]);
    // console.log(token);
    if (!token) return res.status(401).json({ isLoggedIn: false });

    try {
        const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(validToken);
        if (validToken) {
            req.user = validToken;
            // console.log(req.user);
            next();
        }
    } catch (error) {
        res.status(401).json({
            isLoggedIn: false,
            message: 'Refresh Token is required!',
        });
    }
};
