import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlertPopup = ({content, onDelete}) => {

  const [loading,setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          className="flex justify-center items-center gap-2 bg-gray-100 dark:bg-gray-700 text-red-400 dark:text-red-400 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200"
          onClick={handleDelete}
          type="button"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" /> Deleting...
            </>
          ) : (
            "Delete Income"
          )}
        </button>
      </div>  
    </div>
  )
}

export default DeleteAlertPopup;