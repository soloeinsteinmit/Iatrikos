import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle } from "lucide-react";

interface VitalSign {
  name: string;
  current: number;
  unit: string;
  normalRange: string;
  status: "normal" | "elevated" | "low";
  trend: {
    time: string;
    value: number;
  }[];
}

export const VitalsTrends: React.FC = () => {
  const vitals: VitalSign[] = [
    {
      name: "Blood Pressure",
      current: 142,
      unit: "mmHg",
      normalRange: "90-120",
      status: "elevated",
      trend: [
        { time: "8:00", value: 138 },
        { time: "12:00", value: 142 },
        { time: "16:00", value: 140 },
      ],
    },
    {
      name: "Heart Rate",
      current: 72,
      unit: "bpm",
      normalRange: "60-100",
      status: "normal",
      trend: [
        { time: "8:00", value: 68 },
        { time: "12:00", value: 72 },
        { time: "16:00", value: 70 },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "elevated":
        return "danger";
      case "low":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="space-y-4">
      <CardHeader>
        <h3 className="text-xl font-semibold">Vitals Trends</h3>
      </CardHeader>
      <CardBody>
        {vitals.map((vital, index) => (
          <Card key={index} className="mb-4 border-1">
            <CardBody>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{vital.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {vital.current} {vital.unit}
                    </span>
                    <Chip color={getStatusColor(vital.status)} variant="flat">
                      {vital.status.toUpperCase()}
                    </Chip>
                  </div>
                </div>
                {vital.status !== "normal" && (
                  <div className="flex items-center text-warning">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm ml-1">Outside normal range</span>
                  </div>
                )}
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vital.trend}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0070F3"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                Normal Range: {vital.normalRange} {vital.unit}
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </div>
  );
};
