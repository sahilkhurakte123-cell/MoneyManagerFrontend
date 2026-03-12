import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandsSeparator } from "../utils/utilities";

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteBtn, onDelete}) => {

  const getAmountStyles = () => type === 'income' 
    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
    : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400';

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-700/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <UtensilsCrossed className="text-green-800 dark:text-green-400" />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{title}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 dark:text-gray-500 hover:text-red-800 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-medium">
              {type === 'income' ? '+' : '-'} ₹{addThousandsSeparator(amount)}
            </h6>
            {type === 'income' ? (
              <TrendingUp size={15} />
            ) : (
              <TrendingDown size={15} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard;