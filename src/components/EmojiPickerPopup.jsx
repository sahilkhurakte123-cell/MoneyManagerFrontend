import { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "../context/ThemeContext";

const EmojiPickerPopup = ({icon, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const handleEmojiCLick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-lg">
          {icon ? (
            <img src={icon} alt="icon" className="w-12 h-12" />
          ) : (
            <Image />
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {icon ? "Change icon" : "Pick icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative">
          <button 
            className="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X size={14} />
          </button>
          
          <EmojiPicker 
            open={isOpen}
            onEmojiClick={handleEmojiCLick}
            theme={darkMode ? "dark" : "light"}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup;