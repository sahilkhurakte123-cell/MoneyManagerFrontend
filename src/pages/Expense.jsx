import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserhook";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import ExpenseForm from "../components/ExpenseForm";
import DeleteAlertPopup from "../components/DeleteAlertPopup";
import ExpenseOverview from "../components/ExpenseOverview.jsx";

const Expense = () => {
  useUser();

  const [ExpenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data:null
  });

  const fetchExpenseData = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_EXPENSES);
      if(response.status === 200){
        console.log("Fetched Expenses data succussfully", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error while fetching Expense data", error);
      toast.error(error.response?.data?.message || "Failed to fetch Expenses data");
    } finally {
      setLoading(false);
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"))
      if(response.status === 200){
        console.log(response.data)
        setCategories(response.data);

      }
    } catch (error) {
        console.error("Failed to fetch Expense categories", error);
        toast.error(error.data?.message || "Failed to fetch Expense categories");
    }
  }

  const handleAddExpense = async (Expense) => {
    const {name, amount, date, icon, categoryId} = Expense;

    if(!name.trim()){
      toast.error("Enter name");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Please enter a valid amount");
      return;
    }

    if(!date){
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if(date > today){
      toast.error("Please enter a valid date");
      return;
    }
    
    if(!categoryId){
      toast.error("Enter category id");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount), 
        date,
        icon,
        categoryId
      });

      if(response.status === 201){
        toast.success("Expense added succesfully");
        setOpenAddExpenseModel(false);
        fetchExpenseData();
        fetchExpenseCategories();
      }
    } catch (error) {
        console.error("Error while adding Expense", error);
        toast.error(error.response?.data?.message || "Error while adding Expense");
    }
  }

  const deleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      if(response.status === 200){
        setOpenDeleteAlert({show:false, data:null});
        toast.success("Expense deleted succesfully");
        fetchExpenseData();
      }
    } catch (error) {
      console.error("Error while deleting Expense",error);
      toast.error(error.response?.data?.message || "Error while deleting Expense");
    }
  }

  const handleMail = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if(response.status === 200){
        toast.success("Expense details email sent succesfully");
      }
    } catch (error) {
      console.log("Error while sending expense details email", error);
      toast.success(error.response?.data?.message || "Error while sending expense details email");
    }
  }

  const handleDownload = async() => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded expense details succesfully");
    } catch (error) {
      console.log("Error while downloading expense details", error);
      toast.success(error.response?.data?.message || "Error while downloading expense details");
    } 
  }

  useEffect(() => {
    fetchExpenseData();
    fetchExpenseCategories();
  },[])

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
          
            {/* {overview for Expense with line chart} */}
            <ExpenseOverview 
              transactions={ExpenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>

          <ExpenseList 
            onDownload={handleDownload}
            onEmail={handleMail}
            onDelete={(id) => setOpenDeleteAlert({
              show:true,
              data:id
            })}
            transactions={ExpenseData} 
          />

          {/* {Add Expense model}  */}
          <Modal
            isOpen={openAddExpenseModel}
            onClose={() => setOpenAddExpenseModel(false)}
            title={"Add Expense"} 
          >
            <ExpenseForm 
              onAddExpense={(Expense => handleAddExpense(Expense))} 
              categories={categories} 
            />
          </Modal>

          {/* {Delete Expense Model}  */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({
              show:false,
              data:null
            })}
            title="Delete Expense"
          >
            <DeleteAlertPopup 
              content="Are you sure you want to delete this?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>

        </div>
      </div>
    </Dashboard>
  )
}

export default Expense;