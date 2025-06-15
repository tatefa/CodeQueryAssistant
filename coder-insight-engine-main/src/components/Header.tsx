
import { Code2, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Code Query Assistant</h1>
              <p className="text-sm text-slate-400">AI-Powered Code Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
              <Star className="h-4 w-4 mr-2" />
              Star
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
