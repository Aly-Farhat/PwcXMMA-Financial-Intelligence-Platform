
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ThumbsUp, AlertTriangle } from "lucide-react";

interface SentimentCardProps {
  sentimentData: {
    positive: number;
    neutral: number;
    negative: number;
  };
  type: string;
}

export const SentimentCard: React.FC<SentimentCardProps> = ({ sentimentData, type }) => {
  const totalSentiment = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
  
  const getSentimentTitle = () => {
    switch(type) {
      case 'fraud':
        return 'Fraud Risk Sentiment';
      case 'aml':
        return 'AML Risk Sentiment';
      case 'cyber':
        return 'Cybersecurity Risk Sentiment';
      default:
        return 'Risk Sentiment';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <AlertCircle className="mr-2 h-5 w-5 text-primary" />
          {getSentimentTitle()}
        </CardTitle>
        <CardDescription>External intelligence confidence</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Positive</span>
            </div>
            <span className="font-medium">{sentimentData.positive}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${sentimentData.positive}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-sm">Neutral</span>
            </div>
            <span className="font-medium">{sentimentData.neutral}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gray-500 h-2.5 rounded-full" 
              style={{ width: `${sentimentData.neutral}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Negative</span>
            </div>
            <span className="font-medium">{sentimentData.negative}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${sentimentData.negative}%` }}
            ></div>
          </div>
          
          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Sentiment</span>
              <span className={`text-sm font-bold ${sentimentData.negative > 50 ? 'text-red-500' : 'text-green-500'}`}>
                {sentimentData.negative > 50 ? 'Negative' : 'Positive'}
                {sentimentData.negative > 75 ? ' (High Alert)' : ''}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
