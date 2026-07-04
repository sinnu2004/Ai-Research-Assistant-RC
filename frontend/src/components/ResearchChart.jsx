import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResearchChart;