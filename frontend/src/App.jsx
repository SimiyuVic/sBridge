
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth.js";

// Layouts
import PublicLayout from "./layout/Public.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import EmployerLayout from "./layout/EmployerLayout.jsx";
import JobSeekerlayout from "./layout/JobSeekerLayout.jsx";


// Public Pages
import Home from "./pages/Home/Home";
import AllJobs from "./pages/AllJobs";
import About from "./pages/AboutUs";
import Contact from "./pages/ContactUs";
import JobDetails from "./pages/JobDetails";

// Authentication Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import JobSeeker from "./pages/auth/signup/JobSeeker";
import EmployerSignup from "./pages/auth/signup/Employer";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminEmployer from "./pages/admin/AdminEmployer.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import AdminJobSeeker from "./pages/admin/AdminJobSeekers.jsx";
import Jobs from "./pages/admin/Jobs.jsx";

// Employer Pages
import EmployerDashboard from "./pages/employer/EmployerDashboard.jsx";
import JobList from "./pages/employer/JobList.jsx";
import Applicants from "./pages/employer/Applicants.jsx";
import JobPost from "./pages/employer/JobPost.jsx";
import EmployerSettings from "./pages/employer/EmployerSettings.jsx";

// Job Seeker Pages
import JobSeekerdashboard from "./pages/jobseeker/Dashboard.jsx";
import JobSeekerApplication from "./pages/jobseeker/Applications.jsx";
import SeekerHelp from "./pages/jobseeker/Help.jsx";
import SeekerSettings from "./pages/jobseeker/Settings.jsx";
import Skills from "./pages/jobseeker/Skills.jsx";
import JobDetailsEditPage from "./pages/employer/JobDetails.jsx";


function App() {

  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // Check authentication cookie
  useEffect(() => {

    const checkCookie = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/v1/auth/user-details`,
          {
            withCredentials: true
          }
        );

        if (response.data.success) {
          dispatch(authActions.login(response.data.user));
        } else {
          dispatch(authActions.logout());
        }

      } catch (error) {

        dispatch(authActions.logout());

        console.log(
          error.response?.data?.message || error.message
        );

      } finally {
        setLoading(false);
      }
    };

    checkCookie();

  }, [backendLink, dispatch]);


  // Wait for authentication check
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <div>
      <Toaster />

      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/job-details/:id" element={<JobDetails />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/job-seekers" element={<JobSeeker />} />
          <Route path="/employers" element={<EmployerSignup />} />
        </Route>


        {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="job-seekers" element={<AdminJobSeeker />} />
            <Route path="employers" element={<AdminEmployer />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="jobs" element={<Jobs />} />
          </Route>


        {/* Employer Routes */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerDashboard />} />
            <Route path="jobs" element={<JobList />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="post-job" element={<JobPost />} />
            <Route path="settings" element={<EmployerSettings />} />
            <Route path="edit/:id" element={ <JobDetailsEditPage /> } />
          </Route>


        {/* Job Seeker Routes */}
          <Route path="/job-seeker" element={<JobSeekerlayout />}>
            <Route index element={<JobSeekerdashboard />} />
            <Route path="applications" element={<JobSeekerApplication />} />
            <Route path="skills" element={<Skills />} />
            <Route path="settings" element={<SeekerSettings />} />
            <Route path="help" element={<SeekerHelp />} />
          </Route>

      </Routes>
    </div>
  );
}

export default App;
