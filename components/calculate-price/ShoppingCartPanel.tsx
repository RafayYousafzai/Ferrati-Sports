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
import { CartItem } from "@/types/calculate-price";

interface ShoppingCartPanelProps {
  cart: CartItem[];
  getTotalItems: () => number;
  clearCart: () => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  getTotalPrice: () => number;
  onBackToSelection: () => void;
}

export function ShoppingCartPanel({
  cart,
  getTotalItems,
  clearCart,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  onBackToSelection,
}: ShoppingCartPanelProps) {
  return (
    <Card className="w-full p-4 shadow-none border-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-bold">Shopping Cart</h2>
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
            <Table aria-label="Cart items" removeWrapper>
              <TableHeader>
                <TableColumn>PRODUCT</TableColumn>
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
                            src={item.product.image_url || "/placeholder.svg"}
                            alt={item.product.title}
                            width={48}
                            height={48}
                            className="rounded object-cover"
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

                          <Chip color="secondary" size="sm" className="mt-1">
                            {item.product.categories.title}
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
                          type="number"
                          value={item.quantity.toString()}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 50;
                            updateQuantity(
                              item.product.id,
                              Math.max(50, newQty)
                            );
                          }}
                          className="w-20"
                          size="sm"
                          min={50}
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
                        {((item.product.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
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
              <Button color="success" className="w-full text-white" size="lg">
                Request Quote Now
              </Button>
              <Button
                variant="flat"
                className="w-full"
                size="lg"
                onClick={onBackToSelection}
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
