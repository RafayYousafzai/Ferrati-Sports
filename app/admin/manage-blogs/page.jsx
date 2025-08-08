"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

// Dynamically import the UI component with SSR turned off
const BlogManagerUI = dynamic(() => import("./components/BlogManagerUI"), {
  ssr: false,
});

export default function AdminPage() {
  const supabase = createClient();

  const [blogs, setBlogs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([
    { id: "technology", text: "technology" },
    { id: "design", text: "design" },
    { id: "business", text: "business" },
    { id: "health", text: "health" },
    { id: "education", text: "education" },
  ]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blogs").getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setPreviewImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.map((tag, index) => (index === i ? newTag : tag));
    setTags(updatedTags);
  };

  const onClearAll = () => {
    setTags([]);
  };

  const handleSubmit = async (e, editorRef) => {
    e.preventDefault();
    try {
      if (!editorRef.current?.editor) {
        throw new Error("Editor not initialized");
      }
      const content = editorRef.current.getHTML();

      const blogData = {
        ...formData,
        description: content,
        tags: tags.map((tag) => tag.text), // Store tags as an array of strings
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingBlog.id);
        if (error) throw error;
        setIsEditModalOpen(false);
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw error;
        setIsAddModalOpen(false);
      }
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      image_url: blog.image_url,
      description: blog.description,
    });
    setTags(blog.tags?.map((tag) => ({ id: tag, text: tag })) || []);
    setPreviewImage(blog.image_url);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: "", image_url: "", description: "" });
    setPreviewImage(null);
    setEditingBlog(null);
    setTags([]);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <BlogManagerUI
      blogs={blogs}
      formData={formData}
      setFormData={setFormData}
      previewImage={previewImage}
      uploading={uploading}
      editingBlog={editingBlog}
      isAddModalOpen={isAddModalOpen}
      setIsAddModalOpen={setIsAddModalOpen}
      isEditModalOpen={isEditModalOpen}
      setIsEditModalOpen={setIsEditModalOpen}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleSubmit}
      handleDelete={handleDeleteBlog}
      handleEdit={handleEdit}
      resetForm={resetForm}
      // Tags related props
      tags={tags}
      suggestions={suggestions}
      handleTagDelete={handleTagDelete}
      handleTagAddition={handleTagAddition}
      handleTagDrag={handleTagDrag}
      handleTagClick={handleTagClick}
      onTagUpdate={onTagUpdate}
      onClearAll={onClearAll}
    />
  );
}
