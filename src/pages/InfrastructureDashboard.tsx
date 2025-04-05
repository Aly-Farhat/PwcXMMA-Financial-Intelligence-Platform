
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ModelMetricsCard } from "@/components/technical/ModelMetricsCard";
import { ArchitectureFlowChart } from "@/components/infrastructure/ArchitectureFlowChart";
import { PipelineStatusCard } from "@/components/infrastructure/PipelineStatusCard";
import { SecurityMonitoringCard } from "@/components/infrastructure/SecurityMonitoringCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Database, Server, Cloud, GitBranch, Cpu, Network } from "lucide-react";

const InfrastructureDashboard = () => {
  const [useCase, setUseCase] = useState("fraud");
  
  // Architecture components
  const architectureNodes = [
    // Data Sources
    { id: "web_scraper", name: "Azure Web Scraper", type: "service", description: "Public data collection" },
    { id: "api_ingestor", name: "API Ingestor", type: "service", description: "Internal data feeds" },
    
    // Processing
    { id: "databricks", name: "Databricks", type: "compute", description: "ETL & Feature Engineering" },
    { id: "azureml", name: "Azure ML", type: "compute", description: "GNN Training" },
    { id: "functions", name: "Azure Functions", type: "compute", description: "Serverless Processing" },
    
    // Storage
    { id: "adls", name: "ADLS Gen2", type: "storage", description: "Raw & Processed Data" },
    { id: "cosmosdb", name: "CosmosDB", type: "storage", description: "Graph Database" },
    { id: "blob", name: "Blob Storage", type: "storage", description: "Model Artifacts" },
    
    // Security
    { id: "oauth", name: "OAuth 2.0", type: "security" },
    { id: "sas", name: "SAS Tokens", type: "security" },
    { id: "keyvault", name: "Key Vault", type: "security" }
  ];
  
  const architectureConnections = [
    { source: "web_scraper", target: "adls", label: "Raw Data" },
    { source: "api_ingestor", target: "adls", label: "Event Data" },
    { source: "adls", target: "databricks", label: "ETL Pipeline" },
    { source: "databricks", target: "azureml", label: "Feature Store" },
    { source: "azureml", target: "cosmosdb", label: "Graph Models" },
    { source: "cosmosdb", target: "functions", label: "Query API" }
  ];
  
  // Pipeline metrics
  const pipelineSteps = [
    { 
      name: "Data Collection", 
      status: "success", 
      latency: 352, 
      throughput: 843, 
      lastRun: "5 min ago" 
    },
    { 
      name: "Data Processing", 
      status: "success", 
      latency: 1247, 
      throughput: 231, 
      lastRun: "15 min ago" 
    },
    { 
      name: "Feature Engineering", 
      status: "warning", 
      latency: 3842, 
      throughput: 102, 
      lastRun: "25 min ago" 
    },
    { 
      name: "Model Training", 
      status: "pending", 
      lastRun: "45 min ago" 
    },
    { 
      name: "Deployment", 
      status: "success", 
      latency: 682, 
      lastRun: "2 hrs ago" 
    }
  ];
  
  // Security events
  const securityEvents = [
    {
      id: "evt-001",
      type: "authentication",
      severity: "low",
      description: "Multiple authentication attempts from approved IP range",
      timestamp: "2025-04-05 09:43:21",
      source: "Azure AD"
    },
    {
      id: "evt-002",
      type: "authorization",
      severity: "medium",
      description: "Unusual access pattern to CosmosDB detected",
      timestamp: "2025-04-05 08:17:33",
      source: "CosmosDB"
    },
    {
      id: "evt-003",
      type: "network",
      severity: "high",
      description: "Request rate limit exceeded from external API client",
      timestamp: "2025-04-05 07:55:12",
      source: "API Gateway"
    },
    {
      id: "evt-004",
      type: "data",
      severity: "critical",
      description: "Access attempt to sensitive data from unauthorized service principal",
      timestamp: "2025-04-05 06:32:09",
      source: "ADLS Gen2"
    }
  ];
  
  const securityStats = {
    totalRequests: 4873291,
    failedAuth: 17,
    tokenRefreshes: 429,
    avgResponseTime: 231
  };
  
  // Infrastructure metrics
  const infraMetrics = [
    { name: "CPU Usage", value: "62%", color: "#9b87f5" },
    { name: "Memory Usage", value: "48%", color: "#68d391" },
    { name: "Storage", value: "1.7 TB", color: "#f6ad55" },
    { name: "Network I/O", value: "4.2 GB/s", color: "#4299e1" }
  ];
  
  const modelMetrics = [
    { name: "Training Time", value: "43 min", description: "Average training time per model" },
    { name: "Model Size", value: "2.3 GB", description: "GNN model size" },
    { name: "Pipeline Runs", value: "52", description: "Successful runs today" },
    { name: "Failed Jobs", value: "3", description: "Failures in last 24h" }
  ];
  
  const scalingMetrics = [
    { name: "Auto-scaling", value: "Enabled", color: "#68d391" },
    { name: "Shard Count", value: "12", description: "CosmosDB shards" },
    { name: "Replicas", value: "3", description: "Geo-replicated instances" },
    { name: "Node Pool", value: "8", description: "Kubernetes nodes" }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Infrastructure & DevOps Dashboard" 
        subtitle="Cloud, Data & Engineering Metrics"
      />
      
      <Tabs defaultValue={useCase} onValueChange={setUseCase} className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="fraud">Fraud</TabsTrigger>
          <TabsTrigger value="aml">AML</TabsTrigger>
          <TabsTrigger value="cyber">Cybersecurity</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-500" />
              Infrastructure Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Healthy</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              99.98% Uptime
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Cpu className="h-4 w-4 mr-2 text-purple-500" />
              Processing Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14</div>
            <div className="flex items-center text-xs text-blue-500 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              Running Now
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-green-500" />
              Database Ops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2K/s</div>
            <div className="flex items-center text-xs text-amber-500 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
              65% of capacity
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
              2 Medium, 1 Low
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ArchitectureFlowChart 
          title="End-to-End Architecture" 
          description="Azure-hosted data platform for GNN model deployment"
          nodes={architectureNodes}
          connections={architectureConnections}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PipelineStatusCard 
          title="Data Pipeline Status" 
          description="End-to-end pipeline monitoring"
          steps={pipelineSteps} 
        />
        
        <SecurityMonitoringCard 
          events={securityEvents}
          stats={securityStats}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ModelMetricsCard 
          title="Infrastructure Metrics"
          metrics={infraMetrics}
          columns={2}
          variant="bordered" 
        />
        
        <ModelMetricsCard 
          title="GNN Model Infrastructure"
          metrics={modelMetrics}
          columns={2}
          variant="bordered" 
        />
        
        <ModelMetricsCard 
          title="Scaling & Replication"
          metrics={scalingMetrics}
          columns={2}
          variant="bordered" 
        />
      </div>
      
      <div className="grid grid-cols-1 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Infrastructure Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-lg border">
              <div className="text-center">
                <Network className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <div className="font-medium">Network Topology Visualization</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Interactive network topology visualization would be rendered here
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InfrastructureDashboard;
