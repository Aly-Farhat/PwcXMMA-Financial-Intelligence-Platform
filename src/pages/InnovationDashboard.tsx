
import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  ChevronRight, 
  CircleDot, 
  Code2, 
  Layers, 
  Network, 
  Puzzle,
  SquareCode,
  Lightbulb,
  Cpu,
  BarChart3,
  DollarSign,
  Rocket,
  ToggleLeft,
  ShieldCheck,
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
import { SentimentCard } from "@/components/compliance/SentimentCard";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const moduleUsageData = [
  { name: "Jan", core: 65, custom: 25, partner: 10 },
  { name: "Feb", core: 68, custom: 22, partner: 10 },
  { name: "Mar", core: 70, custom: 20, partner: 10 },
  { name: "Apr", core: 65, custom: 25, partner: 10 },
  { name: "May", core: 60, custom: 28, partner: 12 },
  { name: "Jun", core: 58, custom: 30, partner: 12 }
];

const revenueModelData = [
  { name: "License", value: 40 },
  { name: "SaaS", value: 35 },
  { name: "API Usage", value: 15 },
  { name: "Consulting", value: 10 }
];

const apiCallsData = [
  { name: "Jan", value: 12500 },
  { name: "Feb", value: 14200 },
  { name: "Mar", value: 15800 },
  { name: "Apr", value: 18500 },
  { name: "May", value: 21000 },
  { name: "Jun", value: 24500 }
];

const whitelabelThemeOptions = [
  { name: "Standard", color: "#9b87f5", usage: 40 },
  { name: "Enterprise", color: "#68d391", usage: 25 },
  { name: "Financial", color: "#f6ad55", usage: 20 },
  { name: "Government", color: "#4299e1", usage: 15 }
];

const networkComplexityData = [
  { name: "Fraud", entities: 85, connections: 140, depth: 5 },
  { name: "AML", entities: 120, connections: 210, depth: 4 },
  { name: "Cyber", entities: 65, connections: 95, depth: 3 }
];

const COLORS = ["#9b87f5", "#68d391", "#f6ad55", "#4299e1"];

const chartConfig = {
  core: {
    label: "Core Modules",
    theme: {
      light: "#9b87f5",
      dark: "#7E69AB",
    }
  },
  custom: {
    label: "Custom Features",
    theme: {
      light: "#68d391",
      dark: "#2f855a",
    }
  },
  partner: {
    label: "Partner Integrations",
    theme: {
      light: "#f6ad55",
      dark: "#c05621",
    }
  },
  api: {
    label: "API Calls",
    theme: {
      light: "#4299e1",
      dark: "#2b6cb0", 
    }
  }
};

const InnovationDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("fraud");
  
  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Financial Crime Intelligence Platform" 
        subtitle="Innovation & Product Development Insights"
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Puzzle className="mr-2 h-5 w-5 text-primary" />
              Modular Architecture
            </CardTitle>
            <CardDescription>Component usage by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="h-[250px] w-full" 
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={moduleUsageData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }} 
                    padding={{ left: 10, right: 10 }} 
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }} 
                    domain={[0, 100]} 
                    padding={{ top: 10, bottom: 10 }} 
                  />
                  <ChartTooltip />
                  <Legend 
                    wrapperStyle={{ fontSize: 10, paddingTop: 10 }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="core" 
                    stackId="1"
                    stroke="var(--color-core)" 
                    fill="var(--color-core)" 
                    name="Core Modules" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="custom" 
                    stackId="1"
                    stroke="var(--color-custom)" 
                    fill="var(--color-custom)" 
                    name="Custom Features" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="partner" 
                    stackId="1"
                    stroke="var(--color-partner)" 
                    fill="var(--color-partner)" 
                    name="Partner Integrations" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="font-medium">Key Insights:</div>
            <ul className="mt-2 text-sm space-y-1">
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>Highly extensible architecture</span>
              </li>
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>30% custom feature expansion</span>
              </li>
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>API-first design philosophy</span>
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Network className="mr-2 h-5 w-5 text-primary" />
              GNN Network Capabilities
            </CardTitle>
            <CardDescription>Graph intelligence metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {networkComplexityData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="font-mono">
                      {item.entities} entities
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Complexity Score</span>
                      <span>{(item.connections / item.entities).toFixed(1)}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded">
                      <div 
                        className="h-2 bg-primary rounded" 
                        style={{ 
                          width: `${(item.connections / item.entities / 2) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Network Depth</span>
                      <span>Level {item.depth}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded">
                      <div 
                        className="h-2 bg-primary rounded" 
                        style={{ 
                          width: `${(item.depth / 6) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="font-medium">Network Analytics:</div>
            <ul className="mt-2 text-sm space-y-1">
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>Real-time network visualization</span>
              </li>
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>Path analysis for complex fraud</span>
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              Sentiment Analysis
            </CardTitle>
            <CardDescription>Real-time data enrichment</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === "fraud" && (
              <SentimentCard 
                sentimentData={{ 
                  positive: 25, 
                  neutral: 30, 
                  negative: 45 
                }}
                type="fraud"
              />
            )}
            {activeTab === "aml" && (
              <SentimentCard 
                sentimentData={{ 
                  positive: 30, 
                  neutral: 35, 
                  negative: 35 
                }}
                type="aml"
              />
            )}
            {activeTab === "cyber" && (
              <SentimentCard 
                sentimentData={{ 
                  positive: 20, 
                  neutral: 25, 
                  negative: 55 
                }}
                type="cyber"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ToggleLeft className="mr-2 h-5 w-5 text-primary" />
              White-Labeling Potential
            </CardTitle>
            <CardDescription>Theme customization and branding options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {whitelabelThemeOptions.map((theme, index) => (
                <div key={theme.name} className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full border" 
                    style={{ backgroundColor: theme.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-xs text-muted-foreground">{theme.usage}% usage</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Theme Distribution</span>
                <span className="text-sm text-muted-foreground">By client sector</span>
              </div>
              <div className="h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={whitelabelThemeOptions}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="usage"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {whitelabelThemeOptions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="font-medium">Customization Features:</div>
            <ul className="mt-2 text-sm space-y-1">
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>Dynamic theming system</span>
              </li>
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>White-labeled reporting</span>
              </li>
              <li className="flex items-center">
                <CircleDot className="h-3 w-3 mr-2 text-primary" />
                <span>Custom domain support</span>
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Rocket className="mr-2 h-5 w-5 text-primary" />
              Revenue Potential
            </CardTitle>
            <CardDescription>Monetization strategies</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-2">Revenue Models</div>
              <div className="h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueModelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueModelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div className="font-medium mb-2">API Usage Growth</div>
              <ChartContainer className="h-[170px]" config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={apiCallsData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-api)" 
                      strokeWidth={2}
                      name="API Calls"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full p-3 bg-muted rounded-lg">
              <div className="font-medium mb-1">Potential Annual Revenue</div>
              <div className="text-2xl font-bold">$38.2M - $45.7M</div>
              <div className="text-xs text-muted-foreground mt-1">Based on current customer acquisition projections</div>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Layers className="mr-2 h-5 w-5 text-primary" />
              UX Flow & Client Delivery
            </CardTitle>
            <CardDescription>Implementation pathway for clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center text-sm font-medium mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">1</div>
                  <span>Discovery</span>
                </div>
                <ul className="space-y-1 pl-8 text-sm">
                  <li className="list-disc">Risk assessment</li>
                  <li className="list-disc">Data inventory</li>
                  <li className="list-disc">Regulatory mapping</li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">2-4 weeks</div>
              </div>
              
              <div className="flex items-center justify-center">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center text-sm font-medium mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">2</div>
                  <span>Configuration</span>
                </div>
                <ul className="space-y-1 pl-8 text-sm">
                  <li className="list-disc">Model selection</li>
                  <li className="list-disc">API integration</li>
                  <li className="list-disc">White-labeling</li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">3-6 weeks</div>
              </div>
              
              <div className="flex items-center justify-center">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center text-sm font-medium mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">3</div>
                  <span>Deployment</span>
                </div>
                <ul className="space-y-1 pl-8 text-sm">
                  <li className="list-disc">On-prem or cloud</li>
                  <li className="list-disc">Automated testing</li>
                  <li className="list-disc">User training</li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">2-4 weeks</div>
              </div>
              
              <div className="flex items-center justify-center">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center text-sm font-medium mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">4</div>
                  <span>Ongoing Support</span>
                </div>
                <ul className="space-y-1 pl-8 text-sm">
                  <li className="list-disc">Model updates</li>
                  <li className="list-disc">Performance tuning</li>
                  <li className="list-disc">Regulatory updates</li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">Continuous</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-lg">
                <Code2 className="mr-2 h-5 w-5 text-primary" />
                Technical Implementation
              </CardTitle>
              <CardDescription>Integration options and developer resources</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <SquareCode className="h-4 w-4 mr-1" />
              API Docs
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Cpu className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">SDK Integration</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Languages supported:</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Java</Badge>
                  <Badge variant="outline">C#</Badge>
                  <Badge variant="outline">Go</Badge>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Integration time</span>
                    <span className="font-medium">2-5 days</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-3">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Data Visualization</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Component libraries:</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Vue</Badge>
                  <Badge variant="outline">Angular</Badge>
                  <Badge variant="outline">D3.js</Badge>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Custom themes</span>
                    <span className="font-medium">Fully supported</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Network className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Graph Intelligence</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Neo4j</Badge>
                  <Badge variant="outline">TigerGraph</Badge>
                  <Badge variant="outline">Custom GNN</Badge>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Real-time querying</span>
                    <span className="font-medium">Supported</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2">
          Download Product Roadmap
        </Button>
        <Button>
          Technical Architecture
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default InnovationDashboard;
