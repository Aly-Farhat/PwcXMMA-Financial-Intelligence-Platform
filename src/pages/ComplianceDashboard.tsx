
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
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  ChevronRight, 
  ShieldCheck, 
  DollarSign, 
  AlertTriangle, 
  FileSearch,
  UserCheck,
  Building2,
  Scale,
  AlertCircle
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskScoreCard } from "@/components/compliance/RiskScoreCard";
import { SentimentCard } from "@/components/compliance/SentimentCard";
import { FlaggedEntitiesCard } from "@/components/compliance/FlaggedEntitiesCard";
import { RegulatorySummary } from "@/components/compliance/RegulatorySummary";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock data for the dashboard
const riskScoreData = {
  fraud: {
    individuals: [
      { name: "Low Risk", value: 220, color: "#4ade80" },
      { name: "Medium Risk", value: 80, color: "#facc15" },
      { name: "High Risk", value: 35, color: "#f87171" }
    ],
    companies: [
      { name: "Low Risk", value: 180, color: "#4ade80" },
      { name: "Medium Risk", value: 120, color: "#facc15" },
      { name: "High Risk", value: 45, color: "#f87171" }
    ],
    trendData: [
      { month: "Jan", individuals: 28, companies: 32 },
      { month: "Feb", individuals: 30, companies: 35 },
      { month: "Mar", individuals: 32, companies: 30 },
      { month: "Apr", individuals: 35, companies: 28 },
      { month: "May", individuals: 30, companies: 25 },
      { month: "Jun", individuals: 28, companies: 20 }
    ]
  },
  aml: {
    individuals: [
      { name: "Low Risk", value: 180, color: "#4ade80" },
      { name: "Medium Risk", value: 120, color: "#facc15" },
      { name: "High Risk", value: 50, color: "#f87171" }
    ],
    companies: [
      { name: "Low Risk", value: 150, color: "#4ade80" },
      { name: "Medium Risk", value: 140, color: "#facc15" },
      { name: "High Risk", value: 60, color: "#f87171" }
    ],
    trendData: [
      { month: "Jan", individuals: 35, companies: 40 },
      { month: "Feb", individuals: 38, companies: 42 },
      { month: "Mar", individuals: 40, companies: 38 },
      { month: "Apr", individuals: 42, companies: 35 },
      { month: "May", individuals: 38, companies: 32 },
      { month: "Jun", individuals: 35, companies: 28 }
    ]
  },
  cyber: {
    individuals: [
      { name: "Low Risk", value: 250, color: "#4ade80" },
      { name: "Medium Risk", value: 70, color: "#facc15" },
      { name: "High Risk", value: 30, color: "#f87171" }
    ],
    companies: [
      { name: "Low Risk", value: 200, color: "#4ade80" },
      { name: "Medium Risk", value: 90, color: "#facc15" },
      { name: "High Risk", value: 40, color: "#f87171" }
    ],
    trendData: [
      { month: "Jan", individuals: 22, companies: 28 },
      { month: "Feb", individuals: 25, companies: 30 },
      { month: "Mar", individuals: 28, companies: 26 },
      { month: "Apr", individuals: 30, companies: 24 },
      { month: "May", individuals: 28, companies: 22 },
      { month: "Jun", individuals: 26, companies: 20 }
    ]
  }
};

const flaggedEntities = {
  fraud: [
    { id: "F-2025-134", name: "Acme Corp", type: "Company", risk: "High", confidence: 92, sentiment: "Negative", sanctions: true },
    { id: "F-2025-128", name: "John Smith", type: "Individual", risk: "High", confidence: 88, sentiment: "Negative", sanctions: false },
    { id: "F-2025-119", name: "Global Trading Ltd", type: "Company", risk: "Medium", confidence: 76, sentiment: "Neutral", sanctions: false },
    { id: "F-2025-112", name: "Sarah Johnson", type: "Individual", risk: "Medium", confidence: 72, sentiment: "Negative", sanctions: false },
    { id: "F-2025-109", name: "Tech Innovations Inc", type: "Company", risk: "High", confidence: 85, sentiment: "Negative", sanctions: true }
  ],
  aml: [
    { id: "A-2025-098", name: "Offshore Holdings", type: "Company", risk: "High", confidence: 95, sentiment: "Negative", sanctions: true },
    { id: "A-2025-092", name: "Michael Chang", type: "Individual", risk: "High", confidence: 89, sentiment: "Negative", sanctions: false },
    { id: "A-2025-087", name: "International Finance Corp", type: "Company", risk: "Medium", confidence: 78, sentiment: "Neutral", sanctions: false },
    { id: "A-2025-079", name: "Robert Williams", type: "Individual", risk: "High", confidence: 91, sentiment: "Negative", sanctions: true },
    { id: "A-2025-072", name: "Eastern Trade LLC", type: "Company", risk: "Medium", confidence: 75, sentiment: "Neutral", sanctions: false }
  ],
  cyber: [
    { id: "C-2025-065", name: "Data Systems Inc", type: "Company", risk: "High", confidence: 94, sentiment: "Negative", sanctions: false },
    { id: "C-2025-061", name: "Alex Rodriguez", type: "Individual", risk: "Medium", confidence: 79, sentiment: "Neutral", sanctions: false },
    { id: "C-2025-058", name: "SecurityNet Solutions", type: "Company", risk: "High", confidence: 93, sentiment: "Negative", sanctions: true },
    { id: "C-2025-052", name: "James Wilson", type: "Individual", risk: "Medium", confidence: 81, sentiment: "Negative", sanctions: false },
    { id: "C-2025-047", name: "Network Systems Ltd", type: "Company", risk: "High", confidence: 87, sentiment: "Negative", sanctions: false }
  ]
};

