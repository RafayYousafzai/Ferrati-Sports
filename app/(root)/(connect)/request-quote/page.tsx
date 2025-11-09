"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
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
import { Switch } from "@heroui/switch"; // Assuming Switch component exists in this library
import { CheckCircle, Send } from "lucide-react";
import { Spinner } from "@heroui/spinner";

import { ProductSelectionPanel } from "@/components/calculate-price/ProductSelectionPanel";
import Header from "@/components/custom-ui/header";
import { usePriceCalculation } from "@/context/PriceCalculationContext";
import { createClient } from "@/lib/supabase/client";
import QuoteContactForm from "@/components/layout/QuoteContactForm";

// --- Main Page Component ---
export default function RequestQuote() {
  const supabase = createClient();
  const { loading, cart } = usePriceCalculation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [addProducts, setAddProducts] = useState(false); // State for the switch
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleContinue = () => {
    // Basic validation for name and email
    if (!email || !name) {
      alert("Please fill in your email and name before continuing.");

      return;
    }
    // Conditional validation for product selection
    if (addProducts && cart.length === 0) {
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
        description, // Added description to the submission
        cart_items: addProducts ? cart : [], // Only add cart items if switch is on
        total_price: 0,
      },
    ]);

    setSaving(false);
    if (error) {
      console.error(error);
      alert("Failed to submit quote request. Please try again.");
    } else {
      onClose();
      setSubmitted(true);
      // Reset form state after successful submission
      setTimeout(() => {
        setEmail("");
        setName("");
        setPhone("");
        setDescription("");
        setAddProducts(true); // Reset the switch
        setSubmitted(false);
        // Note: You might want to clear the cart here as well
        // clearCart();
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen   flex items-center justify-center">
        <Spinner className="mx-auto mt-20" color="warning" size="lg" />
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
          subtitle="Tell us your needs and we'll prepare a tailored offer just for you"
          title="Request "
        />

        <Spacer y={8} />

        {/* Using the new reusable form component */}
        <QuoteContactForm
          description={description}
          email={email}
          name={name}
          phone={phone}
          setDescription={setDescription}
          setEmail={setEmail}
          setName={setName}
          setPhone={setPhone}
        />

        <Spacer y={6} />

        {/* Card containing the switch for a cleaner UI */}
        <Card className="w-full shadow-sm">
          <CardBody>
            <div className="flex items-center justify-between p-2">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  Add Specific Products?
                </span>
                <span className="text-sm text-gray-500">
                  Toggle this on to select products from our catalog.
                </span>
              </div>
              <Switch
                color="warning"
                isSelected={addProducts}
                onValueChange={setAddProducts}
              />
            </div>
          </CardBody>
        </Card>

        <Spacer y={6} />

        {/* Conditionally render the Product Selection Panel */}
        {addProducts && (
          <ProductSelectionPanel
            fn={false}
            startContent={
              <h2 className="text-2xl font-bold text-gray-800">
                Product Selection
              </h2>
            }
          />
        )}

        <Spacer y={8} />

        {/* Main action button at the bottom of the page */}
        <div className="text-center">
          <Button
            className="bg-orange-500 text-white px-12 rounded-full"
            color="warning"
            isDisabled={!email || !name || (addProducts && cart.length === 0)}
            radius="lg"
            size="lg"
            onPress={handleContinue}
          >
            Continue to Review
          </Button>
        </div>

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

                {/* Description */}
                {description && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3">
                      Description / Message
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Selected Products (Conditional) */}
                {addProducts && cart.length > 0 && (
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
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Back
              </Button>
              <Button
                className="bg-orange-500 text-white px-12 rounded-full"
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
