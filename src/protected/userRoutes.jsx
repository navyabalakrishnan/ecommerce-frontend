import axios from "axios";
import { useEffect,React } from "react";
import { useNavigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
         `${import.meta.env.VITE_API_URL}/api/v1/users/check-user`,
          {
            withCredentials: true,
          },
        );

        const data = res.data;
        console.log("res",data);   
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/", { replace: true });
      }
    };
    checkUser();
  }, [navigate]);

  return children;
};

export default UserRoutes;