import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js"
import Input from "../components/input.jsx";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/validation.jsx";
import axiosConfig from "../utils/axiosConfig.jsx";
import { API_ENDPOINTS } from "../utils/apiEndoints.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { LoaderCircle } from "lucide-react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AppContext)

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    if(!validateEmail(email)){
          setError("Please enter your email");
          setIsLoading(false);
          return;
    }
    if(!password.trim()){
      setError("Please enter your new password");
      setIsLoading(false);
      return;
    }
    setError("");

    // api call

    try{
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password
      })
      const {user, token} = response.data;
      if(token){
        localStorage.setItem("token",token);
        setUser(user);
        navigate("/dashboard");
      }
    // } catch (error) {
    //   console.error("Something went wrong", error);
    //   setError(error.message);
    // }
  } catch (error) {
    console.error("Something went wrong", error);
    console.log("Response data:", error.response?.data);  // ← add this
    setError(error.response?.data?.message || error.message); // ← show backend message
  }
    finally{
      setIsLoading(false);
    }

  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

    <div className="relative z-10 w-full max-w-lg px-6">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black text-center mb-2">
          Login to you account
        </h3>
        <p className="text-sm text-slate-700 text-center mb-8">
          Start tracking your money now!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter email"
              type="text"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*******"
              type="password"
            />
            
          {error && (
            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading? 'opacity-60 cursor-not-allowed' : ''}  `} type="submit">
            {isLoading? (
              <>
                <LoaderCircle className="animate-spin w-5 h-5" />
                Logging in...
              </>
            ) : ("Login")}
          </button>

          <p className="text-sm text-slate-800 text-center mt-6">
            Don't have an account?
            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Sign Up</Link>
          </p>

        </form>
      </div>
    </div>
    
    </div>
  )
}

export default Login;