"use client";

import { FC } from "react";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input"; // Assuming Textarea component exists
import { Mail, User, Phone, MessageSquare } from "lucide-react";

interface QuoteContactFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const QuoteContactForm: FC<QuoteContactFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  description,
  setDescription,
}) => {
  return (
    <Card className="w-full shadow-sm">
      <CardBody>
        <div className="space-y-6 p-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Contact Information
          </h2>
          {/* Grid layout for contact inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isRequired
              label="Full Name"
              placeholder="John Doe"
              radius="lg"
              startContent={<User className="h-4 w-4 text-gray-400" />}
              type="text"
              value={name}
              variant="flat"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              label="Email Address"
              placeholder="your.email@example.com"
              radius="lg"
              startContent={<Mail className="h-4 w-4 text-gray-400" />}
              type="email"
              value={email}
              variant="flat"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Phone Number (Optional)"
              placeholder="+1 (555) 123-4567"
              radius="lg"
              startContent={<Phone className="h-4 w-4 text-gray-400" />}
              type="tel"
              value={phone}
              variant="flat"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Description Textarea */}
          <Textarea
            label="Project Description / Message"
            placeholder="Tell us about your project or any specific requirements..."
            radius="lg"
            value={description}
            variant="flat"
            startContent={
              <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
            }
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default QuoteContactForm;
