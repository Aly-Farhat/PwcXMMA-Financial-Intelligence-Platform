
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Metric {
  name: string;
  value: number | string;
  color?: string;
}

interface ModelMetricsCardProps {
  title: string;
  description?: string;
  metrics: Metric[];
}

export const ModelMetricsCard: React.FC<ModelMetricsCardProps> = ({
  title,
  description,
  metrics
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div 
                className="text-2xl font-bold" 
                style={{ color: metric.color ? metric.color : 'inherit' }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
