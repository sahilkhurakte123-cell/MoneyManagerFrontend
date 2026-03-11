import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./input";
import { LoaderCircle } from "lucide-react";

const ExpenseForm = ({onAddExpense, categories}) => {
  const [Expense, setExpense] = useState({
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
    setExpense({...Expense, [key]:value})
  }

  const handleAddExpense = async () => {
    setLoading(true);

    try {
      await onAddExpense(Expense);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(categories.length > 0 && !Expense.categoryId){
      setExpense((prev) => ({...prev, categoryId:categories[0].id}))
    }
  },[categories, Expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopup 
        icon={Expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input 
        value={Expense.name}
        onChange={({target}) => handleChange('name', target.value)}
        label="Expense Source"
        placeholder="e.g Salary, Bonus"
        type="text"
      />

      <Input 
        label="Category"
        value={Expense.categoryId}
        onChange={({target}) => handleChange('categoryId', target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input 
        label="Amount"
        value={Expense.amount}
        onChange={({target}) => handleChange('amount', target.value)}
        placeholder="e.g 500, 10000 ,7628"
        type="number"
      />

      <Input 
        label="Date"
        value={Expense.date}
        onChange={({target}) => handleChange('date', target.value)}
        placeholder=" "
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button 
          onClick={handleAddExpense}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg border border-green-100 cursor-pointer transition-colors">
            {loading? (
             <><LoaderCircle className="w-4 h-4 animate-spin" /> Adding...</> 
            ) : (
              "Add Expense"
            )}
        </button>
      </div>  
    </div>
  )
}

export default ExpenseForm;