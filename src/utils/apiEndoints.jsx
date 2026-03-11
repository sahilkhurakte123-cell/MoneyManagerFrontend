// export const BASE_URL = "https://moneymanager-5n2s.onrender.com"
export const BASE_URL = "http://localhost:8080/"
const CLOUDINARY_CLOUD_NAME = "dqouyzlfw";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/register",
  GET_USER: "/profile",
  GET_ALL_CATEGORIES: "/category",
  ADD_CATEGORY: "/category",
  UPDATE_CATEGORY: (categoryId)=> `/${categoryId}`,
  UPLOAD_IMAGE:  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  GET_INCOMES: "/incomes",
  CATEGORY_BY_TYPE: (type) => `/${type}`,
  ADD_INCOME: "/incomes",
  ADD_EXPENSE: "/expenses",
  DELETE_INCOME: (id) => `/incomes/${id}`,
  DELETE_EXPENSE: (id) => `/expenses/${id}`,
  GET_EXPENSES: "/expenses",
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
  EMAIL_INCOME: "/email/income-excel",
  EMAIL_EXPENSE: "/email/expense-excel",
  APPLY_FILTER: "/filter",
  DASHBOARD_DATA: "/dashboard"
}