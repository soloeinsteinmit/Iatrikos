import { Card, CardBody, Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        <Card className="w-full">
          <CardBody className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>

            <div className="space-y-6 text-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Information We Collect
                </h2>
                <p>We collect information that you provide directly to us:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Personal identification information</li>
                  <li>Professional credentials and qualifications</li>
                  <li>Patient-related data</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  2. How We Use Your Information
                </h2>
                <p>We use the collected information for:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Providing and maintaining our services</li>
                  <li>Improving user experience</li>
                  <li>Sending administrative information</li>
                  <li>Ensuring compliance with regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Data Security
                </h2>
                <p>
                  We implement robust security measures to protect your personal
                  information, including encryption, secure servers, and regular
                  security assessments. However, no method of transmission over
                  the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  4. HIPAA Compliance
                </h2>
                <p>
                  Our platform is designed to be HIPAA-compliant. We maintain
                  appropriate physical, electronic, and managerial procedures to
                  protect sensitive information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  5. Data Retention
                </h2>
                <p>
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this privacy
                  policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  6. Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  7. Changes to This Policy
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  8. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="mt-2">
                  Email: privacy@iatrikos.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </section>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
