"use client";

import { FC, useState } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Mail, User, Phone, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

const QuoteContactForm: FC<QuoteContactFormProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const supabase = createClient();
    const { error } = await supabase.from("requested_quotes").insert([
      {
        email,
        name: `${firstName} ${lastName}`,
        phone,
        description,
        cart_items: [],
        total_price: 0,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setSubmitMessage("Error submitting quote request. Please try again.");
      console.error("Error:", error);
    } else {
      setSubmitMessage("Quote request submitted successfully!");
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDescription("");
    }
  };

  return (
    <div className="w-full ">
      <h2 className="text-4xl font-bold text-orange-500">Get Instant Quote</h2>
      <p className="mt-2 py-4 text-gray-600">
        Fill out the form below, and our team will get back to you with a
        personalized quote.
      </p>
      <br />
      {/* Grid layout for contact inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          isRequired
          label="First Name"
          radius="lg"
          startContent={<User className="h-4 w-4 text-gray-400" />}
          type="text"
          value={firstName}
          variant="flat"
          onChange={(e) => setFirstName(e.target.value)}
        />{" "}
        <Input
          isRequired
          label="Last Name"
          radius="lg"
          startContent={<User className="h-4 w-4 text-gray-400" />}
          type="text"
          value={lastName}
          variant="flat"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          isRequired
          label="Email Address"
          radius="lg"
          startContent={<Mail className="h-4 w-4 text-gray-400" />}
          type="email"
          value={email}
          variant="flat"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone Number (Optional)"
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
        startContent={<MessageSquare className="h-4 w-4 text-gray-400 mr-2" />}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mt-4"
      />

      <br />
      <br />

      {/* Submit Button */}
      <Button
        color="primary"
        className="bg-orange-500 w-full mt-6"
        size="lg"
        onClick={handleSubmit}
        isLoading={isSubmitting}
        // isDisabled={!name || !email || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </Button>

      {/* Success/Error Message */}
      {submitMessage && (
        <p
          className={`mt-4 text-center ${
            submitMessage.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default QuoteContactForm;
