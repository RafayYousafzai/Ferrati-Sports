"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@heroui/spinner";

// Dynamically import the UI component with SSR turned off
const ServiceManagerUI = dynamic(
  () => import("./components/ServicesManagerUI"),
  {
    ssr: false,
  }
);

export default function AdminPage() {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image_url: "",
    description: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setPreviewImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  // Pass the editorRef from the UI component to the handler
  const handleSubmit = async (e, editorRef) => {
    e.preventDefault();
    try {
      if (!editorRef.current?.editor) {
        throw new Error("Editor not initialized");
      }
      const content = editorRef.current.getHTML();

      // Prepare data - only include slug if it exists
      const dataToSave = {
        title: formData.title,
        image_url: formData.image_url,
        description: content,
      };

      // Only add slug if it has a value
      if (formData.slug && formData.slug.trim()) {
        dataToSave.slug = formData.slug.trim();
      }

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(dataToSave)
          .eq("id", editingService.id);
        if (error) {
          console.error("Database error:", error);
          alert(`Error updating service: ${error.message}`);
          throw error;
        }
        setIsEditModalOpen(false);
      } else {
        const { error } = await supabase.from("services").insert([dataToSave]);
        if (error) {
          console.error("Database error:", error);
          alert(`Error creating service: ${error.message}`);
          throw error;
        }
        setIsAddModalOpen(false);
      }
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug || "",
      image_url: service.image_url,
      description: service.description,
    });
    setPreviewImage(service.image_url);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", image_url: "", description: "" });
    setPreviewImage(null);
    setEditingService(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <ServiceManagerUI
      services={services}
      formData={formData}
      setFormData={setFormData}
      previewImage={previewImage}
      uploading={uploading}
      editingService={editingService}
      isAddModalOpen={isAddModalOpen}
      setIsAddModalOpen={setIsAddModalOpen}
      isEditModalOpen={isEditModalOpen}
      setIsEditModalOpen={setIsEditModalOpen}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      resetForm={resetForm}
    />
  );
}
