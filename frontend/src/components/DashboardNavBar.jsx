import { FaArrowRightToBracket } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth.js";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavBar = () => {

    const backendLink = useSelector((state)=>state.prod.link);
    const user = useSelector((state)=>state.auth.user);
    //console.log(user);
    const dispatch = useDispatch();
    const redirect = useNavigate();

    useEffect(()=>{
        const getDetails = async()=>{
            try{
                const response = await axios.get(`${backendLink}/api/v1/auth/user-details`, {
                    withCredentials: true
                });
                dispatch(authActions.login(response?.data?.user));
            }
            catch(error){
                toast.error(error.response?.data?.message);
            }
        }  

        if(!user){
            getDetails();
        }
    }, [backendLink, user, dispatch]);

    //logout user
    const logoutUser = async()=>{
        try{
            const response = await axios.post(`${backendLink}/api/v1/auth/logout`, {}, {
                withCredentials: true
            });
            toast.success(response?.data?.message);
            dispatch(authActions.logout());
            redirect("/");
        }
        catch(error){
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div>
            <nav className="d-flex justify-content-between">
                <div className="text-light">
                    <h5>
                        Welcome {user?.fullname}  {/* we will replace this with username */}
                    </h5>
                    <p>
                        Your Email : { user?.email }
                    </p>
                    <p>
                        Your Phone : { user?.phone }
                    </p>
                    <Link 
                    className="btn btn-primary"
                    to="/"
                    >
                        Home Page
                    </Link>
                </div>
                <div>
                    <button
                    onClick={logoutUser}
                        className="btn"
                        style={{
                            backgroundColor: "#E8E085"
                        }}
                    >
                        Logout <span className="ms-3"> <FaArrowRightToBracket /> </span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default DashboardNavBar;