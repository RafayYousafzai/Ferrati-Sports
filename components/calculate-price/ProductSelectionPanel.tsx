"use client";

import { Plus, ShoppingCart, Package, Minus, Trash2, Box } from "lucide-react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

import { Category, Product } from "@/types/calculate-price";
import { CartItem } from "@/types/calculate-price";

interface ProductSelectionPanelProps {
  categories: Category[];
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  quantity: number;
  handleQuantityChange: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addToCart: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  onMakeNewQuote: () => void;
}

export function ProductSelectionPanel({
  categories,
  products,
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  selectedProduct,
  setSelectedProduct,
  quantity,
  handleQuantityChange,
  searchTerm,
  setSearchTerm,
  addToCart,
  cart,
  updateQuantity,
  removeFromCart,
  onMakeNewQuote,
}: ProductSelectionPanelProps) {
  return (
    <Card className="w-full p-4 shadow-none border-none">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-orange-600" />
          <div>
            <h2 className="text-xl font-bold">Calculate Price</h2>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-6 pt-6">
        <div className="flex flex-row gap-1 flex-wrap">
          {/* Category Selection */}
          <div className="w-full md:w-[33%]">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="category-select"
            >
              Category
            </label>
            <Select
              id="category-select"
              placeholder="Select a category"
              radius="full"
              renderValue={(items) => {
                return items.map((item) => {
                  const category = categories.find(
                    (cat) => cat.id === item.key
                  );

                  return (
                    <div key={item.key} className="flex items-center gap-2">
                      {category?.image_url && (
                        <Image
                          alt={category.title}
                          className="rounded-full object-cover"
                          height={32}
                          src={category.image_url || "/placeholder.svg"}
                          width={32}
                        />
                      )}
                      <span>{category?.title}</span>
                    </div>
                  );
                });
              }}
              selectedKeys={selectedCategory ? [selectedCategory] : []}
              size="lg"
              variant="flat"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                setSelectedCategory(selected || "");
              }}
            >
              {categories.map((category) => (
                <SelectItem key={category.id} textValue={category.title}>
                  <div className="flex items-center gap-2">
                    {category.image_url && (
                      <Image
                        alt={category.title}
                        className="rounded-full object-cover"
                        height={42}
                        src={category.image_url || "/placeholder.svg"}
                        width={42}
                      />
                    )}
                    <span>{category.title}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* Product Selection */}
          <div className="w-full md:w-[33%]">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="product-select"
            >
              Product
            </label>
            <Select
              id="product-select"
              placeholder="Select a product"
              radius="full"
              renderValue={(items) => {
                return items.map((item) => {
                  const product = filteredProducts.find(
                    (prod) => prod.id === item.key
                  );

                  return (
                    <div key={item.key} className="flex items-center gap-3">
                      {product?.image_url ? (
                        <Image
                          alt={product.title}
                          className="rounded-full object-cover"
                          height={32}
                          src={product.image_url || "/placeholder.svg"}
                          width={32}
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{product?.title}</div>
                      </div>
                    </div>
                  );
                });
              }}
              selectedKeys={selectedProduct ? [selectedProduct] : []}
              size="lg"
              variant="flat"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                setSelectedProduct(selected || "");
              }}
            >
              {filteredProducts.map((product) => (
                <SelectItem key={product.id} textValue={product.title}>
                  <div className="flex items-center gap-3 py-2">
                    {product.image_url ? (
                      <Image
                        alt={product.title}
                        className="rounded-full object-cover"
                        height={42}
                        src={product.image_url || "/placeholder.svg"}
                        width={42}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div className="font-medium">{product.title} </div>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* Quantity Input */}
          <div className="w-full md:w-[33%]">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="quantity-input"
            >
              Quantity
            </label>
            <Input
              color={quantity < 50 ? "danger" : "default"}
              description={`Current quantity: ${quantity} items`}
              errorMessage={quantity < 50 ? "Minimum quantity is 50" : ""}
              id="quantity-input"
              min={50}
              placeholder="Enter quantity"
              radius="full"
              size="lg"
              startContent={<Package className="h-4 w-4 text-gray-400" />}
              type="number"
              value={quantity.toString()}
              variant="flat"
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
          </div>
        </div>

        {cart.length > 0 && (
          <>
            <h3 className="text-lg font-bold">Selected Products</h3>
            <Table removeWrapper aria-label="Cart items">
              <TableHeader>
                <TableColumn>PRODUCT</TableColumn>
                <TableColumn align="center">QUANTITY</TableColumn>
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
                    <TableCell>
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="light"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        <Button
          className="w-full"
          color="primary"
          isDisabled={!selectedProduct || quantity < 50}
          size="lg"
          startContent={<Plus className="h-5 w-5" />}
          onClick={addToCart}
        >
          Add {categories.find((cat) => cat.id === selectedCategory)?.title}
        </Button>
        <Button
          className="w-full"
          color="success"
          isDisabled={cart.length === 0}
          size="lg"
          startContent={<ShoppingCart className="h-5 w-5" />}
          onClick={onMakeNewQuote}
        >
          Make New Quote
        </Button>
      </CardBody>
    </Card>
  );
}
