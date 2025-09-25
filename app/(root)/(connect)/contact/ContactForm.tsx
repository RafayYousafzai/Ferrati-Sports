"use client";

import { useState, useTransition } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

import { submitContactForm } from "./actions";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    email: "",
    phone: "+92",
    firstName: "",
    lastName: "",
    interest: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("interest", form.interest);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.error) {
        addToast({
          title: result.error,
          color: "warning",
        });
      } else if (result.success) {
        addToast({
          title: result.success,
          color: "success",
        });
        // Reset form on success
        setForm({
          email: "",
          phone: "+92",
          firstName: "",
          lastName: "",
          interest: "",
        });
      }
    });
  };

  return (
    <form className={`space-y-6 ${className}`} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          required
          classNames={{
            input: "bg-gray-100 text-gray-900",
            inputWrapper:
              "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
          }}
          placeholder="Email"
          size="lg"
          type="email"
          value={form.email}
          variant="flat"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          classNames={{
            input: "bg-gray-100 text-gray-900",
            inputWrapper:
              "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
          }}
          placeholder="Phone"
          size="lg"
          type="tel"
          value={form.phone}
          variant="flat"
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          required
          classNames={{
            input: "bg-gray-100 text-gray-900",
            inputWrapper:
              "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
          }}
          placeholder="First Name"
          size="lg"
          type="text"
          value={form.firstName}
          variant="flat"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          classNames={{
            input: "bg-gray-100 text-gray-900",
            inputWrapper:
              "bg-gray-100 border-0 shadow-none hover:bg-gray-200 group-data-[focus=true]:bg-gray-100",
          }}
          placeholder="Last Name"
          size="lg"
          type="text"
          value={form.lastName}
          variant="flat"
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>
      <Textarea
        fullWidth
        className=""
        label="Description"
        placeholder="Enter your description"
        value={form.interest}
        onChange={(e) => handleChange("interest", e.target.value)}
      />

      <div className="pt-6">
        <Button
          className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold"
          isLoading={isPending}
          size="lg"
          type="submit"
        >
          Send Message
        </Button>
      </div>
      <div className="text-xs text-gray-400 max-w-2xl">
        <p>
          By submitting this form, you consent to receive marketing
          communications via automated technology, including pre-recorded
          messages, cell phones and emails. This includes if the number is
          currently on any Do Not Call Lists. This consent is not required to
          make a purchase.
        </p>
      </div>
    </form>
  );
}
