
import React from "react";

interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

interface ConfusionMatrixCardProps {
  confusionMatrix: ConfusionMatrix;
  useCaseType: 'fraud' | 'aml' | 'cyber';
}

export const ConfusionMatrixCard: React.FC<ConfusionMatrixCardProps> = ({
  confusionMatrix,
  useCaseType
}) => {
  const { tp, fp, fn, tn } = confusionMatrix;
  const total = tp + fp + fn + tn;
  
  // Calculate percentages
  const tpPercent = ((tp / total) * 100).toFixed(1);
  const fpPercent = ((fp / total) * 100).toFixed(1);
  const fnPercent = ((fn / total) * 100).toFixed(1);
  const tnPercent = ((tn / total) * 100).toFixed(1);
  
  // Get appropriate labels based on use case
  const getPositiveLabel = () => {
    switch(useCaseType) {
      case 'fraud':
        return 'Fraudulent';
      case 'aml':
        return 'Money Laundering';
      case 'cyber':
        return 'Attack';
      default:
        return 'Positive';
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-2 gap-px bg-muted rounded-lg overflow-hidden">
        <div className="bg-green-500/20 border border-green-500/30 p-3 flex flex-col items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">True Positive</div>
          <div className="text-xl font-bold">{tp}</div>
          <div className="text-xs mt-1">{tpPercent}%</div>
          <div className="text-[10px] text-muted-foreground mt-1">Correctly identified {getPositiveLabel()}</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 p-3 flex flex-col items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">False Positive</div>
          <div className="text-xl font-bold">{fp}</div>
          <div className="text-xs mt-1">{fpPercent}%</div>
          <div className="text-[10px] text-muted-foreground mt-1">False alarms</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 p-3 flex flex-col items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">False Negative</div>
          <div className="text-xl font-bold">{fn}</div>
          <div className="text-xs mt-1">{fnPercent}%</div>
          <div className="text-[10px] text-muted-foreground mt-1">Missed {getPositiveLabel()}</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 p-3 flex flex-col items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">True Negative</div>
          <div className="text-xl font-bold">{tn}</div>
          <div className="text-xs mt-1">{tnPercent}%</div>
          <div className="text-[10px] text-muted-foreground mt-1">Correctly identified legitimate</div>
        </div>
      </div>
    </div>
  );
};
