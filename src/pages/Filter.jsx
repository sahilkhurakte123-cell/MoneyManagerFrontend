import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUserhook";
import { useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(type, startDate, endDate, keyword, sortField, sortOrder);
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      console.log(response.data);
      
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch the details", error);
      toast.error(error.response?.data?.message || "Failed to fetch the details");
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <Dashboard activeMenu="Filter">
        <div className="my-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold ">Filter Transactions</h2>
          </div>
          <div className="card p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold">Select the filters</h5>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="type" >Type</label>
                <select value={type} onChange={e => setType(e.target.value)} id="type" className="w-full border rounded px-3 py-2 ">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="startdate">Start Date</label>
                <input value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded px-3 py-2" type="date" id="startdate" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="enddate">End Date</label>
                <input value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" type="date" id="enddate" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="type" >Sort field</label>
                <select value={sortField} onChange={e => setSortField(e.target.value)} id="sortfield" className="w-full border rounded px-3 py-2 ">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} id="sortorder" className="w-full border rounded px-3 py-2 ">
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>

              <div className="sm:col-span-1 md:col-span-1 flex items-end">
                <div className="w-full">
                  <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                  <input value={keyword} onChange={e => setKeyword(e.target.value)} className="w-full border rounded px-3 py-2" type="text" placeholder="Search" id="keyword" />
                </div>
                <button 
                  className="ml-2 mb-1 p-2 bg-green-800 hover:bg-green-800 text-white rounded flex items-center justify-center cursor-pointer"
                  onClick={handleSearch}
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
          <div className="card p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-semibold">Transactions</h4>
            </div>
            {transactions.length === 0 && !loading ? (
              <p className="text-gray-500">Select the filters</p>
            ) : ""}
            {loading ? (
              <p className="text-gray-500">Loading Transactions</p>
            ) : (
              ""
            )}
            {transactions.map((transaction) => (
              <TransactionInfoCard 
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format('Do MMM YYYY')}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn
              />
            ))}
          </div>
        </div>
    </Dashboard>
  )
}

export default Filter;