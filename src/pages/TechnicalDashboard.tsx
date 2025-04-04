
import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";

import { 
  Brain, 
  Cpu, 
  LineChart as LineChartIcon, 
  Network,
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  ToggleLeft,
  Activity,
  Link2,
  ShieldCheck,
  DollarSign,
  AlertTriangle
} from "lucide-react";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ModelPerformanceCard } from "@/components/technical/ModelPerformanceCard";
import { ModelMetricsCard } from "@/components/technical/ModelMetricsCard";
import { ConfusionMatrixCard } from "@/components/technical/ConfusionMatrixCard";
import { FeatureImportanceCard } from "@/components/technical/FeatureImportanceCard";
import { GraphVisualizationCard } from "@/components/technical/GraphVisualizationCard";

// Performance data for different use cases
const modelPerformanceData = {
  fraud: [
    { month: "Jan", auc: 0.92, precision: 0.88, recall: 0.84, f1: 0.86 },
    { month: "Feb", auc: 0.93, precision: 0.89, recall: 0.85, f1: 0.87 },
    { month: "Mar", auc: 0.94, precision: 0.90, recall: 0.86, f1: 0.88 },
    { month: "Apr", auc: 0.94, precision: 0.91, recall: 0.85, f1: 0.88 },
    { month: "May", auc: 0.95, precision: 0.92, recall: 0.87, f1: 0.89 },
    { month: "Jun", auc: 0.96, precision: 0.93, recall: 0.88, f1: 0.90 },
  ],
  aml: [
    { month: "Jan", auc: 0.89, precision: 0.85, recall: 0.82, f1: 0.83 },
    { month: "Feb", auc: 0.90, precision: 0.86, recall: 0.83, f1: 0.84 },
    { month: "Mar", auc: 0.91, precision: 0.86, recall: 0.84, f1: 0.85 },
    { month: "Apr", auc: 0.92, precision: 0.87, recall: 0.84, f1: 0.85 },
    { month: "May", auc: 0.93, precision: 0.88, recall: 0.85, f1: 0.86 },
    { month: "Jun", auc: 0.93, precision: 0.89, recall: 0.86, f1: 0.87 },
  ],
  cyber: [
    { month: "Jan", auc: 0.87, precision: 0.83, recall: 0.79, f1: 0.81 },
    { month: "Feb", auc: 0.88, precision: 0.84, recall: 0.80, f1: 0.82 },
    { month: "Mar", auc: 0.89, precision: 0.85, recall: 0.81, f1: 0.83 },
    { month: "Apr", auc: 0.90, precision: 0.86, recall: 0.82, f1: 0.84 },
    { month: "May", auc: 0.91, precision: 0.87, recall: 0.83, f1: 0.85 },
    { month: "Jun", auc: 0.92, precision: 0.88, recall: 0.84, f1: 0.86 },
  ]
};

const nodeCategoriesData = {
  fraud: [
    { name: "High Risk", value: 128 },
    { name: "Medium Risk", value: 356 },
    { name: "Low Risk", value: 814 },
    { name: "Normal", value: 4320 },
  ],
  aml: [
    { name: "High Risk", value: 95 },
    { name: "Medium Risk", value: 287 },
    { name: "Low Risk", value: 742 },
    { name: "Normal", value: 3980 },
  ],
  cyber: [
    { name: "High Risk", value: 162 },
    { name: "Medium Risk", value: 421 },
    { name: "Low Risk", value: 683 },
    { name: "Normal", value: 3560 },
  ]
};

