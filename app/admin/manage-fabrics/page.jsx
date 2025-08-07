"use client";

import { useState, useEffect, useRef } from "react";
import { Trash2, Edit, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createClient } from "@/lib/supabase/client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import Separator from "@/components/Separator";
import Card from "@/components/custom-ui/card";

export default function AdminPage() {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [fabrics, setFabrics] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFabric, setEditingFabric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    description: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchFabrics();
  }, []);

  const fetchFabrics = async () => {
    try {
      const { data, error } = await supabase
        .from("fabrics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFabrics(data || []);
    } catch (error) {
      console.error("Error fetching fabrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("fabrics") // Make sure you have this bucket created
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("fabrics").getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setPreviewImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get content in JSON format
      if (!editorRef.current.editor) {
        throw new Error("Editor not initialized");
      }

      const content = editorRef.current.getHTML();

      if (editingFabric) {
        const { error } = await supabase
          .from("fabrics")
          .update({
            title: formData.title,
            image_url: formData.image_url,
            description: content,
          })
          .eq("id", editingFabric.id);

        if (error) throw error;
        setIsEditModalOpen(false);
      } else {
        const { error } = await supabase.from("fabrics").insert([
          {
            title: formData.title,
            image_url: formData.image_url,
            description: content,
          },
        ]);

        if (error) throw error;
        setIsAddModalOpen(false);
      }

      setFormData({ title: "", image_url: "", description: "" });
      setPreviewImage(null);
      setEditingFabric(null);
      fetchFabrics();
    } catch (error) {
      console.error("Error saving fabric:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fabric?")) return;

    try {
      const { error } = await supabase.from("fabrics").delete().eq("id", id);

      if (error) throw error;
      fetchFabrics();
    } catch (error) {
      console.error("Error deleting fabric:", error);
    }
  };

  const handleEdit = (fabric) => {
    setEditingFabric(fabric);
    setFormData({
      title: fabric.title,
      image_url: fabric.image_url,
      description: fabric.description,
    });
    setPreviewImage(fabric.image_url);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", image_url: "", description: "" });
    setPreviewImage(null);
    setEditingFabric(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const FabricForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mx-auto p-6">
        <Input
          className="max-w-[90%] mx-auto"
          label="Title"
          placeholder="Enter fabric title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          isRequired
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
              <div className="aspect-square w-48 relative rounded-lg  border">
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

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading fabrics...</div>
        </div>
      </div>
    );
  }

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
              resetForm();
              setIsAddModalOpen(!isAddModalOpen);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Fabric
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        size="full"
      >
        <ModalContent className="h-full">
          {(onClose) => (
            <>
              <ScrollShadow className="w-full h-full">
                <ModalHeader>
                  <h2>Add New Fabric</h2>
                </ModalHeader>
                <ModalBody>
                  <FabricForm />
                </ModalBody>
              </ScrollShadow>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto p-6">
        {fabrics.map((fabric) => (
          <Card key={fabric.id} image={fabric.image_url} title={fabric.title}>
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
                  onPress={() => handleEdit(fabric)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  onPress={() => handleDelete(fabric.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        ))}
      </div>

      {fabrics.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-12 h-12 mx-auto text-default-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No fabrics yet</h3>
          <p className="text-default-500 mb-4">
            Start by adding your first fabric to the collection.
          </p>
          <Button
            color="primary"
            onPress={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Fabric
          </Button>
        </div>
      )}

      <Modal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        size="full"
      >
        <ModalContent className="h-full">
          {(onClose) => (
            <>
              <ScrollShadow className="w-full h-full">
                <ModalHeader>
                  <h2>Edit Fabric</h2>
                </ModalHeader>
                <ModalBody>
                  <FabricForm />
                </ModalBody>
              </ScrollShadow>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
