"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { CartItem } from "@/types/calculate-price";

interface CheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  cart: CartItem[];
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export function CheckoutModal({
  isOpen,
  onOpenChange,
  cart,
  getTotalPrice,
  getTotalItems,
}: CheckoutModalProps) {
  const handleRequestQuote = () => {
    const cartData = cart.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    const queryString = new URLSearchParams({
      cart: JSON.stringify(cartData),
    }).toString();

    window.location.href = `/request-quote?${queryString}`;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Your Quote Request
            </ModalHeader>
            <ModalBody>
              <p>
                You are about to request a quote for {getTotalItems()} items.
              </p>
              <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleRequestQuote}>
                Request Quote Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
