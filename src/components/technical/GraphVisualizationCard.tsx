
import React from "react";
import { Network } from "lucide-react";

interface GraphVisualizationCardProps {
  useCaseType: 'fraud' | 'aml' | 'cyber';
}

export const GraphVisualizationCard: React.FC<GraphVisualizationCardProps> = ({
  useCaseType
}) => {
  return (
    <div className="relative w-full h-[300px] bg-muted/30 rounded-lg overflow-hidden border border-border">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/43e16e59-e947-43e4-aa4e-09e70640fbd6.png"
          alt="Graph Visualization"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Watchlist Entity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Clean Entity</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 text-xs bg-background/80 backdrop-blur-sm p-2 rounded-lg">
        Connected to {useCaseType.toUpperCase()} network data
      </div>
    </div>
  );
};
