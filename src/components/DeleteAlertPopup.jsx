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
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          className="flex justify-center items-center bg-gray-100 text-red-400 px-3 py-1 rounded-lg border border-black hover:bg-red-200"
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