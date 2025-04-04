
import React from "react";
import { Network } from "lucide-react";

interface GraphVisualizationCardProps {
  useCaseType: 'fraud' | 'aml' | 'cyber';
}

export const GraphVisualizationCard: React.FC<GraphVisualizationCardProps> = ({
  useCaseType
}) => {
  // In a real app, this would be a proper graph visualization
  // For this demo, we'll use a placeholder showing what it would look like
  
  const getUseCaseColor = () => {
    switch(useCaseType) {
      case 'fraud':
        return '#9b87f5';
      case 'aml':
        return '#68d391';
      case 'cyber':
        return '#f6ad55';
      default:
        return '#9b87f5';
    }
  };
  
  return (
    <div className="relative w-full h-[300px] bg-muted/30 rounded-lg overflow-hidden border border-border flex items-center justify-center">
      {/* This is a placeholder for a real graph visualization library like vis.js, sigma.js, or react-force-graph */}
      <div className="absolute inset-0 opacity-10">
        {/* Simulate node connections with CSS */}
        <div className="absolute top-[30%] left-[25%] w-[40%] h-[1px] bg-primary transform rotate-45"></div>
        <div className="absolute top-[40%] left-[35%] w-[30%] h-[1px] bg-primary transform rotate-12"></div>
        <div className="absolute top-[60%] left-[45%] w-[20%] h-[1px] bg-primary transform -rotate-30"></div>
        <div className="absolute top-[70%] left-[25%] w-[35%] h-[1px] bg-primary transform -rotate-15"></div>
        <div className="absolute top-[20%] left-[50%] w-[25%] h-[1px] bg-primary transform rotate-30"></div>
        <div className="absolute top-[50%] left-[65%] w-[15%] h-[1px] bg-primary transform -rotate-45"></div>
        <div className="absolute top-[35%] left-[55%] w-[20%] h-[1px] bg-primary transform -rotate-20"></div>
        <div className="absolute top-[25%] left-[65%] w-[10%] h-[1px] bg-primary transform rotate-10"></div>
        
        {/* Nodes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const isHighlighted = i % 5 === 0;
          const top = Math.random() * 80 + 10;
          const left = Math.random() * 80 + 10;
          
          return (
            <div 
              key={i}
              className={`absolute rounded-full ${isHighlighted ? 'animate-pulse' : ''}`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: isHighlighted ? '#ef4444' : getUseCaseColor(),
                opacity: isHighlighted ? 1 : 0.7,
              }}
            ></div>
          );
        })}
      </div>
      
      <div className="text-center z-10">
        <Network className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <div className="font-medium">Interactive Graph Visualization</div>
        <div className="text-sm text-muted-foreground mt-1">Will render a real-time force-directed graph here</div>
        <div className="text-xs mt-3">Connected to {useCaseType.toUpperCase()} network data</div>
      </div>
    </div>
  );
};
