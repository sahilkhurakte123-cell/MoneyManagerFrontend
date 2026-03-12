import { ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { useTheme } from "../context/ThemeContext";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-md">
        <p className="font-medium text-gray-800 dark:text-gray-100 mb-2">{label}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Total: <span className="font-bold text-violet-600 dark:text-violet-400">₹{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Details:</p>
        {payload[0].payload.items.map((item, index) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
            {item.name}: <span>₹{item.amount.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  const { darkMode } = useTheme();
  const tickColor = darkMode ? "#9ca3af" : "#6b7280";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="totalAmount"
          stroke="#8b5cf6"
          strokeWidth={2}
          fill="url(#incomeGradient)"
          dot={{ fill: "#8b5cf6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;