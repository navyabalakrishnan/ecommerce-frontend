import { useEffect,React } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function sellerRoutes({children}) {
  const navigate=useNavigate();
    useEffect(() => {
        const checkSeller = async () => {
          try {
            const res = await axios.get(
             `${import.meta.env.VITE_API_URL}/api/v1/seller/check-seller`,
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
        checkSeller();
      }, [navigate]);
    
      return children;
    };
export default sellerRoutes