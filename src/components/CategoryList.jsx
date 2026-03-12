import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({categories, onEditCategory}) => {
  return (
    <div>
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Category Sources
          </h4>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No categories found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group relative flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-600 rounded-full">
                    {category.icon ? (
                      <span className="text-2xl">
                        <img src={category.icon} alt="category" className="h-5 w-5"/>
                      </span>
                    ) : (
                      <Layers2 className="text-green-500 dark:text-green-400" size={24} />
                    )}
                  </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-200 font font-medium">
                          {category.name}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 font font-medium mt-1 capitalize">
                          {category.type}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onEditCategory(category)}
                          className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default CategoryList;