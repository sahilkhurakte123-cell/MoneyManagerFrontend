import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {Toaster} from "react-hot-toast";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />        {/* ✅ landing is now the root */}
          <Route path="/dashboard" element={<Root />} />  {/* ✅ dashboard checks auth */}
          <Route path="/income" element={<Income/>} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/filter" element={<Filter/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Home />
  ) : (
    <Navigate to="/login" />
  )
}

export default App;