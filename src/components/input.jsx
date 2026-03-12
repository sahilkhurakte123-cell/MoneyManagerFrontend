import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({label, value, onChange, placeholder, type, isSelect, options}) => {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 dark:text-slate-300 block mb-1">
        {label}
      </label>

      <div className="relative">
       {isSelect ? (
          <select 
            className="w-full bg-white dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            value={value}
            onChange={(e) => onChange(e)}
          >
            {options.map((option) => ( 
              <option 
                key={option.value} 
                value={option.value}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                {option.label}
              </option>
            ))}
          </select>
       ) : (
        <input 
          className="w-full bg-white dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 pr-10 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
          type={type === "password" ? (showPassword ? 'text' : 'password') : type} 
          placeholder={placeholder} 
          value={value} 
          onChange={(e) => onChange(e)} 
        />
       )}

        {type === 'password' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <Eye  
                size={20}
                className="text-black dark:text-gray-300"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeOff 
                size={20}
                className="text-slate-400 dark:text-slate-500"
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input;