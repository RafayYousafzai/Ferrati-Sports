"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Upload, X } from "lucide-react";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  uploading,
  editingProduct,
  productForm,
  setProductForm,
  categories,
  imagePreview,
  onImageChange,
  onImageRemove,
}) {
  return (
    <Modal isOpen={isOpen} placement="top-center" size="2xl" onClose={onClose}>
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </ModalHeader>
          <ModalBody>
            <Select
              isRequired
              label="Category"
              placeholder="Select a category"
              selectedKeys={
                productForm.category_id ? [String(productForm.category_id)] : []
              }
              variant="bordered"
              onSelectionChange={(keys) => {
                const selectedKey = keys.values().next().value;
                setProductForm({
                  ...productForm,
                  category_id: selectedKey || "",
                });
              }}
            >
              {categories.map((category) => (
                <SelectItem key={String(category.id)}>
                  {category.title}
                </SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              label="Title"
              placeholder="Enter product title"
              value={productForm.title}
              variant="bordered"
              onChange={(e) =>
                setProductForm({ ...productForm, title: e.target.value })
              }
            />
            <Input
              isRequired
              type="number"
              label="Price"
              placeholder="Enter product price"
              value={productForm.price}
              variant="bordered"
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
            />
            <Textarea
              label="Description"
              minRows={3}
              placeholder="Enter product description"
              value={productForm.description}
              variant="bordered"
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
            />
            <div className="space-y-3">
              <p className="text-sm font-medium">Product Image</p>
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    src={imagePreview}
                  />
                  <Button
                    isIconOnly
                    className="absolute -top-2 -right-2"
                    color="danger"
                    size="sm"
                    onPress={onImageRemove}
                  >
                    <X size={14} />
                  </Button>
                </div>
              )}
              <div className="flex gap-3">
                <input
                  accept="image/*"
                  className="hidden"
                  id="product-image-upload"
                  type="file"
                  onChange={onImageChange}
                />
                <Button
                  as="label"
                  className="cursor-pointer"
                  htmlFor="product-image-upload"
                  startContent={<Upload size={16} />}
                  variant="bordered"
                >
                  Upload Image
                </Button>
              </div>
              <Input
                label="Or enter image URL"
                placeholder="https://example.com/image.jpg"
                value={productForm.image_url}
                variant="bordered"
                onChange={(e) =>
                  setProductForm({ ...productForm, image_url: e.target.value })
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              isDisabled={uploading}
              variant="light"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              isDisabled={uploading}
              isLoading={uploading}
              type="submit"
            >
              {uploading ? "Saving..." : editingProduct ? "Update" : "Add"}{" "}
              Product
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
