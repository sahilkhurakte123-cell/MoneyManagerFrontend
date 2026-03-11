import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js"
import Input from "../components/input.jsx";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/validation.jsx";
import axiosConfig from "../utils/axiosConfig.jsx";
import { API_ENDPOINTS } from "../utils/apiEndoints.jsx";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/profilePhotoSelector.jsx";
import uploadProfileImg from "../utils/uploadProfileImg.jsx";

const Signup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    let profileImgUrl = "";
    setIsLoading(true);

    if(!fullName.trim()){
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
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

    //signup api call

    try {
      if(profilePhoto){
        const imgUrl = await uploadProfileImg(profilePhoto);
        profileImgUrl = imgUrl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullname:fullName,
        email,
        password,
        profileImgUrl
      })
      if(response.status === 201){
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setError(error.message);
    }finally{
      setIsLoading(false);
    }

  }

  return (

    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

    <div className="relative z-10 w-full max-w-lg px-6">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black text-center mb-2">
          Create an Account
        </h3>
        <p className="text-sm text-slate-700 text-center mb-8">
          Start tracking your money now!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter full name"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter email"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="*******"
                type="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
            {isLoading? (
              <>
                <LoaderCircle className="animate-spin w-5 h-5" />
                Signing up...
              </>
            ):(
              "Sign Up"
            )}
          </button>

          <p className="text-sm text-slate-800 text-center mt-6">
            Already have an account?
            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
          </p>

        </form>
      </div>
    </div>
    
    </div>
    
  );
};

export default Signup;