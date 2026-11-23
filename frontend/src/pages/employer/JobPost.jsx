import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobPost = () => {

    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setType] = useState("");
    const [jobDescription, setDecription] = useState("");
    const [jobRequirements, setRequirements] = useState("");
    const [experience, setExperience] = useState("");
    const [deadline, setDeadline] = useState();
    const [loading, setLoading] = useState(false);

    const backendLink = useSelector((state) => state.prod.link);
    const redirect = useNavigate();

    const createJob = async (e) => {
        e.preventDefault();
        const jobDetails = { jobTitle, location, employmentType, jobDescription, jobRequirements, experience, deadline };
        try {
            setLoading(true);
            const response = await axios.post(`${backendLink}/api/v1/employer/post-job`, jobDetails, {
                withCredentials: true
            });

            redirect("/employer/jobs")
            toast.success(response.data.message);
        }
        catch (error) {
            //console.log(error.response)
            toast.error(error.response.data?.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-3">
            <div className="mb-4">
                <h3 className="fw-bold mb-1">Post a Job</h3>
                <p className="text-muted mb-0">
                    Create a job opportunity for candidates on SkillBridge.
                </p>
            </div>

            <form onSubmit={createJob}>
                <div className="border rounded-3 p-3">
                    <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Frontend Developer"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Nairobi, Kenya"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Employment Type</label>
                        <select
                            className="form-select"
                            value={employmentType}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Select employment type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Temporary">Temporary</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Job Description</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Describe the role and responsibilities..."
                            value={jobDescription}
                            onChange={(e) => setDecription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Requirements</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="List the required skills and qualifications..."
                            value={jobRequirements}
                            onChange={(e) => setRequirements(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Required Experience</label>
                        <select
                            className="form-select"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        >
                            <option value="">Select experience level</option>
                            <option value="No experience">No experience</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5+ years">5+ years</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Application Deadline</label>
                        <input
                            type="date"
                            className="form-control"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    {
                        !loading ? (
                            <button
                                type="submit"
                                className="btn text-white px-4"
                                style={{ backgroundColor: "#3368A0" }}
                            >
                                Publish Job
                            </button>
                        ) : (
                            <button
                                type="submit"
                                dsiabled
                                className="btn text-white px-4"
                                style={{ backgroundColor: "#d0e418" }}
                            >
                                Publishing Job  . . .
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default JobPost;