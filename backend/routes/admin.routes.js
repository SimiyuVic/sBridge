import express from "express";
import { dashboardData, fetchUsers } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

//fetch users
router.get("/all-users",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    fetchUsers);

//dashboard data
router.get("/dashboard", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    dashboardData);
export default router;