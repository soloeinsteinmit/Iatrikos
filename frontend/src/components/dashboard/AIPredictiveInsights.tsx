import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Activity,
  Clock,
  Zap,
  ChartBar,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Insight {
  type: "prediction" | "alert" | "optimization" | "trend";
  title: string;
  prediction: string;
  confidence: number;
  impact: "urgent" | "high" | "medium" | "low";
  timeframe: string;
  icon: any;
  details?: {
    trend?: "up" | "down" | "stable";
    percentage?: number;
    recommendation?: string;
    affectedAreas?: string[];
  };
}

const AIPredictiveInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([
    {
      type: "prediction",
      title: "Patient Influx",
      prediction: "15% increase expected",
      confidence: 89,
      impact: "high",
      timeframe: "next 24 hours",
      icon: TrendingUp,
      details: {
        trend: "up",
        percentage: 15,
        recommendation:
          "Consider allocating additional staff for emergency department",
        affectedAreas: ["Emergency", "Outpatient", "Radiology"],
      },
    },
    {
      type: "alert",
      title: "Critical Cases",
      prediction: "2 cases need immediate attention",
      confidence: 95,
      impact: "urgent",
      timeframe: "current",
      icon: AlertTriangle,
      details: {
        affectedAreas: ["ICU", "Cardiology"],
        recommendation: "Immediate specialist consultation recommended",
      },
    },
    {
      type: "optimization",
      title: "Resource Allocation",
      prediction: "Staff optimization needed",
      confidence: 87,
      impact: "medium",
      timeframe: "next shift",
      icon: Activity,
      details: {
        trend: "down",
        percentage: 12,
        recommendation: "Redistribute nursing staff to high-demand areas",
        affectedAreas: ["General Ward", "Emergency"],
      },
    },
    {
      type: "trend",
      title: "Treatment Efficacy",
      prediction: "Positive outcome trend detected",
      confidence: 92,
      impact: "medium",
      timeframe: "past week",
      icon: ChartBar,
      details: {
        trend: "up",
        percentage: 8,
        recommendation: "Current treatment protocols showing improved results",
      },
    },
  ]);

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isAnalyzing) {
        const confidenceVariation = Math.random() * 5 - 2.5;
        setInsights((prev) =>
          prev.map((insight) => ({
            ...insight,
            confidence: Math.min(
              100,
              Math.max(0, insight.confidence + confidenceVariation)
            ),
          }))
        );
      }
    }, 5000);

    return () => clearInterval(updateInterval);
  }, [isAnalyzing]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "urgent":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "primary";
      default:
        return "default";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 70) return "primary";
    return "warning";
  };

  return (
    <div className="flex items-start justify-start flex-col gap-5">
      <Card className="w-full h-full">
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">AI Insights</p>
              <p className="text-small text-default-500">Real-time analysis</p>
            </div>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            startContent={<Zap className="h-4 w-4" />}
            onClick={() => setIsAnalyzing(true)}
          >
            Refresh Analysis
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Progress
                    size="sm"
                    value={analysisProgress}
                    color="secondary"
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-500">
                    {analysisProgress}% Complete
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Analyzing clinical data patterns...
                </p>
              </div>
            )}
            {insights.map((insight, index) => (
              <Tooltip
                key={index}
                showArrow
                placement="left"
                content={
                  <div className="p-2 max-w-xs">
                    <p className="font-medium mb-1">Recommendations:</p>
                    <p className="text-sm">{insight.details?.recommendation}</p>
                    {insight.details?.affectedAreas && (
                      <div className="mt-2">
                        <p className="font-medium mb-1">Affected Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {insight.details.affectedAreas.map((area, i) => (
                            <Chip key={i} size="sm" variant="flat">
                              {area}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                }
              >
                <Card
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedInsight(insight)}
                >
                  <CardBody className="py-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <insight.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">
                            {insight.title}
                          </span>
                        </div>
                        <Chip size="sm" color={getImpactColor(insight.impact)}>
                          {insight.impact}
                        </Chip>
                      </div>
                      <p className="text-sm text-gray-600">
                        {insight.prediction}
                      </p>
                      <div className="flex items-center justify-between">
                        <Chip
                          size="sm"
                          color={getConfidenceColor(insight.confidence)}
                          variant="flat"
                        >
                          Confidence: {insight.confidence.toFixed(2)}%
                        </Chip>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{insight.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Tooltip>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="space-y-6 h-full">
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardBody>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">
                  AI Pattern Recognition
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress
                      size="md"
                      radius="sm"
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator:
                          "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      label="Pattern Matching"
                      value={87}
                      showValueLabel={true}
                    />
                  </div>
                  <Chip color="warning" variant="flat">
                    High Accuracy
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Active Learning</h3>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold">98.5%</span>
                </div>
                <p className="text-xs text-gray-500">Model Confidence Score</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardBody>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Predictive Metrics</h3>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                <Activity className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium">Patient Recovery Time</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-success">-12%</span>
                    <Chip size="sm" variant="flat" color="success">
                      improving
                    </Chip>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on current treatment protocols
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">AI Recommendations</h3>
                <Button size="sm" variant="light" color="primary">
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {[
                  {
                    title: "Optimize Staff Scheduling",
                    priority: "high",
                    impact: "Potential 15% efficiency increase",
                  },
                  {
                    title: "Update Treatment Protocol",
                    priority: "medium",
                    impact: "Better patient outcomes expected",
                  },
                ].map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">{rec.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        color={rec.priority === "high" ? "danger" : "warning"}
                      >
                        {rec.priority}
                      </Chip>
                      <Tooltip content={rec.impact}>
                        <Button isIconOnly size="sm" variant="light">
                          <ChartBar className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AIPredictiveInsights;
