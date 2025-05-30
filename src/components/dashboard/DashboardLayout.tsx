
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BarChart3, ShieldCheck, Lightbulb, Brain, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto py-2 px-4 sm:px-6 flex justify-end space-x-2">
          <Button 
            variant={location.pathname === "/" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/">
              <BarChart3 className="mr-1 h-4 w-4" />
              Executive Dashboard
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/compliance" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/compliance">
              <ShieldCheck className="mr-1 h-4 w-4" />
              Risk & Compliance
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/innovation" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/innovation">
              <Lightbulb className="mr-1 h-4 w-4" />
              Innovation
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/technical" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/technical">
              <Brain className="mr-1 h-4 w-4" />
              Technical
            </Link>
          </Button>
          <Button 
            variant={location.pathname === "/infrastructure" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/infrastructure">
              <Server className="mr-1 h-4 w-4" />
              Infrastructure
            </Link>
          </Button>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
