
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface RoiCardProps {
  title: string;
  metrics: Metric[];
  summary: string;
}

export const RoiCard: React.FC<RoiCardProps> = ({ title, metrics, summary }) => {
  return (
    <Card className="bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            {title}
          </CardTitle>
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs rounded-full">
            Strategic Impact
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-card rounded-lg border mt-2">
          <h4 className="font-medium mb-1">Competitive Edge & Innovation Impact</h4>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};
