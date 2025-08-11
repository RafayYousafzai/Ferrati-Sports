"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

// Dynamically import the UI component with SSR turned off
const FabricManagerUI = dynamic(() => import("./components/FabricManagerUI"), {
  ssr: false,
});

export default function AdminPage() {
  const [fabrics, setFabrics] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFabric, setEditingFabric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    image_url: "",
    description: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchFabrics();
  }, []);

  const fetchFabrics = async () => {
    try {
      setLoading(true);
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
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fabrics")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

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

  const handleSubmit = async (e, editorRef) => {
    e.preventDefault();
    try {
      if (!editorRef.current?.editor) {
        throw new Error("Editor not initialized");
      }
      const content = editorRef.current.getHTML();

      if (editingFabric) {
        const { error } = await supabase
          .from("fabrics")
          .update({ ...formData, description: content })
          .eq("id", editingFabric.id);
        if (error) throw error;
        setIsEditModalOpen(false);
      } else {
        const { error } = await supabase
          .from("fabrics")
          .insert([{ ...formData, description: content }]);
        if (error) throw error;
        setIsAddModalOpen(false);
      }
      resetForm();
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
      price: Number(fabric.price) || 0,
      image_url: fabric.image_url,
      description: fabric.description,
    });
    setPreviewImage(fabric.image_url);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: 0,
      image_url: "",
      description: "",
    });
    setPreviewImage(null);
    setEditingFabric(null);
  };

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
    <FabricManagerUI
      fabrics={fabrics}
      formData={formData}
      setFormData={setFormData}
      previewImage={previewImage}
      uploading={uploading}
      editingFabric={editingFabric}
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
