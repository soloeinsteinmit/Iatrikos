import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  CardHeader,
  DatePicker,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";

const NewPatient = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="light"
          onClick={() => navigate("/patients")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold ml-5">New Patient</h1>
        </CardHeader>
        <CardBody className="space-y-6 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              placeholder="Enter first name"
              variant="bordered"
            />
            <Input
              label="Last Name"
              placeholder="Enter last name"
              variant="bordered"
            />
            {/* <Input
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              type="date"
              variant="bordered"
            /> */}
            <DatePicker label="Birth date" variant="bordered" />
            <Select
              label="Gender"
              placeholder="Select gender"
              variant="bordered"
            >
              <SelectItem key="male" value="male">
                Male
              </SelectItem>
              <SelectItem key="female" value="female">
                Female
              </SelectItem>
              <SelectItem key="other" value="other">
                Other
              </SelectItem>
            </Select>
            <Input
              label="Phone"
              placeholder="Enter phone number"
              type="tel"
              variant="bordered"
            />
            <Input
              label="Email"
              placeholder="Enter email address"
              type="email"
              variant="bordered"
            />
          </div>

          <Input
            label="Address"
            placeholder="Enter address"
            variant="bordered"
          />

          <Select
            label="Insurance Provider"
            placeholder="Select insurance provider"
            variant="bordered"
          >
            <SelectItem key="provider1" value="provider1">
              Provider 1
            </SelectItem>
            <SelectItem key="provider2" value="provider2">
              Provider 2
            </SelectItem>
          </Select>

          <div className="flex justify-end gap-4">
            <Button
              color="danger"
              variant="light"
              onClick={() => navigate("/patients")}
            >
              Cancel
            </Button>
            <Button color="primary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Patient
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewPatient;
