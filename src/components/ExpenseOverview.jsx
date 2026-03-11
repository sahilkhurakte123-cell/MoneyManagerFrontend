import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../utils/prepareExpenseLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({transactions,onAddExpense}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  },[transactions])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">Track your earnings and analyze your Expense trends.</p>
        </div>
        <button
            onClick={onAddExpense}  
            className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg border border-green-100 cursor-pointer transition-colors mb-4"
        >
            <Plus size={15} /> Add Expense
        </button>
      </div>

      <div className="mt-10">
          <CustomLineChart 
            data={chartData}
          />
        </div> 
    </div>
  )
}

export default ExpenseOverview;