import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createJobSeeker = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;
    //validation
    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required!",
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    //search for an existing user
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with email already exists",
      });
    }

    //search for an existing phone number
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number taken",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password has to be atleast 8 characters",
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //save the user
    const newJobSeeker = new User({
      fullname,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: "jobseeker",
    });

    await newJobSeeker.save();

    return res.status(201).json({
      success: true,
      message: `User with name ${fullname} created`,
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong again",
    });
  }
};

//all jobs
export const fetchAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found"
      });
    }

    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}
