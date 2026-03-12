import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../utils/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);
    return () => {};
  },[transactions])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium text-gray-800 dark:text-gray-100">Income Overview</h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Track your earnings and analyze your income trends.
          </p>
        </div>
        <button
          onClick={onAddIncome}  
          className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 font-medium rounded-lg border border-green-100 dark:border-green-800 cursor-pointer transition-colors mb-4"
        >
          <Plus size={15} /> Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div> 
    </div>
  )
}

export default IncomeOverview;