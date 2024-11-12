import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Button,
} from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Brain,
  Activity,
  Heart,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface MetricCard {
  label: string;
  value: string;
  target: string;
  progress: number;
  trend: "improving" | "stable" | "declining";
  icon: any;
  analysis?: string;
}

const ClinicalMetrics = () => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const workflowEfficiency = [
    { day: "Mon", efficiency: 85, bottleneck: 15 },
    { day: "Tue", efficiency: 88, bottleneck: 12 },
    { day: "Wed", efficiency: 92, bottleneck: 8 },
    { day: "Thu", efficiency: 87, bottleneck: 13 },
    { day: "Fri", efficiency: 90, bottleneck: 10 },
  ];

  const performanceMetrics: MetricCard[] = [
    {
      label: "Clinical Decision Accuracy",
      value: "94%",
      target: "90%",
      progress: 94,
      trend: "improving",
      icon: Brain,
      analysis:
        "AI suggests potential for 2% improvement through protocol optimization",
    },
    {
      label: "Treatment Success Rate",
      value: "88%",
      target: "85%",
      progress: 88,
      trend: "stable",
      icon: CheckCircle,
      analysis: "Consistent with best practices, maintaining optimal levels",
    },
    {
      label: "Resource Utilization",
      value: "92%",
      target: "95%",
      progress: 92,
      trend: "improving",
      icon: Activity,
      analysis: "Optimization potential in diagnostic resource allocation",
    },
    {
      label: "Patient Outcome Index",
      value: "8.7/10",
      target: "8.5/10",
      progress: 87,
      trend: "improving",
      icon: Heart,
      analysis: "Trending positively, exceeding benchmark by 2.3%",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">
              Workflow Efficiency Analysis
            </h3>
            <p className="text-sm text-gray-500">
              AI-powered optimization insights
            </p>
          </div>
          <div className="flex gap-2">
            {["daily", "weekly", "monthly"].map((range) => (
              <Chip
                key={range}
                size="sm"
                color={timeRange === range ? "primary" : "default"}
                onClick={() => setTimeRange(range as any)}
                className="cursor-pointer"
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Chip>
            ))}
          </div>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={workflowEfficiency}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" fill="#0070f3" name="Efficiency" />
              <Bar dataKey="bottleneck" fill="#f97316" name="Bottlenecks" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="w-full">
            <CardBody className="py-3">
              <div className="flex items-center gap-3">
                <metric.icon className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm font-bold">{metric.value}</span>
                  </div>
                  <Progress
                    value={metric.progress}
                    className="mt-2"
                    color={metric.progress >= 90 ? "success" : "primary"}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      Target: {metric.target}
                    </span>
                    <Chip
                      size="sm"
                      color={
                        metric.trend === "improving"
                          ? "success"
                          : metric.trend === "stable"
                          ? "primary"
                          : "danger"
                      }
                    >
                      {metric.trend}
                    </Chip>
                  </div>
                  {metric.analysis && (
                    <p className="text-xs text-gray-600 mt-2 italic">
                      {metric.analysis}
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClinicalMetrics;
