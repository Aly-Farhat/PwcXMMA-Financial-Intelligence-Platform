
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserCheck, Building2 } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  type: string;
  risk: string;
  confidence: number;
  sentiment: string;
  sanctions: boolean;
}

interface FlaggedEntitiesCardProps {
  entities: Entity[];
  type: string;
}

export const FlaggedEntitiesCard: React.FC<FlaggedEntitiesCardProps> = ({ entities, type }) => {
  const highRiskEntities = entities.filter(e => e.risk === "High");
  
  // Count entities by type
  const individualCount = entities.filter(e => e.type === "Individual").length;
  const companyCount = entities.filter(e => e.type === "Company").length;
  
  // Count sanctions matches
  const sanctionsCount = entities.filter(e => e.sanctions).length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
          Flagged Entities
        </CardTitle>
        <CardDescription>High-confidence risk signals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <UserCheck className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">Individuals</span>
            </div>
            <div className="text-2xl font-bold">{individualCount}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Building2 className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">Companies</span>
            </div>
            <div className="text-2xl font-bold">{companyCount}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 bg-red-100 dark:bg-red-900/20 rounded">
            <span className="font-medium">High Risk</span>
            <Badge className="bg-red-500">{highRiskEntities.length}</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Average Confidence</span>
            <span className="font-medium">
              {Math.round(entities.reduce((acc, e) => acc + e.confidence, 0) / entities.length)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Sanctions Matches</span>
            <Badge variant={sanctionsCount > 0 ? "default" : "outline"} className={sanctionsCount > 0 ? "bg-red-500" : ""}>
              {sanctionsCount}
            </Badge>
          </div>
          
          <div className="pt-3 border-t mt-3">
            <div className="font-medium mb-2">Top Entity:</div>
            {highRiskEntities.length > 0 && (
              <div className="bg-muted p-2 rounded text-sm">
                <div className="font-medium">{highRiskEntities[0].name}</div>
                <div className="flex justify-between mt-1">
                  <span>{highRiskEntities[0].type}</span>
                  <span className="text-red-500 font-medium">{highRiskEntities[0].confidence}% confidence</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
