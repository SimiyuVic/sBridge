import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.sBridge;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You have to be logged in First"
            });
        }
        try {
            //get user details from tojken
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //find user details as per the info in decoded const
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }

            //make user details available to all oyther controllers
            req.user = user;
            next();

        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
    },
    authorizeRole: (role) => {
        return (req, res, next) => {
            if (req.user.role !== role) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorised Permission"
                });
            }
            next();
        }
    }
}