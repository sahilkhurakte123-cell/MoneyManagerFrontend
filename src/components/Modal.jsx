import { X } from "lucide-react";

const Modal = ({isOpen, onClose, children, title}) => {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 dark:border-gray-700 rounded-t-xl">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h3>

            <button 
              onClick={onClose}
              type="button"
              className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg text-sm w-9 h-9 flex justify-center items-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <X className="w-4 h-4" size={15} />
            </button>
          </div>

          <div className="p-5 md:p-6 text-gray-700 dark:text-gray-300">
            {children}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Modal;