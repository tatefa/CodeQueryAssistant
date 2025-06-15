
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ComplexityChartProps {
  analysis: any;
}

const ComplexityChart = ({ analysis }: ComplexityChartProps) => {
  const getComplexityScore = (complexity: string) => {
    const scores: { [key: string]: number } = {
      "O(1)": 100,
      "O(log n)": 85,
      "O(n)": 70,
      "O(n log n)": 55,
      "O(n²)": 40,
      "O(2^n)": 20,
      "O(n!)": 10
    };
    return scores[complexity] || 50;
  };

  const getComplexityColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getComplexityIcon = (complexity: string) => {
    if (complexity.includes("1") || complexity.includes("log")) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    }
    if (complexity.includes("n²") || complexity.includes("2^n") || complexity.includes("n!")) {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
    return <Minus className="h-4 w-4 text-yellow-400" />;
  };

  const timeScore = getComplexityScore(analysis.timeComplexity);
  const spaceScore = getComplexityScore(analysis.spaceComplexity);

  const complexityExplanations = {
    "O(1)": "Constant time - excellent!",
    "O(log n)": "Logarithmic - very efficient",
    "O(n)": "Linear - good for most cases",
    "O(n log n)": "Linearithmic - acceptable",
    "O(n²)": "Quadratic - may be slow for large inputs",
    "O(2^n)": "Exponential - very slow",
    "O(n!)": "Factorial - extremely slow"
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getComplexityIcon(analysis.timeComplexity)}
            <span className="text-sm font-medium text-slate-300">Time Complexity</span>
          </div>
          <span className={`text-sm font-bold ${getComplexityColor(timeScore)}`}>
            {analysis.timeComplexity}
          </span>
        </div>
        <Progress value={timeScore} className="h-2 bg-slate-700" />
        <p className="text-xs text-slate-400 mt-1">
          {complexityExplanations[analysis.timeComplexity as keyof typeof complexityExplanations]}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getComplexityIcon(analysis.spaceComplexity)}
            <span className="text-sm font-medium text-slate-300">Space Complexity</span>
          </div>
          <span className={`text-sm font-bold ${getComplexityColor(spaceScore)}`}>
            {analysis.spaceComplexity}
          </span>
        </div>
        <Progress value={spaceScore} className="h-2 bg-slate-700" />
        <p className="text-xs text-slate-400 mt-1">
          {complexityExplanations[analysis.spaceComplexity as keyof typeof complexityExplanations]}
        </p>
      </div>

      <Card className="p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
        <h5 className="text-sm font-medium text-white mb-2">Algorithm Efficiency</h5>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-blue-400">
            {Math.round((timeScore + spaceScore) / 2)}%
          </div>
          <div className="text-sm text-slate-300">
            Overall efficiency score
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Card className="p-3 bg-green-500/10 border-green-500/20">
          <div className="text-green-300 font-medium">Best Case</div>
          <div className="text-green-200">{analysis.timeComplexity}</div>
        </Card>
        <Card className="p-3 bg-red-500/10 border-red-500/20">
          <div className="text-red-300 font-medium">Worst Case</div>
          <div className="text-red-200">{analysis.timeComplexity}</div>
        </Card>
      </div>
    </div>
  );
};

export default ComplexityChart;
