import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const JobDetailsEditPage = () => {

    const backendLink = useSelector((state) => state.prod.link);
    const { id } = useParams();
    const redirect = useNavigate();

    const [jobTitle, setTitle] = useState("");
    const [location, setLocation] = useState("");
    // const [employmentType, setType] = useState("");
    // const [experience, setExperience] = useState("");
    const [jobDescription, setDescription] = useState("");
    const [jobRequirements, setRequirememnts] = useState("");

    useEffect(() => {
        const jobDetails = async () => {
            try {
                const response = await axios.get(`${backendLink}/api/v1/auth/job-details/${id}`, {
                    withCredentials: true
                });

                //console.log(response?.data.jobDetails);

                setTitle(response?.data.jobDetails.jobTitle || "");
                setLocation(response?.data.jobDetails.location || "");
                setDescription(response?.data.jobDetails.jobDescription || "");
                setRequirememnts(response?.data.jobDetails.jobRequirements || "");
            }

            catch (error) {
                toast.error(error.response?.data.message || "Cannot fetch job details")
            }
        }
        jobDetails();
    }, []);

     const updateJobDetails = async(e)=>{
        e.preventDefault();

        const jobData = { jobTitle, location, jobDescription, jobRequirements};

        try{
            const response =await axios.put(`${backendLink}/api/v1/employer/update-job/${id}`, jobData, {
                withCredentials: true
            });

            redirect("/employer/jobs");
            toast.success(response?.data.message);
        }
        catch(error){
            console.log(error)
            toast.error(error.response?.data.message || "cannot update job");
        }
    }

    return (
        <div>
            <div className="card shadow-sm p-3">
                <form onSubmit={updateJobDetails}>
                    <div className="mb-3">
                        <label class="form-label mb-2">Job Title</label>
                        <input
                            type="text" class="form-control"
                            placeholder="Job Title"
                            value={jobTitle}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label mb-2">Location</label>
                        <input
                            type="text" className="form-control"
                            placeholder="Job Title"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 form-field">
                        <label for="exampleFormControlTextarea2" className="form-label">Job Description</label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                            rows="4"></textarea>
                    </div>
                    <div class="mb-3 form-field">
                        <label for="exampleFormControlTextarea2" className="form-label">Job Requirements</label>
                        <textarea
                            value={jobRequirements}
                            onChange={(e) => setRequirememnts(e.target.value)}
                            className="form-control"
                            rows="4"></textarea>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobDetailsEditPage;