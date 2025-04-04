
import React, { useState } from "react";
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  CircleCheck, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  BarChart3
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
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RoiCard } from "@/components/dashboard/RoiCard";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock data for the dashboard
const fraudData = [
  { name: "Jan", value: 85, previous: 72 },
  { name: "Feb", value: 88, previous: 73 },
  { name: "Mar", value: 89, previous: 74 },
  { name: "Apr", value: 90, previous: 76 },
  { name: "May", value: 92, previous: 78 },
  { name: "Jun", value: 93, previous: 80 }
];

const amlData = [
  { name: "Jan", value: 78, previous: 65 },
  { name: "Feb", value: 80, previous: 68 },
  { name: "Mar", value: 84, previous: 70 },
  { name: "Apr", value: 86, previous: 72 },
  { name: "May", value: 89, previous: 74 },
  { name: "Jun", value: 90, previous: 76 }
];

const cyberData = [
  { name: "Jan", value: 82, previous: 70 },
  { name: "Feb", value: 84, previous: 71 },
  { name: "Mar", value: 86, previous: 73 },
  { name: "Apr", value: 88, previous: 75 },
  { name: "May", value: 90, previous: 77 },
  { name: "Jun", value: 91, previous: 79 }
];

const falsePositiveData = [
  { name: "Jan", value: 32, previous: 45 },
  { name: "Feb", value: 30, previous: 43 },
  { name: "Mar", value: 28, previous: 42 },
  { name: "Apr", value: 25, previous: 40 },
  { name: "May", value: 22, previous: 39 },
  { name: "Jun", value: 20, previous: 38 }
];

const operationalEfficiencyData = [
  { name: "Jan", value: 15, previous: 10 },
  { name: "Feb", value: 18, previous: 11 },
  { name: "Mar", value: 22, previous: 12 },
  { name: "Apr", value: 25, previous: 14 },
  { name: "May", value: 28, previous: 15 },
  { name: "Jun", value: 30, previous: 16 }
];

const chartConfig = {
  accuracy: {
    light: "#9b87f5",
    dark: "#7E69AB",
  },
  previous: {
    light: "#d6d3df",
    dark: "#454152",
  },
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("fraud");
  
  // Get the appropriate data based on the active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "fraud":
        return {
          accuracyData: fraudData,
          accuracyImprovement: "+21%",
          falsePositiveReduction: "-53%",
          operationalEfficiency: "+87%",
          roiData: {
            title: "Fraud Detection ROI",
            metrics: [
              { label: "Prevented Fraud Losses", value: "$42.7M" },
              { label: "Investigative Cost Savings", value: "$3.9M" },
              { label: "Customer Experience Impact", value: "+18%" }
            ],
            summary: "AI-driven fraud detection delivers 3.5x ROI through improved accuracy and reduced manual review, positioning PwC as the market leader."
          }
        };
      case "aml":
        return {
          accuracyData: amlData,
          accuracyImprovement: "+18%",
          falsePositiveReduction: "-47%",
          operationalEfficiency: "+65%",
          roiData: {
            title: "AML Compliance ROI",
            metrics: [
              { label: "Regulatory Fine Avoidance", value: "$28.5M" },
              { label: "Resource Optimization", value: "$6.2M" },
              { label: "Compliance Coverage", value: "+35%" }
            ],
            summary: "Real-time entity monitoring provides comprehensive risk coverage while reducing investigation backlog by 47%, dramatically improving compliance posture."
          }
        };
      case "cyber":
        return {
          accuracyData: cyberData,
          accuracyImprovement: "+15%",
          falsePositiveReduction: "-45%",
          operationalEfficiency: "+58%",
          roiData: {
            title: "Cybersecurity ROI",
            metrics: [
              { label: "Threat Detection Speed", value: "-72%" },
              { label: "Potential Breach Savings", value: "$31.4M" },
              { label: "Security Team Efficiency", value: "+41%" }
            ],
            summary: "Proactive threat intelligence integration has reduced incident response time by 72%, preventing an estimated $31.4M in potential breach damages."
          }
        };
      default:
        return {
          accuracyData: fraudData,
          accuracyImprovement: "+21%",
          falsePositiveReduction: "-53%",
          operationalEfficiency: "+87%",
          roiData: {
            title: "Fraud Detection ROI",
            metrics: [
              { label: "Prevented Fraud Losses", value: "$42.7M" },
              { label: "Investigative Cost Savings", value: "$3.9M" },
              { label: "Customer Experience Impact", value: "+18%" }
            ],
            summary: "AI-driven fraud detection delivers 3.5x ROI through improved accuracy and reduced manual review, positioning PwC as the market leader."
          }
        };
    }
  };

  const activeData = getActiveData();

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Financial Crime Intelligence Platform" 
        subtitle="Executive Overview"
      />
      
      <div className="mb-6">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KpiCard 
          title="Detection Accuracy" 
          value={activeData.accuracyImprovement}
          icon={<CircleCheck />}
          trend="up"
          description="Increase in overall detection accuracy"
        />
        <KpiCard 
          title="False Positive Reduction" 
          value={activeData.falsePositiveReduction}
          icon={<TrendingDown />}
          trend="down"
          description="Decrease in false positive alerts"
        />
        <KpiCard 
          title="Operational Efficiency" 
          value={activeData.operationalEfficiency}
          icon={<TrendingUp />}
          trend="up"
          description="Improvement in workflow efficiency"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Detection Accuracy Trends</CardTitle>
            <CardDescription>Comparison with previous systems</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData.accuracyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Line 
                    name="AI Platform" 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-accuracy)" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    name="Previous System" 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="var(--color-previous)" 
                    strokeWidth={2}
                    strokeDasharray="4 4" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Impact</CardTitle>
            <CardDescription>Key performance indicators for business operations</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={operationalEfficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar name="Process Efficiency (%)" dataKey="value" fill="var(--color-accuracy)" />
                  <Bar name="Industry Benchmark (%)" dataKey="previous" fill="var(--color-previous)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <RoiCard 
          title={activeData.roiData.title}
          metrics={activeData.roiData.metrics}
          summary={activeData.roiData.summary}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2">
          Download Report
        </Button>
        <Button>
          View Detailed Analysis
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
