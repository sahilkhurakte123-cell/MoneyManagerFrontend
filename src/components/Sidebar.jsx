import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-gray-900 border-r border-gray-200/50 dark:border-gray-700 p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user?.profileImgUrl ? (
            <img src={user?.profileImgUrl || ""} alt="profile photo" className="w-20 h-20 bg-slate-400 rounded-full" />
          ) : (
            <User className="w-20 h-20 text-xl text-gray-400 dark:text-gray-500" />
          )}
          <h5 className="text-gray-950 dark:text-gray-100 font-medium leading-6">
            {user?.fullname || ""}
          </h5>
        </div>
        {SIDE_BAR_DATA.map((item, index) => (
          <button 
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-200
              ${activeMenu == item.label 
                ? "text-white bg-green-800 dark:bg-green-700" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}>
              <item.icon className="text-xl" />
              {item.label}
          </button>
        ))}
    </div>
  )
}

export default Sidebar;