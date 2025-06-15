
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Database, Zap, AlertTriangle } from "lucide-react";

interface AnalysisResultsProps {
  analysis: any;
  isAnalyzing: boolean;
}

const AnalysisResults = ({ analysis, isAnalyzing }: AnalysisResultsProps) => {
  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm">AI is analyzing your code...</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-slate-700" />
          <Skeleton className="h-4 w-3/4 bg-slate-700" />
          <Skeleton className="h-4 w-1/2 bg-slate-700" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <Zap className="h-12 w-12 text-slate-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-300 mb-2">Ready to Analyze</h3>
        <p className="text-slate-500">
          Enter your code and click "Analyze Code" to get AI-powered insights
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-400">Time Complexity</span>
          </div>
          <div className="text-2xl font-bold text-blue-300">{analysis.timeComplexity}</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-slate-400">Space Complexity</span>
          </div>
          <div className="text-2xl font-bold text-purple-300">{analysis.spaceComplexity}</div>
        </Card>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-400 mb-3">Detected Algorithm</h4>
        <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-300">
          {analysis.algorithm}
        </Badge>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-400 mb-3">Quick Insights</h4>
        <div className="space-y-2">
          {analysis.suggestions.slice(0, 2).map((suggestion: string, index: number) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-300">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {analysis.bugs && analysis.bugs.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Issues Found
          </h4>
          <div className="space-y-2">
            {analysis.bugs.map((bug: string, index: number) => (
              <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-300">{bug}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
