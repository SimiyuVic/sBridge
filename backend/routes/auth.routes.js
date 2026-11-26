import express from "express";
import {
    changeAvatar,
    checkCookie,
    getUserData,
    jobDetails,
    loginUser,
    logoutUser
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/image.middleware.js";

const router = express.Router();

//login
router.post("/login", loginUser);
//check cookie
router.get("/check-cookie", checkCookie);

router.get("/user-details",
    authMiddleware.verifyToken,
    getUserData);
router.post("/logout", logoutUser);
//change avatar
router.patch("/change-avatar", 
    authMiddleware.verifyToken,
    upload.single("image"),
    changeAvatar);

//fetch job details
router.get("/job-details/:id", jobDetails);

export default router;