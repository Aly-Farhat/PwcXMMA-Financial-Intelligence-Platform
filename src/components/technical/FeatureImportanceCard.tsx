
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Feature {
  name: string;
  importance: number;
  description?: string;
}

interface FeatureImportanceCardProps {
  title: string;
  description?: string;
  features: Feature[];
}

export const FeatureImportanceCard: React.FC<FeatureImportanceCardProps> = ({
  title,
  description,
  features
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={features}
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 'dataMax + 0.05']} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Importance']}
                labelFormatter={(name) => `Feature: ${name}`}
              />
              <Bar dataKey="importance" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
