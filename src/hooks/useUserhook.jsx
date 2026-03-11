import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";

export const useUser = () => {
  const {user, setUser, clearUser} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) return;

    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return;
    }

    let isMounted = true;

    const fetchUser =  async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_USER);
        if(isMounted && response.data){
          setUser(response.data);
        }
      } catch (error) {
        console.log("Failed to fetch user info", error);
        if(isMounted){
          clearUser();
          navigate("/login");
        }
      }
    }
    fetchUser();

    return () => {
      isMounted = false;
    }
  },[user,setUser, clearUser, navigate])

}