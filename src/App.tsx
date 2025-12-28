import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-primary" />
            Spark Template Ready
          </CardTitle>
          <CardDescription>
            Your production-ready Spark template is configured and working
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Counter Demo</p>
              <p className="text-4xl font-bold text-foreground">{count}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setCount(c => c - 1)}
                variant="outline"
              >
                Decrement
              </Button>
              <Button 
                onClick={() => setCount(c => c + 1)}
              >
                Increment
              </Button>
            </div>
            <Button 
              onClick={() => setCount(0)}
              variant="secondary"
              className="w-full"
            >
              Reset
            </Button>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-sm mb-2">✅ System Status</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• TypeScript configured</li>
              <li>• ESLint enabled</li>
              <li>• Tailwind CSS + shadcn/ui</li>
              <li>• Tests ready</li>
              <li>• CI/CD pipeline ready</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;