import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CartesianGrid } from "recharts";

function ResearchChart({ result }) {
  const chartData = [
    {
      category: "Products",
      count: result?.ai_analysis?.products_services?.length || 0,
    },
    {
      category: "Pain Points",
      count: result?.ai_analysis?.business_pain_points?.length || 0,
    },
    {
      category: "Competitors",
      count: result?.ai_analysis?.top_5_competitors?.length || 0,
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Research Overview
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
                <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                />

                <XAxis
                dataKey="category"
                stroke="#a1a1aa"
                />

                <YAxis
                stroke="#a1a1aa"
                />

                <Tooltip />

                <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResearchChart;