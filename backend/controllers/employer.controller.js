import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Job from "../models/job.model.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, phone, location, password } = req.body;
    //validation
    if (!fullname || !email || !phone || !location || !password) {
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
    const newEmployer = new User({
      fullname,
      email: normalizedEmail,
      phone,
      location,
      password: hashedPassword,
      role: "employer",
    });

    await newEmployer.save();

    return res.status(201).json({
      success: true,
      message: `Company with name ${fullname} created`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong again",
    });
  }
};

export const createJob = async (req, res) => {

  const { user } = req;

  try {

    const {
      jobTitle, location, employmentType, jobDescription, jobRequirements,
      experience, deadline
    } = req.body;

    if (!jobTitle || !location || !employmentType || !jobDescription || !jobRequirements || !experience || !deadline) {
      return res.status(400).json({
        success: false,
        message: "All Job details needed"
      });
    }

    const newJob = new Job({
      jobTitle,
      location,
      employmentType,
      jobDescription,
      jobRequirements,
      experience,
      deadline,
      companyName: user.fullname,
      employer: user._id,
      paymentStatus: "unpaid",
      isPublished: false
    });

    await newJob.save();
    return res.status(201).json({
      success: true,
      message: "Job created, but not published yet"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

//fetch jobs
export const employerJobs = async (req, res) => {
  try {
    const { user } = req;
    const jobs = await Job.find({
      employer: user._id
    });
    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

//employer dasbhoard
export const dashboardData = async (req, res) => {
  const { user } = req;
  try {

    //fetch jobs
    const employerId = user._id;
    const jobData = await Job.countDocuments({ employer: employerId });

    return res.status(200).json({
      success: true,
      allJobs: {
        jobData
      }
    });
  }
  catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};


//edit jobs
export const updateJob = async (req, res) => {
  try {
    //receive the id of the job
    const jobId = req.params.id;

    const { jobTitle, location, jobDescription, jobRequirements } = req.body;

    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "No such job exists"
      });
    }

    if (!jobTitle || !location || !jobDescription || !jobRequirements) {
      return res.status(400).json({
        success: false,
        message: "All job fields are required"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $set: {
          jobTitle,
          location,
          jobDescription,
          jobRequirements,
        },
      },
      {
        returnDocument: true,          // Return the modified document rather than the original
        runValidators: true // Enforce schema validation rules on update
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "No job updated"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully"
    });

  }
  catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

//delete jobs
export const deleteJob = async (req, res) => {
  try {
    const { user } = req;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "No job found"
      });
    }

    // Delete only if the job belongs to the logged-in employer
    const deletedJob = await Job.findOneAndDelete({
      _id: jobId,
      employer: req.user._id
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to delete it"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  }
  catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}