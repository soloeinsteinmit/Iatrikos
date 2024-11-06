import { Card, CardBody, Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
              Terms of Service
            </h1>

            <div className="space-y-6 text-gray-600">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using Iatrikos, you agree to be bound by
                  these Terms of Service and all applicable laws and
                  regulations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  2. Use License
                </h2>
                <p>
                  Permission is granted to temporarily access Iatrikos for
                  personal, non-commercial transitory viewing only.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>The materials cannot be modified or copied</li>
                  <li>The materials cannot be used for commercial purposes</li>
                  <li>
                    Any unauthorized use terminates the permission automatically
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Medical Disclaimer
                </h2>
                <p>
                  Iatrikos is designed to support healthcare professionals but
                  should not be considered a replacement for professional
                  medical judgment. Users should rely on their professional
                  expertise when making medical decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  4. User Responsibilities
                </h2>
                <p>
                  Users are responsible for maintaining the confidentiality of
                  their account and password. Users must notify us of any
                  security breaches or unauthorized use of their account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  5. Data Protection
                </h2>
                <p>
                  We implement appropriate data collection, storage, and
                  processing practices and security measures to protect against
                  unauthorized access, alteration, disclosure, or destruction of
                  your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  6. Modifications
                </h2>
                <p>
                  We reserve the right to revise these terms of service at any
                  time without notice. By using this website, you agree to be
                  bound by the current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  7. Governing Law
                </h2>
                <p>
                  These terms shall be governed by and construed in accordance
                  with the laws of [Your Jurisdiction], without regard to its
                  conflict of law provisions.
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

export default TermsOfService;
