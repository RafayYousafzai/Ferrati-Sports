"use client";

import { Plus, Minus, ShoppingCart, Trash2, Calculator } from "lucide-react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import Link from "next/link";

import { CartItem } from "@/types/calculate-price";
import { usePriceCalculation } from "@/context/PriceCalculationContext";
import { useRouter } from "next/navigation";

interface ShoppingCartPanelProps {
  cart: CartItem[];
  getTotalItems: () => number;
  clearCart: () => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  getTotalPrice: () => number;
  onBackToSelection: () => void;
}

export function ShoppingCartPanel() {
  const router = useRouter();

  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    setView,
  } = usePriceCalculation();

  const onBackToSelection = () => setView("selection");

  return (
    <Card className="w-full p-4 shadow-none border-none">
      <Link prefetch href="/request-quote" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-bold">Estimated Price</h2>
            </div>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="pt-6">
        {cart.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm">
              Add products with minimum 50 quantity to get started
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <Table removeWrapper aria-label="Cart items">
              <TableHeader>
                <TableColumn>PRODUCT</TableColumn>
                <TableColumn align="center">Fabrics</TableColumn>
                <TableColumn align="center">QUANTITY</TableColumn>
                <TableColumn align="end">TOTAL PRICE</TableColumn>
                <TableColumn align="center">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.product.image_url ? (
                          <Image
                            alt={item.product.title}
                            className="rounded object-cover"
                            height={48}
                            src={item.product.image_url || "/placeholder.svg"}
                            width={48}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold">
                            {item.product.title}
                          </div>

                          <Chip className="mt-1" color="secondary" size="sm">
                            {item.product.categories?.title}
                          </Chip>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.fabric.image_url ? (
                          <Image
                            alt={item.fabric.title}
                            className="rounded object-cover"
                            height={48}
                            src={item.fabric.image_url || "/placeholder.svg"}
                            width={48}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold">
                            {item.fabric.title}
                          </div>

                          <Chip className="mt-1" color="secondary" size="sm">
                            Premium
                          </Chip>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 10)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          className="w-20"
                          min={50}
                          size="sm"
                          type="number"
                          value={item.quantity.toString()}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 50;

                            updateQuantity(
                              item.product.id,
                              Math.max(50, newQty)
                            );
                          }}
                        />
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 10)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-lg">
                        $
                        {(
                          (item.product.price + item.fabric.price) *
                          item.quantity
                        ).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="light"
                        onClick={() =>
                          removeFromCart(item.product.id, item.fabric.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-black">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {getTotalItems()} total items
                </div>
              </div>
              <Button
                className="w-full text-white"
                color="success"
                size="lg"
                onClick={() => router.push("/request-quote")}
              >
                Request Quote Now
              </Button>

              <br />
              <Button
                className="w-full"
                size="lg"
                variant="flat"
                onPress={onBackToSelection}
              >
                Back to Selection
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
