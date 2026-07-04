import { useState } from "react";
import {
  Search,
  Building2,
  Package,
  AlertTriangle,
  Users,
  Sparkles,
  Loader2,
} from "lucide-react";
import { researchCompany } from "./services/api";
import { Download } from "lucide-react";
import ResearchChart from "./components/ResearchChart";
import { generatePDF } from "./utils/pdfGenerator";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleResearch = async () => {
  if (!query.trim()) return;

  try {
    setLoading(true);

    setError("");
    setResult(null);

    const data = await researchCompany(query);

    setResult(data);
  } catch (err) {
    console.error(err);

    setError(
      "Failed to generate research report. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Sparkles size={40} className="text-blue-400" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            AI Company Research Assistant
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Generate professional company intelligence reports,
            competitive analysis, product insights, and business
            opportunities in seconds using AI-powered research automation.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleResearch();
              }
            }}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleResearch}
            disabled={loading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 rounded-xl flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Researching...
              </>
            ) : (
              <>
                <Search size={18} />
                Research
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-pulse">
            <div className="space-y-3">
              <p className="text-blue-400 font-medium">
                Researching {query}
              </p>

              <p className="text-zinc-400 text-sm">
                Gathering company information...
              </p>

              <p className="text-zinc-400 text-sm">
                Identifying products and services...
              </p>

              <p className="text-zinc-400 text-sm">
                Analyzing competitors...
              </p>

              <p className="text-zinc-400 text-sm">
                Generating AI insights...
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          
          <div className="space-y-6 mt-8">
            <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-zinc-400">Products</p>
                  <h3 className="text-3xl font-bold text-green-400">
                    {result?.ai_analysis?.products_services?.length || 0}
                  </h3>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-zinc-400">Pain Points</p>
                  <h3 className="text-3xl font-bold text-yellow-400">
                    {result?.ai_analysis?.business_pain_points?.length || 0}
                  </h3>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-zinc-400">Competitors</p>
                  <h3 className="text-3xl font-bold text-purple-400">
                    {result?.ai_analysis?.top_5_competitors?.length || 0}
                  </h3>
                </div>

              </div>
            <ResearchChart result={result} />
            <div className="flex justify-end">
              <button
                onClick={() => generatePDF(result)}
                className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl flex items-center gap-2"
              >
                <Download size={18} />
                Download Report
              </button>
            </div>
            {/* Company Info */}
            <div className="bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="text-blue-400" />
                <h2 className="text-2xl font-bold">
                  Company Information
                </h2>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {result.company_name}
                </p>

                <p>
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={result.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {result.website}
                  </a>
                </p>

                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {result.description}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Company Summary
              </h2>

              <p className="text-zinc-300 leading-8">
                {result?.ai_analysis?.company_summary || "No summary available"}
              </p>
            </div>

            {/* Products */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-green-400" />
                <h2 className="text-2xl font-bold">
                  Products & Services
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {result?.ai_analysis?.products_services?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800 rounded-xl p-4"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Pain Points */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-yellow-400" />
                <h2 className="text-2xl font-bold">
                  Business Pain Points
                </h2>
              </div>

              <div className="space-y-3">
                {result?.ai_analysis?.business_pain_points?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800 rounded-xl p-4"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Competitors */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-purple-400" />
                <h2 className="text-2xl font-bold">
                  Competitor Analysis
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {result?.ai_analysis?.top_5_competitors?.map(
                  (competitor, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl p-6 text-center"
                    >
                      <Users
                        className="mx-auto mb-3 text-purple-400"
                        size={28}
                      />

                      <h3 className="font-semibold text-lg">
                        {competitor}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
          <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-zinc-500">
          Built using React, FastAPI, Gemini AI and Vercel
        </div>
      </footer>
    </div>
  );
}

export default App;
