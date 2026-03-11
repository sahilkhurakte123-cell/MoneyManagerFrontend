import { useEffect, useState } from "react";
import Input from "./input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const CategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: ""
  })

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(isEditing && initialCategoryData){
      setCategory(initialCategoryData);
    }
    else{
      setCategory({name:"",type:"income",icon:""});
    }
  },[isEditing, initialCategoryData])

  const categoryTypeOpts = [
    {value: "income", label: "Income"},
    {value: "expense", label: "Expense"}
  ]

  const handleChange = (key, value) => {
    setCategory({...category, [key]: value})
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      onAddCategory(category);
    } finally {
      setLoading(true);
    }
  }

  return (
    <div className="p-4">
      <EmojiPickerPopup 
        icon={category.icon} 
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} 
      />

      <Input 
        value={category.name} 
        onChange={({target}) => handleChange("name", target.value)} 
        label="Category Name" 
        placeholder="e.g Salary, Rent, Bonus" 
        type="text" 
      />

      <Input 
        label="Category type"
        value={category.type}
        onChange={({target}) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOpts} 
      />

      <div className="flex justify-end mt-6">
        <button 
          disabled={loading}
          onClick={handleSubmit} 
          type="button" 
          className="bg-green-400 add-btn add-btn-fill border border-black-100 rounded-lg px-2 py-2">
          {loading?(
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating... " : "Adding..."}
            </>
          ) : (
            <>
              {isEditing ? "Update Category" : "Add Category"}
            </>
          )}
        </button>
      </div>

    </div>
  )
}

export default CategoryForm;