import { useNavigate } from "react-router-dom";
import { WalletCards, TrendingUp, ShieldCheck, BarChart3 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <WalletCards className="text-green-700" size={28} />
          <span className="text-xl font-bold text-gray-800">MoneyManager</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Take Control of Your <br />
          <span className="text-green-700">Finances</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mb-8">
          Track your income and expenses, visualize your spending, and make smarter financial decisions — all in one place.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Start for Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Everything you need to manage money
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-green-700" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Income</h3>
            <p className="text-sm text-gray-500">Log all your income sources and see where your money comes from.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="text-red-600" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Monitor Expenses</h3>
            <p className="text-sm text-gray-500">Keep an eye on your spending with detailed expense tracking and charts.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-green-700" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-500">Your financial data is protected with JWT authentication and secure storage.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
        © 2026 MoneyManager. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;