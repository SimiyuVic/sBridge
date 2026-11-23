import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        employmentType: {
            type: String,
            required: true,
            trim: true
        },
        jobDescription: {
            type: String,
            required: true,
            trim: true,
        },
        jobRequirements: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: String,
            required: true,
            trim: true,
        },
        employer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        deadline: {
            type: Date,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "pending", "paid"],
            default: "unpaid"
        },

        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;