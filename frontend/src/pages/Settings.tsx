import {
  Card,
  CardBody,
  Button,
  Input,
  Switch,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from "@nextui-org/react";
import {
  User,
  Bell,
  Shield,
  Clock,
  Mail,
  Smartphone,
  Globe,
  Upload,
  Save,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      <Tabs aria-label="Settings tabs" color="primary" className="w-full">
        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </div>
          }
        >
          <Card className="bg-white p-4">
            <CardBody className="gap-6">
              <div className="flex items-center gap-4">
                <Avatar
                  src="https://i.pravatar.cc/150?u=doctor"
                  className="w-24 h-24"
                />
                <div className="space-y-2">
                  <Button
                    variant="flat"
                    startContent={<Upload className="w-4 h-4" />}
                  >
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">
                    Recommended: Square JPG, PNG. Max 1MB
                  </p>
                </div>
              </div>

              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  defaultValue="John"
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  defaultValue="Smith"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  defaultValue="john.smith@example.com"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone number"
                  defaultValue="+1 (555) 000-0000"
                  startContent={
                    <Smartphone className="w-4 h-4 text-gray-400" />
                  }
                />
                <Input
                  label="Specialty"
                  placeholder="Enter your specialty"
                  defaultValue="General Physician"
                />
                <Input
                  label="License Number"
                  placeholder="Enter your license number"
                  defaultValue="MD12345"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="notifications"
          title={
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
          }
        >
          <Card className="bg-white p-4">
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-gray-500">
                        Receive emails about upcoming appointments
                      </p>
                    </div>
                    <Switch defaultSelected />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Patient Updates</p>
                      <p className="text-sm text-gray-500">
                        Get notified about patient status changes
                      </p>
                    </div>
                    <Switch defaultSelected />
                  </div>
                </div>
              </div>

              <Divider />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">System Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Desktop Notifications</p>
                      <p className="text-sm text-gray-500">
                        Show desktop push notifications
                      </p>
                    </div>
                    <Switch defaultSelected />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Alerts</p>
                      <p className="text-sm text-gray-500">
                        Play sound for important alerts
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="security"
          title={
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </div>
          }
        >
          <Card className="bg-white p-4">
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Divider />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="preferences"
          title={
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Preferences</span>
            </div>
          }
        >
          <Card className="bg-white p-4">
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Language"
                    placeholder="Select language"
                    defaultValue="English"
                  />
                  <Input
                    label="Time Zone"
                    placeholder="Select time zone"
                    defaultValue="UTC-5 (Eastern Time)"
                    startContent={<Clock className="w-4 h-4 text-gray-400" />}
                  />
                </div>
              </div>

              <Divider />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appearance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-gray-500">
                        Reduce spacing in the interface
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button
          color="primary"
          size="md"
          startContent={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
