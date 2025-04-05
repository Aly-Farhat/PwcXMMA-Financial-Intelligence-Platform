
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, AlertTriangle, Key, Lock, RefreshCw } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface SecurityEvent {
  id: string;
  type: "authentication" | "authorization" | "data" | "network";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  source: string;
}

interface SecurityMonitoringCardProps {
  events: SecurityEvent[];
  stats: {
    totalRequests: number;
    failedAuth: number;
    tokenRefreshes: number;
    avgResponseTime: number;
  };
}

export const SecurityMonitoringCard: React.FC<SecurityMonitoringCardProps> = ({
  events,
  stats
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "authentication": return <Key className="h-4 w-4" />;
      case "authorization": return <Lock className="h-4 w-4" />;
      case "data": return <AlertTriangle className="h-4 w-4" />;
      case "network": return <RefreshCw className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2" /> Security Monitoring
        </CardTitle>
        <CardDescription>Real-time security events and authentication metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Total Requests</div>
            <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Failed Auth</div>
            <div className="text-2xl font-bold text-amber-600">{stats.failedAuth}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Token Refreshes</div>
            <div className="text-2xl font-bold">{stats.tokenRefreshes}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">Avg Response Time</div>
            <div className="text-2xl font-bold">{stats.avgResponseTime}ms</div>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {getTypeIcon(event.type)}
                      <span className="ml-2 hidden md:inline">{event.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {event.source}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {event.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {event.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
