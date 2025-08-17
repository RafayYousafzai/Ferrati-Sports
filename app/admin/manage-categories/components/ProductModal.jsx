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
import { useRef } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ScrollShadow } from "@heroui/scroll-shadow";

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
  const editorRef = useRef(null);

  return (
    <Modal isOpen={isOpen} placement="top-center" size="full" onClose={onClose}>
      <ModalContent>
        <ScrollShadow className="w-full h-full">
          <form onSubmit={(e) => onSubmit(e, editorRef)}>
            <ModalHeader className="flex flex-col gap-1">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </ModalHeader>
            <ModalBody>
              <Select
                isRequired
                label="Category"
                placeholder="Select a category"
                selectedKeys={
                  productForm.category_id
                    ? [String(productForm.category_id)]
                    : []
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
                label="Subtitle"
                placeholder="Enter product subtitle"
                value={productForm.subtitle}
                variant="bordered"
                onChange={(e) =>
                  setProductForm({ ...productForm, subtitle: e.target.value })
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
              <div className="space-y-2 bg-[#e4e4e7] py-4 px- rounded-2xl    ">
                <label className="text-sm font-medium p-6">Description</label>
                <SimpleEditor
                  editorRef={editorRef}
                  key={
                    editingProduct ? `edit-${editingProduct.id}` : "new-fabric"
                  }
                  content={productForm.description}
                />
              </div>
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
                    setProductForm({
                      ...productForm,
                      image_url: e.target.value,
                    })
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
        </ScrollShadow>
      </ModalContent>
    </Modal>
  );
}
