import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const ExpenseList = ({transactions, onDelete, onDownload, onEmail}) => {

  const [loading, setLoading] = useState(false);
  
  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium text-gray-800 dark:text-gray-100">Expense Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button 
            disabled={loading}
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} className="text-green-500 dark:text-green-400"/> Email
              </>
            )}
          </button>
          <button
            disabled={loading}
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} className="text-green-500 dark:text-green-400"/> Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((Expense) => (
          <TransactionInfoCard
            key={Expense.id}
            title={Expense.name}
            date={moment(Expense.date).format('Do MMM YYYY')}
            amount={Expense.amount}
            type="Expense"
            onDelete={() => onDelete(Expense.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList;