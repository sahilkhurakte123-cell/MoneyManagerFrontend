import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../utils/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({transactions,onAddIncome}) => {

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
          <h5 className="text-lg">Income overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">Track your earnings and analyze your income trends.</p>
        </div>
        <button
            onClick={onAddIncome}  
            className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg border border-green-100 cursor-pointer transition-colors mb-4"
        >
            <Plus size={15} /> Add Income
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

export default IncomeOverview;