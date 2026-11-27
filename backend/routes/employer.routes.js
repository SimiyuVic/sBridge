import express from "express";
import {
    createJob,
    createUser,
    dashboardData,
    deleteJob,
    employerJobs,
    updateJob
} from "../controllers/employer.controller.js";
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

//update jobs
router.put("/update-job/:id",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("employer"),
    updateJob);

//delete job
router.delete("/delete-job/:id",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("employer"),
    deleteJob);

export default router;