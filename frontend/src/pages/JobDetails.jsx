import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";



const JobDetails = () => {

    const { id } = useParams();
    //console.log(id);
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState(null);
    const backendLink = useSelector((state) => state.prod.link);
    const status = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${backendLink}/api/v1/auth/job-details/${id}`, {
                    withCredentials: true
                });
                setJob(response?.data.jobDetails);
            }
            catch (error) {
                toast.error(error.response?.data.message || "Cannot fetch job details");
                console.log(error);
            }
        }
        fetchJobDetails();
    }, [backendLink])


    return (
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="card col md-8 p-3 shadow-sm border-0">
                        <h5>
                            {job?.companyName}
                        </h5>
                        <h6>
                            {job?.location}
                        </h6>
                        <h6>
                            {job?.jobTitle}
                        </h6>
                        <span className="border-bottom p-3" />
                        <p>
                            {job?.jobDescription}
                        </p>
                        <p>
                            {job?.jobRequirements}
                        </p>
                    </div>
                    {
                        status && user.role === "jobseeker" ? (
                            <div className="col-md-4 card shadow-sm border-0 p-3">
                                <h5>
                                    Ready For Your New Job
                                </h5>
                                <h6>
                                    Apply Here
                                </h6>
                                <button
                                    className="btn btn-primary"
                                >
                                    Apply Now
                                </button>
                            </div>
                        ) : (
                            <div>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default JobDetails;