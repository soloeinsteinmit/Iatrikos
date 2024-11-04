import React from "react";
import {
  Card,
  CardBody,
  Textarea,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Clipboard,
  Send,
  Mic,
  MoreVertical,
  Image,
  Paperclip,
  Camera,
} from "lucide-react";
import IatrikosMessage from "./IatrikosMessage";
import ClinicalUserMessage from "./ClinicalUserMessage";
import ClinicalAnalysisMessage from "./ClinicalAnalysisMessage";

interface ChatInterfaceProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  input,
  onInputChange,
  onSend,
}) => {
  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardBody className="p-0">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <IatrikosMessage
              isBot
              content="Hello! I'm Iatrikos, your clinical decision support agent. I've analyzed the case details and I'm here to help. What would you like to know about this case?"
              timestamp="10:30 AM"
            />

            <ClinicalAnalysisMessage
              title="Updated Analysis"
              analysis={{
                diagnoses: [
                  {
                    condition: "Upper Respiratory Infection",
                    confidence: "High Confidence",
                  },
                  {
                    condition: "Seasonal Allergies",
                    confidence: "Moderate Confidence",
                  },
                ],
                recommendations: [
                  "Consider prescribing antibiotics for the upper respiratory infection.",
                  "Recommend allergy testing to confirm the diagnosis of seasonal allergies.",
                ],
                findings: [
                  "Patient reports a sore throat and cough.",
                  "Patient has a history of seasonal allergies.",
                ],
              }}
              timestamp="10:34 AM"
            />

            {/* Example Analysis Message */}

            <ClinicalUserMessage
              content="I'm not sure what to do next. What should I do?"
              timestamp="10:33 AM"
            />
            <ClinicalUserMessage
              content="Give a detailed explanation of the analysis. What are the next steps? What tests should I order? What medications should I prescribe? What is the likelihood of the patient having these conditions? What is the likelihood of the patient having these conditions? What is the likelihood of the patient having these conditions? What is the likelihood of the patient having these conditions?"
              timestamp="10:33 AM"
            />
          </div>

          <div className="border-t p-4 space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Ask a question about the case..."
                  value={input}
                  size="sm"
                  onChange={(e) => onInputChange(e.target.value)}
                  className="min-h-[80px]"
                  endContent={
                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly variant="light" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Additional Actions">
                          <DropdownItem startContent={<Clipboard size={16} />}>
                            Copy to Clipboard
                          </DropdownItem>
                          <DropdownItem startContent={<Image size={16} />}>
                            Upload Image
                          </DropdownItem>
                          <DropdownItem startContent={<Paperclip size={16} />}>
                            Attach File
                          </DropdownItem>
                          <DropdownItem startContent={<Camera size={16} />}>
                            Take Photo
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Button
                  isIconOnly
                  color="secondary"
                  variant="flat"
                  title="Voice Input"
                  size="sm"
                >
                  <Mic size={16} />
                </Button>
                <Button
                  isIconOnly
                  color="primary"
                  onClick={onSend}
                  title="Send Message"
                  size="sm"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 px-4">
              ⚠️ Iatrikos is an AI assistant and may make mistakes. Always
              verify information and consult appropriate medical sources.
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChatInterface;
