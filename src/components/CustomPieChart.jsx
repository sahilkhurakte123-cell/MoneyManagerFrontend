import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const { darkMode } = useTheme();

  const renderCustomLabel = ({ cx, cy }) => {
    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm"
          fill={darkMode ? "#9ca3af" : "#666"}
          fontSize={14}
        >
          {label}
        </text>
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={darkMode ? "#f3f4f6" : "#111"}
          fontSize={20}
          fontWeight="bold"
        >
          {totalAmount}
        </text>
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={110}
          outerRadius={160}
          dataKey="amount"
          labelLine={false}
          label={showTextAnchor ? renderCustomLabel : undefined}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
            borderRadius: "8px"
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: darkMode ? "#d1d5db" : "#374151" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;