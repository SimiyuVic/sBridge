
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

export const fetchUsers = async (req, res) => {
    const { user } = req;
    try {
        const jobSeeker = await User.find({ role: "jobseeker" });

        if (!jobSeeker) {
            //console.log(error)
            return res.status(404).json({
                success: false,
                message: "No jobseekers currently found"
            });
        }

        const employers = await User.find({ role: "employer" });
        if (!employers) {
            //console.log(error)
            return res.status(404).json({
                success: false,
                message: "No employers currently found"
            });
        }

        return res.status(200).json({
            success: true,
            allUsers: {
                jobSeeker,
                employers
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: " Something went wrong"
        });
    }
}

//dashboard count data
export const dashboardData = async (req, res) => {
    try {
        const userData = await User.countDocuments({ role: "jobseeker" });

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        const employerData = await User.countDocuments({ role: "employer" });

        if (!employerData) {
            return res.status(404).json({
                success: false,
                message: "No employers found"
            });
        }

        const jobData = await Job.countDocuments();

        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        return res.status(200).json({
            success: true,
            userData, employerData, jobData
        });

    } catch (error) {
        //console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}