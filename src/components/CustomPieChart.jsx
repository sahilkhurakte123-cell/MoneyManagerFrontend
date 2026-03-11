import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const renderCustomLabel = ({ cx, cy }) => {
    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm"
          fill="#666"
          fontSize={14}
        >
          {label}
        </text>
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#111"
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
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;