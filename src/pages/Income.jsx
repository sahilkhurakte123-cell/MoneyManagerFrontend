import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserhook";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import IncomeForm from "../components/IncomeForm";
import DeleteAlertPopup from "../components/DeleteAlertPopup";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data:null
  });

  const fetchIncomeData = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_INCOMES);
      if(response.status === 200){
        console.log("Fetched incomes data succussfully", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error while fetching income data", error);
      toast.error(error.response?.data?.message || "Failed to fetch incomes data");
    } finally {
      setLoading(false);
    }
  }

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"))
      if(response.status === 200){
        console.log(response.data)
        setCategories(response.data);

      }
    } catch (error) {
        console.error("Failed to fetch income categories", error);
        toast.error(error.data?.message || "Failed to fetch income categories");
    }
  }

  const handleAddIncome = async (income) => {
    const {name, amount, date, icon, categoryId} = income;

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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount), 
        date,
        icon,
        categoryId
      });

      if(response.status === 201){
        toast.success("Income added succesfully");
        setOpenAddIncomeModel(false);
        fetchIncomeData();
        fetchIncomeCategories();
      }
    } catch (error) {
        console.error("Error while adding income", error);
        toast.error(error.response?.data?.message || "Error while adding income");
    }
  }

  const deleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      if(response.status === 200){
        setOpenDeleteAlert({show:false, data:null});
        toast.success("Income deleted succesfully");
        fetchIncomeData();
      }
    } catch (error) {
      console.error("Error while deleting income",error);
      toast.error(error.response?.data?.message || "Error while deleting income");
    }
  }

  const handleMail = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status === 200){
        toast.success("Income details email sent succesfully");
      }
    } catch (error) {
      console.log("Error while sending income details email", error);
      toast.success(error.response?.data?.message || "Error while sending income details email");
    }
  }

  const handleDownload = async() => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded income details succesfully");
    } catch (error) {
      console.log("Error while downloading income details", error);
      toast.success(error.response?.data?.message || "Error while downloading income details");
    } 
  }

  useEffect(() => {
    fetchIncomeData();
    fetchIncomeCategories();
  },[])

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
          
            {/* {overview for income with line chart} */}
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList 
            onDownload={handleDownload}
            onEmail={handleMail}
            onDelete={(id) => setOpenDeleteAlert({
              show:true,
              data:id
            })}
            transactions={incomeData} 
          />

          {/* {Add income model}  */}
          <Modal
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title={"Add Income"} 
          >
            <IncomeForm 
              onAddIncome={(income => handleAddIncome(income))} 
              categories={categories} 
            />
          </Modal>

          {/* {Delete Income Model}  */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({
              show:false,
              data:null
            })}
            title="Delete Income"
          >
            <DeleteAlertPopup 
              content="Are you sure you want to delete this?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>

        </div>
      </div>
    </Dashboard>
  )
}

export default Income;