
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Server, Cloud, GitBranch, Layers, Shield, Workflow } from "lucide-react";

interface FlowNode {
  id: string;
  name: string;
  type: "data" | "service" | "compute" | "storage" | "security";
  description?: string;
  icon?: React.ReactNode;
}

interface FlowConnection {
  source: string;
  target: string;
  label?: string;
}

interface ArchitectureFlowChartProps {
  title: string;
  description?: string;
  nodes: FlowNode[];
  connections: FlowConnection[];
}

export const ArchitectureFlowChart: React.FC<ArchitectureFlowChartProps> = ({
  title,
  description,
  nodes,
  connections
}) => {
  const getNodeIcon = (type: string, customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case "data": 
        return <Database className="h-6 w-6" />;
      case "service": 
        return <Cloud className="h-6 w-6" />;
      case "compute": 
        return <Server className="h-6 w-6" />;
      case "storage": 
        return <Layers className="h-6 w-6" />;
      case "security": 
        return <Shield className="h-6 w-6" />;
      default: 
        return <Workflow className="h-6 w-6" />;
    }
  };
  
  const getNodeColor = (type: string) => {
    switch (type) {
      case "data": return "bg-blue-100 border-blue-300 text-blue-800";
      case "service": return "bg-purple-100 border-purple-300 text-purple-800";
      case "compute": return "bg-orange-100 border-orange-300 text-orange-800";
      case "storage": return "bg-green-100 border-green-300 text-green-800";
      case "security": return "bg-red-100 border-red-300 text-red-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Expand</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-muted/10 rounded-lg border overflow-hidden p-4">
          {/* This is a simplified visual representation of the architecture */}
          {/* In a real implementation, this would use a library like react-flow or mermaid */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start h-full">
            <div className="flex flex-col space-y-6 md:space-y-16 w-full">
              {/* Data Collection Layer */}
              <div className="flex flex-wrap justify-center gap-4">
                {nodes.filter(node => node.type === "service" || node.type === "data").map((node) => (
                  <div 
                    key={node.id} 
                    className={`p-3 rounded-lg border-2 ${getNodeColor(node.type)} shadow-sm w-[140px]`}
                  >
                    <div className="flex justify-center mb-2">
                      {getNodeIcon(node.type, node.icon)}
                    </div>
                    <div className="text-center font-medium text-sm">{node.name}</div>
                    {node.description && (
                      <div className="text-center text-xs mt-1">{node.description}</div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Processing Layer */}
              <div className="flex flex-wrap justify-center gap-4">
                {nodes.filter(node => node.type === "compute").map((node) => (
                  <div 
                    key={node.id} 
                    className={`p-3 rounded-lg border-2 ${getNodeColor(node.type)} shadow-sm w-[140px]`}
                  >
                    <div className="flex justify-center mb-2">
                      {getNodeIcon(node.type, node.icon)}
                    </div>
                    <div className="text-center font-medium text-sm">{node.name}</div>
                    {node.description && (
                      <div className="text-center text-xs mt-1">{node.description}</div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Storage Layer */}
              <div className="flex flex-wrap justify-center gap-4">
                {nodes.filter(node => node.type === "storage").map((node) => (
                  <div 
                    key={node.id} 
                    className={`p-3 rounded-lg border-2 ${getNodeColor(node.type)} shadow-sm w-[140px]`}
                  >
                    <div className="flex justify-center mb-2">
                      {getNodeIcon(node.type, node.icon)}
                    </div>
                    <div className="text-center font-medium text-sm">{node.name}</div>
                    {node.description && (
                      <div className="text-center text-xs mt-1">{node.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Security Layer (vertical) */}
            <div className="hidden md:flex flex-col space-y-4 absolute right-4 top-4 bottom-4 justify-center">
              {nodes.filter(node => node.type === "security").map((node) => (
                <div 
                  key={node.id} 
                  className={`p-3 rounded-lg border-2 ${getNodeColor(node.type)} shadow-sm w-[120px]`}
                >
                  <div className="flex justify-center mb-2">
                    {getNodeIcon(node.type, node.icon)}
                  </div>
                  <div className="text-center font-medium text-sm">{node.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Connections would be drawn here in a real implementation */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full">
              {connections.map((conn, i) => (
                <g key={i} className="opacity-20">
                  <line x1="50%" y1="25%" x2="50%" y2="50%" stroke="#000" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="#000" strokeWidth="2" strokeDasharray="5,5" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
