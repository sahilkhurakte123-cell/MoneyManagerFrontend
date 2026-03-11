import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md">
        <p className="font-medium text-gray-800 mb-2">{label}</p>
        <p className="text-sm text-gray-700">
          Total: <span className="font-bold text-violet-600">₹{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">Details:</p>
        {payload[0].payload.items.map((item, index) => (
          <p key={index} className="text-sm text-gray-600">
            {item.name}: <span>₹{item.amount.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
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
          tick={{ fontSize: 12, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: "#6b7280" }}
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