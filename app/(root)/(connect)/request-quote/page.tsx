"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { CheckCircle, Mail, User, Phone, Send } from "lucide-react";

import { ProductSelectionPanel } from "@/components/calculate-price/ProductSelectionPanel";
import Header from "@/components/custom-ui/header";
import { usePriceCalculation } from "@/context/PriceCalculationContext";
import { createClient } from "@/lib/supabase/client";

export default function RequestQuote() {
  const supabase = createClient();
  const { loading, cart } = usePriceCalculation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleContinue = () => {
    if (!email || !name) {
      alert("Please fill in your email and name before continuing.");

      return;
    }
    if (cart.length === 0) {
      alert("Please select at least one product.");

      return;
    }
    onOpen();
  };

  const handleConfirm = async () => {
    setSaving(true);
    const { error } = await supabase.from("requested_quotes").insert([
      {
        email,
        name,
        phone,
        cart_items: cart,
        total_price: 0, // No price shown as requested
      },
    ]);

    setSaving(false);
    if (error) {
      console.error(error);
      alert("Failed to submit quote request. Please try again.");
    } else {
      onClose();
      setSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setEmail("");
        setName("");
        setPhone("");
        setSubmitted(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardBody className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading products...</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardBody className="text-center py-16">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Quote Request Submitted!
            </h2>
            <p className="text-gray-600">
              Thank you! We will get back to you within 24 hours.
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header
          badge="OUR APPROACH"
          highlightedTitle="Quote"
          title="Request "
          subtitle="Tell us your needs and we'll prepare a tailored offer just for you"
        />

        <Spacer y={8} />

        <ProductSelectionPanel
          endContent={
            <>
              <div className="text-center">
                <Button
                  className="bg-orange-500 text-white px-12  rounded-full"
                  color="warning"
                  isDisabled={!email || !name || cart.length === 0}
                  radius="lg"
                  size="lg"
                  onPress={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </>
          }
          fn={false}
          startContent={
            <>
              <h2 className="text-xl font-bold">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  className="max-w-md"
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
              <h2 className="text-xl font-bold">Product Selection</h2>
            </>
          }
        />

        {/* Summary Modal */}
        <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3 className="text-xl font-bold">Review Your Quote Request</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Contact Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p>
                      <span className="font-medium">Name:</span> {name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {email}
                    </p>
                    {phone && (
                      <p>
                        <span className="font-medium">Phone:</span> {phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Products */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Selected Products
                  </h4>
                  <div className="space-y-2">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-sm text-gray-600">
                            Category: {item.product.categories?.title}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Back
              </Button>
              <Button
                className="bg-orange-500 text-white px-12  rounded-full"
                isLoading={saving}
                startContent={!saving && <Send className="h-4 w-4" />}
                onPress={handleConfirm}
              >
                {saving ? "Submitting..." : "Confirm & Submit"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
