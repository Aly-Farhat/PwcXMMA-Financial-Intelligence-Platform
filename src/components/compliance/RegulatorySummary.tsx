
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RegulatorySummaryProps {
  implications: string;
  type: string;
}

export const RegulatorySummary: React.FC<RegulatorySummaryProps> = ({ implications, type }) => {
  const getRegulationsForType = () => {
    switch(type) {
      case 'fraud':
        return [
          "Anti-Fraud Policies", 
          "Internal Controls", 
          "FATF Guidelines"
        ];
      case 'aml':
        return [
          "BSA/AML", 
          "KYC Verification", 
          "FATF/OFAC Screening"
        ];
      case 'cyber':
        return [
          "GDPR", 
          "NIST Framework", 
          "ISO 27001"
        ];
      default:
        return ["Regulatory Guidelines"];
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Scale className="mr-2 h-5 w-5 text-primary" />
          Regulatory Implications
        </CardTitle>
        <CardDescription>Compliance requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="font-medium mb-2">Applicable Regulations:</div>
            <div className="flex flex-wrap gap-2">
              {getRegulationsForType().map((reg, idx) => (
                <Badge key={idx} variant="outline" className="bg-primary/10">
                  {reg}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <div className="font-medium mb-2">Actions Required:</div>
            <div className="text-sm bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded">
              <AlertCircle className="h-4 w-4 inline-block mr-1 text-yellow-600" />
              {implications}
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Audit Trail Status</span>
              <Badge className="bg-green-500">Complete</Badge>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">Documentation</span>
              <Badge variant="outline">Available</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
