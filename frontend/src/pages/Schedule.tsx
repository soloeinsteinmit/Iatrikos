import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Chip,
} from "@nextui-org/react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MoreVertical,
  User,
} from "lucide-react";

const Schedule = () => {
  const [currentDate] = useState(new Date());

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    {
      id: 2,
      patientName: "Sarah Smith",
      time: "10:30 AM",
      type: "Follow-up",
      status: "In Progress",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "02:00 PM",
      type: "Consultation",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?u=mike",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your appointments and meetings
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          size="lg"
        >
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-8">
          <Card className="bg-white">
            <CardBody className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">
                    {currentDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex gap-2">
                    <Button isIconOnly variant="flat" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button isIconOnly variant="flat" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="flat"
                    startContent={<CalendarIcon className="w-4 h-4" />}
                  >
                    Month
                  </Button>
                  <Button
                    variant="flat"
                    startContent={<Clock className="w-4 h-4" />}
                  >
                    Week
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Weekday Headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Calendar Days */}
                {generateCalendarDays().map((date, index) => (
                  <Button
                    key={index}
                    variant="flat"
                    className={`h-24 p-2 flex flex-col items-start justify-start ${
                      date.getDate() === currentDate.getDate()
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        date.getDate() === currentDate.getDate()
                          ? "text-primary font-bold"
                          : ""
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    {/* Appointment indicators */}
                    {index % 3 === 0 && (
                      <div className="mt-1">
                        <div className="bg-primary/20 rounded px-1 py-0.5 text-xs">
                          2 appointments
                        </div>
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-4">
          <Card className="bg-white">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Today's Appointments</h3>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" size="sm">
                      Filter
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>All Appointments</DropdownItem>
                    <DropdownItem>Confirmed</DropdownItem>
                    <DropdownItem>Pending</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={appointment.avatar}
                        size="sm"
                        icon={<User className="w-4 h-4" />}
                      />
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        color={getStatusColor(appointment.status)}
                        variant="flat"
                      >
                        {appointment.status}
                      </Chip>
                      <Button isIconOnly variant="light" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
