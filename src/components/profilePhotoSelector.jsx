import { useRef, useState } from "react";
import { User, Upload, Trash } from "lucide-react";

const ProfilePhotoSelector = ({image, setImage}) => {
  const inputRef = useRef(null); 
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview); 
    }
  }

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  }

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input type="file" 
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full relative">
          <User className="text-green-500 dark:text-green-400" size={35} />

          <button 
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full absolute -bottom-1 -right-1 border border-gray-200 dark:border-gray-600 transition-colors duration-200">
            <Upload size={15} className="text-green-800 dark:text-green-400" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="Photo" className="w-20 h-20 rounded-full object-cover" />
          <button 
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800 text-white rounded-full absolute -bottom-1 -right-1 transition-colors duration-200">
            <Trash size={15} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector;