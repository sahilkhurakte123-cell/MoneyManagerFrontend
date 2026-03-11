import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUserhook";
import { addThousandsSeparator } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if(response.status === 200){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error while fetching dashboard data", error);
      toast.error(error.response?.data?.message || "Error while fetching dashboard data");
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  },[])

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Display the cards */}
            <InfoCard 
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.TotalBalance || 0)}
              color="bg-green-800"
            />
            <InfoCard 
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.TotalIncome || 0)}
              color="bg-green-800"
            />
            <InfoCard 
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.TotalExpenses || 0)}
              color="bg-red-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
            {/* Recent Transactions */}
            <RecentTransactions 
              transactions={dashboardData?.RecentTransactions}
              onMore={() => navigate("/expense")}
            />
            {/* finance overview chart */}
            <FinanceOverview 
              TotalBalance={dashboardData?.TotalBalance || 0}
              TotalIncome={dashboardData?.TotalIncome || 0}
              TotalExpense={dashboardData?.TotalExpenses || 0}
            />

            {/* Expense Transactions */}
            <Transactions 
              title="Recent expenses"
              transactions={dashboardData?.Recent5Expenses|| []}
              onMore={() => navigate("/expense")}
              type= "expense"
            />

            {/* Income Transactions  */}
            <Transactions 
              title="Recent incomes"
              transactions={dashboardData?.Recent5Incomes || []}
              onMore={() => navigate("/income")}
              type="income"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home;