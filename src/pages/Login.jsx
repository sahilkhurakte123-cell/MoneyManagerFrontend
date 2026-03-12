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

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password })
      const {user, token} = response.data;
      if(token){
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black dark:text-gray-100 text-center mb-2">
            Login to your account
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-400 text-center mb-8">
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
              <p className="text-red-800 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/30 p-2 rounded">
                {error}
              </p>
            )}

            <button 
              disabled={isLoading} 
              className={`w-full py-3 text-lg font-medium bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} 
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging in...
                </>
              ) : ("Login")}
            </button>

            <p className="text-sm text-slate-800 dark:text-slate-400 text-center mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-300 transition-colors">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;