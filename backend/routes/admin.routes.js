import express from "express";
import { fetchUsers } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

//fetch users
router.get("/all-users",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    fetchUsers);


export default router;