
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "@/components/CodeEditor";
import AnalysisResults from "@/components/AnalysisResults";
import ComplexityChart from "@/components/ComplexityChart";
import Header from "@/components/Header";
import { Code, Brain, TrendingUp, Bug } from "lucide-react";

const Index = () => {
  const [code, setCode] = useState(`// Enter your code here for analysis
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`);
  
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with mock data
    setTimeout(() => {
      const mockAnalysis = {
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        algorithm: "Binary Search",
        suggestions: [
          "Consider using built-in Array.indexOf() for simpler cases",
          "Add input validation for edge cases",
          "Consider using a more descriptive variable name than 'mid'"
        ],
        optimizations: [
          {
            title: "Memory Optimization",
            description: "Current implementation is already optimal for space complexity",
            impact: "Low"
          },
          {
            title: "Error Handling",
            description: "Add bounds checking and type validation",
            impact: "Medium"
          }
        ],
        bugs: [],
        performance: {
          rating: 9,
          description: "Excellent algorithmic efficiency"
        }
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Code Query Assistant
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Understand, debug, and optimize your code with AI-powered insights. 
            Get complexity analysis, algorithm suggestions, and performance recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Code Input</h3>
              </div>
              <CodeEditor code={code} onChange={setCode} onAnalyze={analyzeCode} isAnalyzing={isAnalyzing} />
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
              </div>
              <AnalysisResults analysis={analysis} isAnalyzing={isAnalyzing} />
            </div>
          </Card>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Complexity Analysis</h3>
                </div>
                <ComplexityChart analysis={analysis} />
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm lg:col-span-2">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bug className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Detailed Insights</h3>
                </div>
                
                <Tabs defaultValue="suggestions" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-700">
                    <TabsTrigger value="suggestions" className="data-[state=active]:bg-purple-600">
                      Suggestions
                    </TabsTrigger>
                    <TabsTrigger value="optimizations" className="data-[state=active]:bg-purple-600">
                      Optimizations
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">
                      Performance
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="suggestions" className="mt-4">
                    <div className="space-y-3">
                      {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                          <p className="text-slate-300">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="optimizations" className="mt-4">
                    <div className="space-y-3">
                      {analysis.optimizations.map((opt, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">{opt.title}</h4>
                            <span className={`px-2 py-1 rounded text-xs ${
                              opt.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                              opt.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {opt.impact} Impact
                            </span>
                          </div>
                          <p className="text-slate-300">{opt.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="mt-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl font-bold text-green-400">
                          {analysis.performance.rating}/10
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Performance Score</h4>
                          <p className="text-slate-300">{analysis.performance.description}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
