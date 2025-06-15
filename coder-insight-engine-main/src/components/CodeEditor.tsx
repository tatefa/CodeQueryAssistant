
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Loader2, Upload } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CodeEditor = ({ code, onChange, onAnalyze, isAnalyzing }: CodeEditorProps) => {
  const [language, setLanguage] = useState("javascript");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative">
          <input
            type="file"
            accept=".js,.py,.java,.cpp,.go,.ts"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your code here for analysis..."
        className="min-h-[300px] font-mono text-sm bg-slate-900/50 border-slate-600 text-slate-100 resize-none"
      />

      <Button 
        onClick={onAnalyze}
        disabled={isAnalyzing || !code.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Analyzing Code...
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Analyze Code
          </>
        )}
      </Button>
    </div>
  );
};

export default CodeEditor;
