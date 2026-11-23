
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ allowedRoles }) => {

    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!loggedIn || !user) {
            toast.error("You have to be logged in to access the dashboard");
        }
    }, [loggedIn, user]);

    // Check authentication
    if (!loggedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check user role
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