const chartConfig = {
  individuals: {
    label: "Individuals",
    theme: {
      light: "#9b87f5",
      dark: "#7E69AB",
    }
  },
  companies: {
    label: "Companies",
    theme: {
      light: "#d6d3df",
      dark: "#454152",
    }
  },
};

const ComplianceDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("fraud");
  
  // Get the appropriate data based on the active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "fraud":
        return {
          riskScores: riskScoreData.fraud,
          flaggedEntities: flaggedEntities.fraud,
          regulatoryImplications: "Enhanced monitoring required for high-risk entities with confirmation from secondary data sources. Potential FATF reporting obligations triggered.",
          sentimentScores: {
            positive: 15,
            neutral: 25,
            negative: 60
          }
        };
      case "aml":
        return {
          riskScores: riskScoreData.aml,
          flaggedEntities: flaggedEntities.aml,
          regulatoryImplications: "Suspicious Activity Reports required for entities matching watchlists. Additional KYC verification needed for high-risk businesses.",
          sentimentScores: {
            positive: 10,
            neutral: 30,
            negative: 60
          }
        };
      case "cyber":
        return {
          riskScores: riskScoreData.cyber,
          flaggedEntities: flaggedEntities.cyber,
          regulatoryImplications: "Data breach disclosure requirements under GDPR for affected parties. Security incident reports need to be filed with sector regulators.",
          sentimentScores: {
            positive: 20,
            neutral: 35,
            negative: 45
          }
        };
      default:
        return {
          riskScores: riskScoreData.fraud,
          flaggedEntities: flaggedEntities.fraud,
          regulatoryImplications: "Enhanced monitoring required for high-risk entities with confirmation from secondary data sources. Potential FATF reporting obligations triggered.",
          sentimentScores: {
            positive: 15,
            neutral: 25,
            negative: 60
          }
        };
    }
  };

  const activeData = getActiveData();

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Risk & Compliance Intelligence Center" 
        subtitle="Entity Risk Assessment & Regulatory Monitoring"
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
            Cybersecurity
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RiskScoreCard 
          individuals={activeData.riskScores.individuals}
          companies={activeData.riskScores.companies}
          title={`${activeTab.toUpperCase()} Risk Distribution`}
        />
        <Card>
          <CardHeader>
            <CardTitle>Risk Score Trends</CardTitle>
            <CardDescription>6-month trend of high-risk entities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData.riskScores.trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    name="Individuals" 
                    type="monotone" 
                    dataKey="individuals" 
                    stroke="var(--color-individuals)" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    name="Companies" 
                    type="monotone" 
                    dataKey="companies" 
                    stroke="var(--color-companies)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SentimentCard 
          sentimentData={activeData.sentimentScores}
          type={activeTab}
        />
        <FlaggedEntitiesCard 
          entities={activeData.flaggedEntities}
          type={activeTab}
        />
        <RegulatorySummary 
          implications={activeData.regulatoryImplications}
          type={activeTab}
        />
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Flagged Entities Requiring Review</CardTitle>
              <CardDescription>High-confidence matches requiring compliance review</CardDescription>
            </div>
            <Badge className="bg-red-500">
              {activeData.flaggedEntities.filter(e => e.risk === "High").length} High Risk
            </Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Sanctions Match</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeData.flaggedEntities.map((entity) => (
                  <TableRow key={entity.id}>
                    <TableCell className="font-medium">{entity.id}</TableCell>
                    <TableCell>{entity.name}</TableCell>
                    <TableCell>{entity.type}</TableCell>
                    <TableCell>
                      <Badge className={`${entity.risk === "High" ? "bg-red-500" : "bg-yellow-500"}`}>
                        {entity.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>{entity.confidence}%</TableCell>
                    <TableCell>
                      {entity.sanctions ? 
                        <Badge className="bg-red-500">Yes</Badge> : 
                        <Badge variant="outline">No</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileSearch className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <Scale className="h-4 w-4 mr-1" />
                          Case File
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {activeData.flaggedEntities.length} entities requiring review
            </div>
            <Button>
              Export for Audit Trail
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComplianceDashboard;
