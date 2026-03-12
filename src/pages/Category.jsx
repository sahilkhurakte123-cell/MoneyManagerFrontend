import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserhook";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import CategoryForm from "../components/CategoryForm";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openCategoryModel, setOpenCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if(response.status == 200){
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }  

  useEffect(() => {
    fetchCategoryDetails();
  },[]);

  const handleAddCategory = async (category) => {
    const {icon, name, type} = category;
    if(!name.trim()){
      toast.error("Name not present");
      return;
    }
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase === name.trim().toLowerCase();
    })
    if(isDuplicate){
      toast.error("Category already exists");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {icon, name, type});
      if(response.status == 200){
        toast.success("Added Succesfully");
        setOpenCategoryModel(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  }

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  }

  const handleUpdateCategory = async (updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;
    if(!name.trim()){
      toast.error("Category name required");
      return;
    }
    if(!id){
      toast.error("Category not selected");
      return;
    }
    try {
      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon})
      if(response.status === 200){
        setOpenEditCategoryModel(false);
        setSelectedCategory(null);
        toast.success("Category Edited Succesfully");
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error while updating the category", error);
      toast.error(error.response?.data?.message || "Error while updating the category");
    }
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            All Categories
          </h2> 
          <button 
            onClick={() => setOpenCategoryModel(true)}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white rounded-full font-medium transition-colors cursor-pointer">
              <Plus size={15} />
              Add Category
          </button>
        </div>

        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

        <Modal 
          isOpen={openCategoryModel}
          onClose={() => setOpenCategoryModel(false)}
          title="Add Category">
          <CategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        <Modal 
          isOpen={openEditCategoryModel}
          onClose={() => {
            setOpenEditCategoryModel(false)
            setSelectedCategory(null)
          }}
          title="Edit Category">
          <CategoryForm 
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>
      </div>
    </Dashboard>
  )
}

export default Category;