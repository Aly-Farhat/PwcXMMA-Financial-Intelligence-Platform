
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Clock, ArrowUpDown } from "lucide-react";

interface PipelineStep {
  name: string;
  status: "success" | "warning" | "error" | "pending";
  latency?: number;
  throughput?: number;
  lastRun?: string;
}

interface PipelineStatusCardProps {
  title: string;
  description?: string;
  steps: PipelineStep[];
}

export const PipelineStatusCard: React.FC<PipelineStatusCardProps> = ({
  title,
  description,
  steps
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": 
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning": 
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error": 
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: 
        return <Clock className="h-5 w-5 text-slate-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-50 border-green-200";
      case "warning": return "bg-amber-50 border-amber-200";
      case "error": return "bg-red-50 border-red-200";
      default: return "bg-slate-50 border-slate-200";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Pipeline Step</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Latency</th>
                <th className="text-left p-3 font-medium">Throughput</th>
                <th className="text-left p-3 font-medium">Last Run</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {steps.map((step, i) => (
                <tr key={i} className={getStatusColor(step.status)}>
                  <td className="p-3 font-medium">{step.name}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(step.status)}
                      <span className="ml-2">{step.status}</span>
                    </div>
                  </td>
                  <td className="p-3">{step.latency ? `${step.latency}ms` : "-"}</td>
                  <td className="p-3">
                    {step.throughput ? (
                      <div className="flex items-center">
                        <ArrowUpDown className="h-3 w-3 mr-1" />
                        {step.throughput}/s
                      </div>
                    ) : "-"}
                  </td>
                  <td className="p-3">{step.lastRun || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
