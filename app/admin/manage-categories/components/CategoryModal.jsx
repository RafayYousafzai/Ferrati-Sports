"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Upload, X } from "lucide-react";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  uploading,
  editingCategory,
  categoryForm,
  setCategoryForm,
  imagePreview,
  onImageChange,
  onImageRemove,
}) {
  return (
    <Modal isOpen={isOpen} placement="top-center" size="2xl" onClose={onClose}>
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Title"
              placeholder="Enter category title"
              value={categoryForm.title}
              variant="bordered"
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, title: e.target.value })
              }
            />
            <Input
              label="URL Slug"
              placeholder="e.g., custom-sportswear"
              description="Custom URL slug for this category (e.g., /categories/your-slug)"
              value={categoryForm.slug}
              variant="bordered"
              onChange={(e) => {
                const slugValue = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                setCategoryForm({ ...categoryForm, slug: slugValue });
              }}
            />
            <Textarea
              label="Description"
              minRows={3}
              placeholder="Enter category description"
              value={categoryForm.description}
              variant="bordered"
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  description: e.target.value,
                })
              }
            />
            <div className="space-y-3">
              <p className="text-sm font-medium">Category Image</p>
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
                  id="category-image-upload"
                  type="file"
                  onChange={onImageChange}
                />
                <Button
                  as="label"
                  className="cursor-pointer"
                  htmlFor="category-image-upload"
                  startContent={<Upload size={16} />}
                  variant="bordered"
                >
                  Upload Image
                </Button>
              </div>
              <Input
                label="Or enter image URL"
                placeholder="https://example.com/image.jpg"
                value={categoryForm.image_url}
                variant="bordered"
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
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
              {uploading ? "Saving..." : editingCategory ? "Update" : "Add"}{" "}
              Category
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
