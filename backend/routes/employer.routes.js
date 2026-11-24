import express from "express";
import { 
    createJob, 
    createUser, 
    dashboardData, 
    employerJobs } from "../controllers/employer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

//register employer
router.post("/register", createUser);

//post job
router.post("/post-job", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("employer"),
    createJob);

//fetch jobs by employer
router.get("/fetch-jobs", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("employer"),
    employerJobs);

//count jobs
router.get("/dashboard-data", 
    authMiddleware.verifyToken,
    dashboardData);

export default router;