const featureImportanceData = {
  fraud: [
    { feature: "Transaction Frequency", importance: 0.28 },
    { feature: "Amount Deviation", importance: 0.22 },
    { feature: "Network Centrality", importance: 0.18 },
    { feature: "Time Pattern", importance: 0.15 },
    { feature: "Geographic Dispersion", importance: 0.12 },
    { feature: "Account Age", importance: 0.05 },
  ],
  aml: [
    { feature: "Transaction Volume", importance: 0.25 },
    { feature: "Cross-border Flow", importance: 0.23 },
    { feature: "Entity Connections", importance: 0.20 },
    { feature: "Sanctioned Countries", importance: 0.15 },
    { feature: "Shell Company Similarity", importance: 0.12 },
    { feature: "Account Structure", importance: 0.05 },
  ],
  cyber: [
    { feature: "Access Pattern", importance: 0.30 },
    { feature: "Login Anomalies", importance: 0.25 },
    { feature: "Data Exfiltration", importance: 0.20 },
    { feature: "System Permissions", importance: 0.12 },
    { feature: "API Usage", importance: 0.08 },
    { feature: "Location Variance", importance: 0.05 },
  ]
};

const linkPredictionData = {
  fraud: [
    { source: "Entity A", target: "Entity B", probability: 0.92, distance: 2 },
    { source: "Entity C", target: "Entity D", probability: 0.87, distance: 3 },
    { source: "Entity E", target: "Entity F", probability: 0.76, distance: 1 },
    { source: "Entity G", target: "Entity H", probability: 0.68, distance: 4 },
  ],
  aml: [
    { source: "Entity J", target: "Entity K", probability: 0.89, distance: 2 },
    { source: "Entity L", target: "Entity M", probability: 0.85, distance: 3 },
    { source: "Entity N", target: "Entity O", probability: 0.73, distance: 1 },
    { source: "Entity P", target: "Entity Q", probability: 0.65, distance: 4 },
  ],
  cyber: [
    { source: "Entity R", target: "Entity S", probability: 0.90, distance: 1 },
    { source: "Entity T", target: "Entity U", probability: 0.82, distance: 2 },
    { source: "Entity V", target: "Entity W", probability: 0.78, distance: 3 },
    { source: "Entity X", target: "Entity Y", probability: 0.71, distance: 2 },
  ]
};

const radarData = {
  fraud: [
    { subject: "Precision", A: 0.93, fullMark: 1 },
    { subject: "Recall", A: 0.88, fullMark: 1 },
    { subject: "F1 Score", A: 0.90, fullMark: 1 },
    { subject: "AUC", A: 0.96, fullMark: 1 },
    { subject: "Accuracy", A: 0.94, fullMark: 1 },
  ],
  aml: [
    { subject: "Precision", A: 0.89, fullMark: 1 },
    { subject: "Recall", A: 0.86, fullMark: 1 },
    { subject: "F1 Score", A: 0.87, fullMark: 1 },
    { subject: "AUC", A: 0.93, fullMark: 1 },
    { subject: "Accuracy", A: 0.91, fullMark: 1 },
  ],
  cyber: [
    { subject: "Precision", A: 0.88, fullMark: 1 },
    { subject: "Recall", A: 0.84, fullMark: 1 },
    { subject: "F1 Score", A: 0.86, fullMark: 1 },
    { subject: "AUC", A: 0.92, fullMark: 1 },
    { subject: "Accuracy", A: 0.90, fullMark: 1 },
  ]
};

const confusionMatrixData = {
  fraud: { tp: 872, fp: 68, fn: 119, tn: 3941 },
  aml: { tp: 765, fp: 95, fn: 124, tn: 3861 },
  cyber: { tp: 913, fp: 125, fn: 174, tn: 3614 }
};

// Chart configuration
const chartConfig = {
  auc: {
    label: "AUC Score",
    theme: {
      light: "#9b87f5",
      dark: "#7E69AB",
    }
  },
  precision: {
    label: "Precision",
    theme: {
      light: "#68d391",
      dark: "#2f855a",
    }
  },
  recall: {
    label: "Recall",
    theme: {
      light: "#f6ad55",
      dark: "#c05621",
    }
  },
  f1: {
    label: "F1 Score",
    theme: {
      light: "#4299e1",
      dark: "#2b6cb0", 
    }
  }
};

const TechnicalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("fraud");
  const [showExplainability, setShowExplainability] = useState(true);
  const [validationSet, setValidationSet] = useState("test");
  
  const currentPerformanceData = modelPerformanceData[activeTab as keyof typeof modelPerformanceData];
  const currentNodeCategoriesData = nodeCategoriesData[activeTab as keyof typeof nodeCategoriesData];
  const currentFeatureImportanceData = featureImportanceData[activeTab as keyof typeof featureImportanceData];
  const currentLinkPredictionData = linkPredictionData[activeTab as keyof typeof linkPredictionData];
  const currentRadarData = radarData[activeTab as keyof typeof radarData];
  const currentConfusionMatrix = confusionMatrixData[activeTab as keyof typeof confusionMatrixData];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Financial Crime AI Platform" 
        subtitle="Technical Performance & Model Explainability Dashboard"
      />
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <ToggleGroup type="single" value={activeTab} onValueChange={(value) => value && setActiveTab(value)}>
            <ToggleGroupItem value="fraud" aria-label="Toggle fraud view">
              <ShieldCheck className="mr-2" />
              Fraud
            </ToggleGroupItem>
            <ToggleGroupItem value="aml" aria-label="Toggle AML view">
              <DollarSign className="mr-2" />
              AML
            </ToggleGroupItem>
            <ToggleGroupItem value="cyber" aria-label="Toggle cyberattack view">
              <AlertTriangle className="mr-2" />
              Cyberattacks
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="explainability" checked={showExplainability} onCheckedChange={setShowExplainability} />
              <label htmlFor="explainability" className="text-sm font-medium">
                Model Explainability
              </label>
            </div>
            
            <RadioGroup value={validationSet} onValueChange={setValidationSet} className="flex gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="test" id="test-set" />
                <label htmlFor="test-set" className="text-sm font-medium">Test Set</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="validation" id="validation-set" />
                <label htmlFor="validation-set" className="text-sm font-medium">Validation Set</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ModelPerformanceCard 
          title="AUC" 
          value={currentPerformanceData[currentPerformanceData.length - 1].auc.toFixed(2)} 
          trend={currentPerformanceData[currentPerformanceData.length - 1].auc > currentPerformanceData[currentPerformanceData.length - 2].auc ? "up" : "down"}
          change={Math.abs(
            (currentPerformanceData[currentPerformanceData.length - 1].auc - currentPerformanceData[currentPerformanceData.length - 2].auc) / 
            currentPerformanceData[currentPerformanceData.length - 2].auc * 100
          ).toFixed(1) + "%"}
          icon={<LineChartIcon className="h-4 w-4 text-primary" />} 
        />
        <ModelPerformanceCard 
          title="Precision" 
          value={currentPerformanceData[currentPerformanceData.length - 1].precision.toFixed(2)} 
          trend={currentPerformanceData[currentPerformanceData.length - 1].precision > currentPerformanceData[currentPerformanceData.length - 2].precision ? "up" : "down"}
          change={Math.abs(
            (currentPerformanceData[currentPerformanceData.length - 1].precision - currentPerformanceData[currentPerformanceData.length - 2].precision) / 
            currentPerformanceData[currentPerformanceData.length - 2].precision * 100
          ).toFixed(1) + "%"}
          icon={<BarChart3 className="h-4 w-4 text-primary" />} 
        />
        <ModelPerformanceCard 
          title="Recall" 
          value={currentPerformanceData[currentPerformanceData.length - 1].recall.toFixed(2)} 
          trend={currentPerformanceData[currentPerformanceData.length - 1].recall > currentPerformanceData[currentPerformanceData.length - 2].recall ? "up" : "down"}
          change={Math.abs(
            (currentPerformanceData[currentPerformanceData.length - 1].recall - currentPerformanceData[currentPerformanceData.length - 2].recall) / 
            currentPerformanceData[currentPerformanceData.length - 2].recall * 100
          ).toFixed(1) + "%"}
          icon={<Activity className="h-4 w-4 text-primary" />} 
        />
        <ModelPerformanceCard 
          title="F1 Score" 
          value={currentPerformanceData[currentPerformanceData.length - 1].f1.toFixed(2)} 
          trend={currentPerformanceData[currentPerformanceData.length - 1].f1 > currentPerformanceData[currentPerformanceData.length - 2].f1 ? "up" : "down"}
          change={Math.abs(
            (currentPerformanceData[currentPerformanceData.length - 1].f1 - currentPerformanceData[currentPerformanceData.length - 2].f1) / 
            currentPerformanceData[currentPerformanceData.length - 2].f1 * 100
          ).toFixed(1) + "%"}
          icon={<Brain className="h-4 w-4 text-primary" />} 
        />
      </div>
      
      {/* Primary Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Metrics Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Performance Metrics Over Time</CardTitle>
              <CardDescription>Model improvement trajectory on {validationSet} set</CardDescription>
            </div>
            <Badge variant="outline" className="font-mono">
              {activeTab.toUpperCase()} Model
            </Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentPerformanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0.7, 1]} />
                  <ChartTooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="auc" 
                    stroke="var(--color-auc)" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="AUC Score" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="precision" 
                    stroke="var(--color-precision)" 
                    strokeWidth={2}
                    name="Precision" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="recall" 
                    stroke="var(--color-recall)" 
                    strokeWidth={2}
                    name="Recall" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="f1" 
                    stroke="var(--color-f1)" 
                    strokeWidth={2}
                    name="F1 Score" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Monthly model evaluation with gradual performance improvements. All metrics on {activeTab.toUpperCase()} use case have shown positive trends.
            </div>
          </CardFooter>
        </Card>
        
        {/* Radar Chart for overall metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-primary" />
              Model Performance Radar
            </CardTitle>
            <CardDescription>Current {activeTab.toUpperCase()} model metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={currentRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#9b87f5"
                    fill="#9b87f5"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Explainability Section - conditionally rendered */}
      {showExplainability && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Feature Importance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Layers className="mr-2 h-5 w-5 text-primary" />
              Feature Importance
            </CardTitle>
            <CardDescription>Key model features ranked by impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={currentFeatureImportanceData}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.35]} />
                  <YAxis dataKey="feature" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Confusion Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Confusion Matrix
            </CardTitle>
            <CardDescription>Classification performance breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ConfusionMatrixCard 
              confusionMatrix={currentConfusionMatrix} 
              useCaseType={activeTab as 'fraud' | 'aml' | 'cyber'} 
            />
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground w-full">
              <div className="flex justify-between mb-1">
                <span>Accuracy: {((currentConfusionMatrix.tp + currentConfusionMatrix.tn) / 
                  (currentConfusionMatrix.tp + currentConfusionMatrix.tn + currentConfusionMatrix.fp + currentConfusionMatrix.fn)).toFixed(4)}</span>
                <span>Error Rate: {((currentConfusionMatrix.fp + currentConfusionMatrix.fn) / 
                  (currentConfusionMatrix.tp + currentConfusionMatrix.tn + currentConfusionMatrix.fp + currentConfusionMatrix.fn)).toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span>Specificity: {(currentConfusionMatrix.tn / (currentConfusionMatrix.tn + currentConfusionMatrix.fp)).toFixed(4)}</span>
                <span>Balanced Acc: {((currentConfusionMatrix.tp / (currentConfusionMatrix.tp + currentConfusionMatrix.fn) +
                  currentConfusionMatrix.tn / (currentConfusionMatrix.tn + currentConfusionMatrix.fp)) / 2).toFixed(4)}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Node Classification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Network className="mr-2 h-5 w-5 text-primary" />
              Node Classification
            </CardTitle>
            <CardDescription>Entity risk distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentNodeCategoriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#9b87f5">
                    {currentNodeCategoriesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "#ef4444" : index === 1 ? "#f97316" : index === 2 ? "#facc15" : "#68d391"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      )}
      
      {/* Graph Visualization and Link Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Graph Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Network className="mr-2 h-5 w-5 text-primary" />
              GNN Graph Visualization
            </CardTitle>
            <CardDescription>Interactive network exploration</CardDescription>
          </CardHeader>
          <CardContent>
            <GraphVisualizationCard useCaseType={activeTab as 'fraud' | 'aml' | 'cyber'} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Graph with 10k+ nodes and 30k+ edges</div>
            <Button variant="outline" size="sm">
              Expand View
            </Button>
          </CardFooter>
        </Card>
        
        {/* Link Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Link2 className="mr-2 h-5 w-5 text-primary" />
              Link Prediction Insights
            </CardTitle>
            <CardDescription>Predicted entity connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b">
                    <th className="text-left p-2">Source</th>
                    <th className="text-left p-2">Target</th>
                    <th className="text-left p-2">Probability</th>
                    <th className="text-left p-2">Path Distance</th>
                    <th className="text-left p-2">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLinkPredictionData.map((link, index) => (
                    <tr key={index} className="border-b border-muted">
                      <td className="p-2">{link.source}</td>
                      <td className="p-2">{link.target}</td>
                      <td className="p-2 font-mono">{link.probability.toFixed(2)}</td>
                      <td className="p-2">{link.distance}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${link.probability * 100}%` }}
                            />
                          </div>
                          <span className="text-xs w-10">{(link.probability * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col">
              <div className="text-sm font-medium">LLaMA-Powered Sentiment Enrichment</div>
              <div className="text-xs text-muted-foreground mt-1">
                Link predictions are enriched with LLaMA-derived sentiment scores from millions of external data sources
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Real-time Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Activity className="mr-2 h-5 w-5 text-primary" />
            Real-time Model Monitoring
          </CardTitle>
          <CardDescription>Performance and drift detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="font-medium">Model Latency</div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { time: '10:00', value: 52 },
                      { time: '11:00', value: 57 },
                      { time: '12:00', value: 42 },
                      { time: '13:00', value: 47 },
                      { time: '14:00', value: 45 },
                      { time: '15:00', value: 53 },
                      { time: '16:00', value: 48 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#9b87f5" fillOpacity={1} fill="url(#colorLatency)" name="ms" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-muted-foreground">Average: 48ms</div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Prediction Distribution</div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { score: '0.1', value: 138 },
                      { score: '0.2', value: 431 },
                      { score: '0.3', value: 975 },
                      { score: '0.4', value: 1270 },
                      { score: '0.5', value: 856 },
                      { score: '0.6', value: 421 },
                      { score: '0.7', value: 215 },
                      { score: '0.8', value: 98 },
                      { score: '0.9', value: 42 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorPredDist" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#68d391" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#68d391" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="score" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#68d391" fillOpacity={1} fill="url(#colorPredDist)" name="Count" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-muted-foreground">Distribution stable with slight right skew</div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Concept Drift</div>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: '1', kl: 0.08 },
                      { day: '2', kl: 0.07 },
                      { day: '3', kl: 0.09 },
                      { day: '4', kl: 0.11 },
                      { day: '5', kl: 0.10 },
                      { day: '6', kl: 0.14 },
                      { day: '7', kl: 0.18 },
                    ]}
                  >
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 0.5]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="kl" stroke="#ef4444" strokeWidth={2} name="KL Divergence" dot={{ r: 3 }} />
                    <ReferenceLine y={0.15} stroke="#ef4444" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-muted-foreground text-red-500 font-medium">Alert: Approaching drift threshold</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="mr-2">
            View Detailed Logs
          </Button>
          <Button variant="outline" size="sm" className="mr-2">
            Trigger Retraining
          </Button>
          <Button>
            Download Performance Report
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2">
          Model Documentation
        </Button>
        <Button>
          Schedule Model Review
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default TechnicalDashboard;
