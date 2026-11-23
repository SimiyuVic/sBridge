
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const JobList = () => {

    const backendLink = useSelector((state) => state.prod.link);
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${backendLink}/api/v1/employer/fetch-jobs`, {
                    withCredentials: true
                });

                setJobs(response.data.jobs);
            }
            catch (error) {
                console.log(error);
                toast.error(error.response?.data.message);
            }
        }
        fetchJobs();
    }, [backendLink]);


    return (
        <div className="p-3">
            <div className="mb-4">
                <h3 className="fw-bold mb-1">My Jobs</h3>
                <p className="text-muted mb-0">
                    View and manage all your posted jobs.
                </p>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Job Title</th>
                            <th>Location</th>
                            <th>Employment Type</th>
                            <th>Experience</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!jobs ? (
                            <tr>
                                <td colSpan="7" className="text-center py-5">
                                    <h6 className="fw-semibold">No jobs available</h6>
                                    <p className="text-muted small mb-0">
                                        Your posted jobs will appear here.
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => (
                                <tr key={job._id}>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.location}</td>
                                    <td>{job.employmentType}</td>
                                    <td>{job.experience}</td>
                                    <td>{job.deadline}</td>
                                    <td>{job.paymentStatus}</td>
                                    <td>{job.isPublished ? "Published" : "Unpublished"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobList;