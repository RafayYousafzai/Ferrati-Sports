"use client";

import { useRef } from "react";
import { Trash2, Edit, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import Separator from "@/components/separator";
import Card from "@/components/custom-ui/card";

// 1. Define FabricForm OUTSIDE the main component.
// It now receives all its data and functions as props.
const FabricForm = ({
  handleSubmit,
  formData,
  setFormData,
  previewImage,
  uploading,
  editingFabric,
  handleImageUpload,
  resetForm,
  setIsAddModalOpen,
  setIsEditModalOpen,
  handlePriceChange,
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
          placeholder="Enter fabric title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          isRequired
        />
        <Input
          className="max-w-[90%] mx-auto mt-2"
          label="URL Slug"
          placeholder="e.g., cotton-blend"
          description="Custom URL slug for this fabric (e.g., /fabrics/your-slug)"
          value={formData.slug}
          onChange={(e) => {
            const slugValue = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
            setFormData({ ...formData, slug: slugValue });
          }}
        />
        <Input
          className="max-w-[90%] mx-auto mt-2"
          label="Price"
          placeholder="Enter fabric price"
          value={formData.price}
          onValueChange={(value) => setFormData({ ...formData, price: value })}
          isRequired
          type="number"
          min={0}
          step={0.01}
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
                <img
                  src={previewImage || formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <Separator bg="accent" className="my-4" />
      </div>
      <div className="space-y-2 bg-[#e4e4e7] py-4 px- rounded-2xl max-w-[87%] mx-auto">
        <label className="text-sm font-medium p-6">Description</label>
        <SimpleEditor
          editorRef={editorRef}
          key={editingFabric ? `edit-${editingFabric.id}` : "new-fabric"}
          content={formData.description}
        />
      </div>
      <Separator bg="accent" className="my-4" />
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
          {editingFabric ? "Update Fabric" : "Add Fabric"}
        </Button>
      </div>
    </form>
  );
};

export default function FabricManagerUI(props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 mx-auto p-6">
        <div>
          <h1 className="text-3xl font-bold">Fabric Management</h1>
          <p className="text-default-500">Manage your fabric collection</p>
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
            Add Fabric
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
                <h2>Add New Fabric</h2>
              </ModalHeader>
              <ModalBody>
                {/* 2. Pass all necessary props down to FabricForm */}
                <FabricForm {...props} />
              </ModalBody>
            </ScrollShadow>
          )}
        </ModalContent>
      </Modal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {props.fabrics.map((fabric) => (
          <Card
            key={fabric.id}
            image={fabric.image_url}
            title={fabric.title}
            href={`/fabrics/${fabric.id}`}
          >
            <div
              className="text-sm text-default-500 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: fabric.description }}
            />
            <div className="flex gap-1">
              <Chip variant="solid" color="primary" className="mt-1">
                {new Date(fabric.created_at).toLocaleDateString()}
              </Chip>
              <ButtonGroup className="ml-auto">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => props.handleEdit(fabric)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  onPress={() => props.handleDelete(fabric.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        ))}
      </div>

      {props.fabrics.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-12 h-12 mx-auto text-default-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No fabrics yet</h3>
          <p className="text-default-500 mb-4">
            Start by adding your first fabric to the collection.
          </p>
          <Button
            color="primary"
            onPress={() => {
              props.resetForm();
              props.setIsAddModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Fabric
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
                <h2>Edit Fabric</h2>
              </ModalHeader>
              <ModalBody>
                {/* 2. Pass all necessary props down to FabricForm */}
                <FabricForm {...props} />
              </ModalBody>
            </ScrollShadow>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
