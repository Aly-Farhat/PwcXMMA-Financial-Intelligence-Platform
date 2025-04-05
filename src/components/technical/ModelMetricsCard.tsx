
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Metric {
  name: string;
  value: number | string;
  color?: string;
  className?: string;
  description?: string;
}

interface ModelMetricsCardProps {
  title: string;
  description?: string;
  metrics: Metric[];
  columns?: number;
  variant?: "default" | "bordered";
  className?: string;
}

export const ModelMetricsCard: React.FC<ModelMetricsCardProps> = ({
  title,
  description,
  metrics,
  columns = 2,
  variant = "default",
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-4`}>
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${variant === "bordered" ? "border p-3 rounded-md" : ""} ${metric.className || ""}`}
            >
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div 
                className="text-2xl font-bold" 
                style={{ color: metric.color ? metric.color : 'inherit' }}
              >
                {metric.value}
              </div>
              {metric.description && (
                <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
