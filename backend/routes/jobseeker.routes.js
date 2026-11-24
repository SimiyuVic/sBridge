import express from "express";
import { createJobSeeker, fetchAllJobs } from "../controllers/jobseeker.controller.js";

const router = express.Router();

router.post("/register", createJobSeeker);
//router.post("/skills")

router.get("/all-jobs", fetchAllJobs);

export default router;