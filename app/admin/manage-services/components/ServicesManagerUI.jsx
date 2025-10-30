"use client";

import { useRef } from "react";
import { Trash2, Edit, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import Separator from "@/components/separator";
import Card from "@/components/custom-ui/card";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Image } from "@heroui/image";

// 1. Define ServiceForm OUTSIDE the main component.
// It now receives all its data and functions as props.
const ServiceForm = ({
  handleSubmit,
  formData,
  setFormData,
  previewImage,
  uploading,
  editingService,
  handleImageUpload,
  resetForm,
  setIsAddModalOpen,
  setIsEditModalOpen,
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, editorRef)}
      className="space-y-4 pb-6"
    >
      <div className="mx-auto p-6 space-y-4">
        <Input
          className="max-w-[90%] mx-auto"
          label="Title"
          placeholder="Enter service title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          isRequired
        />
        <Separator bg="accent" className="my-4" />

        <Input
          className="max-w-[90%] mx-auto"
          label="URL Slug"
          placeholder="e.g., custom-design-services"
          description="Custom URL slug for this service (e.g., /services/your-slug)"
          value={formData.slug}
          onChange={(e) => {
            // Auto-generate slug from title if empty, or use custom input
            const slugValue = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
            setFormData({ ...formData, slug: slugValue });
          }}
        />
        <Separator bg="accent" className="my-4" />

        <div className="max-w-[90%] mx-auto">
          <label className="text-sm font-medium">Image</label>
          <div className="mt-2 flex flex-col items-start gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="flat"
              onClick={triggerFileInput}
              startContent={<ImageIcon className="w-4 h-4" />}
              isLoading={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
            {(previewImage || formData.image_url) && (
              <div className="aspect-square w-48 relative rounded-lg border">
                <Image
                  src={previewImage || formData.image_url || null}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-2 bg-[#e4e4e7] py-4 px- rounded-2xl max-w-full mt-4">
            <label className="text-sm font-medium p-6">Description</label>
            <SimpleEditor
              editorRef={editorRef}
              key={editingService ? `edit-${editingService.id}` : "new-fabric"}
              content={formData.description}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 max-w-[90%] mx-auto pb-6">
        <Button
          color="danger"
          variant="flat"
          onPress={() => {
            resetForm();
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button color="primary" type="submit" isLoading={uploading}>
          {editingService ? "Update Service" : "Add Service"}
        </Button>
      </div>
    </form>
  );
};

export default function ServiceManagerUI(props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 mx-auto p-6">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-default-500">Manage your service collection</p>
        </div>
        <div>
          <Button
            color="primary"
            onPress={() => {
              props.resetForm();
              props.setIsAddModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <Modal
        isOpen={props.isAddModalOpen}
        onOpenChange={props.setIsAddModalOpen}
        size="5xl"
      >
        <ModalContent className="h-full">
          {(onClose) => (
            <ScrollShadow className="w-full h-full">
              <ModalHeader>
                <h2>Add New Service</h2>
              </ModalHeader>
              <ModalBody>
                {/* 2. Pass all necessary props down to ServiceForm */}
                <ServiceForm {...props} />
              </ModalBody>
            </ScrollShadow>
          )}
        </ModalContent>
      </Modal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {props.services.map((service) => (
          <Card
            key={service.id}
            image={service.image_url}
            title={service.title}
            href={`/services/${service.id}`}
          >
            <div
              className="text-sm text-default-500 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
            <div className="flex gap-1">
              <Chip variant="solid" color="primary" className="mt-1">
                {new Date(service.created_at).toLocaleDateString()}
              </Chip>
              <ButtonGroup className="ml-auto">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => props.handleEdit(service)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  onPress={() => props.handleDelete(service.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        ))}
      </div>

      {props.services.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-12 h-12 mx-auto text-default-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No services yet</h3>
          <p className="text-default-500 mb-4">
            Start by adding your first service to the collection.
          </p>
          <Button
            color="primary"
            onPress={() => {
              props.resetForm();
              props.setIsAddModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      )}

      <Modal
        isOpen={props.isEditModalOpen}
        onOpenChange={props.setIsEditModalOpen}
        size="5xl"
      >
        <ModalContent className="h-full">
          {(onClose) => (
            <ScrollShadow className="w-full h-full">
              <ModalHeader>
                <h2>Edit Service</h2>
              </ModalHeader>
              <ModalBody>
                {/* 2. Pass all necessary props down to ServiceForm */}
                <ServiceForm {...props} />
              </ModalBody>
            </ScrollShadow>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
