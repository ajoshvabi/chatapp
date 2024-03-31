

const jwt = require("jsonwebtoken");
require('dotenv').config();
const cookie = require('cookie');

const authToken = async (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.accessToken;
    
    if (!token) {
        console.log("Token not found");
        // return res.status(401).json({ error: "Token Not found" });
                return next(new Error("Token not found"));

    }

    try {
        console.log("Token found");

        const user = await jwt.verify(token, process.env.JWTTOKEN);

        //console.log(req.user);
        await res.cookie('userId', user.userId, { httpOnly: true });
        // console.log("setcooki userid",cookie.parse(req.request.headers.cookie || ''));
        req.user = user;

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(403).json({ error: "Invalid Token" });
    }
};

module.exports = authToken;




// const jwt = require("jsonwebtoken");
// require('dotenv').config();
// const cookie = require('cookie');

// const authToken = async (socket, next) => {
//     const cookies = cookie.parse(socket.request.headers.cookie || '');
//     const token = cookies.accessToken;
    
//     if (!token) {
//         // Token not found, set a flag on the socket to handle it later
//         socket.authFailed = true;
//     } else {
//         try {
//             const user = await jwt.verify(token, process.env.JWTTOKEN);
//             // Attach user to the socket for later use in socket events
//             req.user = user;
//             socket.user = user;
//         } catch (error) {
//             console.error("Error verifying token:", error);
//             // Token verification failed, set a flag on the socket
//             socket.authFailed = true;
//         }
//     }
//     next();
// };

// module.exports = authToken;
