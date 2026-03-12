import { addThousandsSeparator } from "../utils/utilities";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({TotalBalance, TotalIncome, TotalExpense}) => {

  const COLORS = ["#59168B", "#a0090e", "#016630"];
  const balanceData = [
    {name: "Total Balance", amount: TotalBalance},
    {name: "Total Income", amount: TotalIncome},
    {name: "Total Expense", amount: TotalExpense}
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium text-gray-800 dark:text-gray-100">Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(TotalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview;