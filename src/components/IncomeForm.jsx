import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./input";
import { LoaderCircle } from "lucide-react";

const IncomeForm = ({onAddIncome, categories}) => {
  const [income, setIncome] = useState({
    name: '',
    amount:'',
    date: '',
    icon: '',
    categoryId: ''  
  });

  const [loading, setLoading] = useState(false);   

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name
  }))

  const handleChange = (key, value) => {
    setIncome({...income, [key]:value})
  }

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(categories.length > 0 && !income.categoryId){
      setIncome((prev) => ({...prev, categoryId:categories[0].id}))
    }
  },[categories, income.categoryId]);

  return (
    <div>
      <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input 
        value={income.name}
        onChange={({target}) => handleChange('name', target.value)}
        label="Income Source"
        placeholder="e.g Salary, Bonus"
        type="text"
      />

      <Input 
        label="Category"
        value={income.categoryId}
        onChange={({target}) => handleChange('categoryId', target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input 
        label="Amount"
        value={income.amount}
        onChange={({target}) => handleChange('amount', target.value)}
        placeholder="e.g 500, 10000 ,7628"
        type="number"
      />

      <Input 
        label="Date"
        value={income.date}
        onChange={({target}) => handleChange('date', target.value)}
        placeholder=" "
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button 
          onClick={handleAddIncome}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 font-medium rounded-lg border border-green-100 dark:border-green-800 cursor-pointer transition-colors">
            {loading? (
             <><LoaderCircle className="w-4 h-4 animate-spin" /> Adding...</> 
            ) : (
              "Add income"
            )}
        </button>
      </div>  
    </div>
  )
}

export default IncomeForm;