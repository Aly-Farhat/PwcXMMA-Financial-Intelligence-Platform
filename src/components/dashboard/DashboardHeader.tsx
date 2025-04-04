
import React from "react";
import { BarChart3 } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b pb-4">
      <div className="flex items-center">
        <div className="bg-primary p-2 rounded-lg mr-4">
          <BarChart3 className="text-primary-foreground h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/PricewaterhouseCoopers_Logo.svg/250px-PricewaterhouseCoopers_Logo.svg.png" 
          alt="PwC Logo" 
          className="h-8"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
