"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { Pencil, Save, X, Loader2, Upload } from "lucide-react";
import { usePathname } from "next/navigation";

interface EditableImageProps {
    id: string;
    defaultValue: string;
    initialContent?: string;
    className?: string;
    renderImage?: (src: string) => React.ReactNode;
    alt?: string;
}

export default function EditableImage({
    id,
    defaultValue,
    initialContent,
    className = "",
    renderImage,
    alt = "Editable Image",
}: EditableImageProps) {
    const [content, setContent] = useState(initialContent || defaultValue);
    const [tempContent, setTempContent] = useState(content);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(!initialContent);
    const [isSaving, setIsSaving] = useState(false);
    const { isAdmin } = useAdmin();
    const supabase = createClient();
    const pathname = usePathname();

    // Fetch content on mount ONLY if initialContent is not provided
    useEffect(() => {
        if (initialContent) {
            setIsLoading(false);
            return;
        }

        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from("content_blocks")
                    .select("value")
                    .eq("key", id)
                    .single();

                if (data) {
                    setContent(data.value);
                    setTempContent(data.value);
                } else if (error && error.code !== "PGRST116") {
                    console.error("Error fetching content:", error);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [id, supabase, initialContent]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from("content_blocks")
                .upsert({
                    key: id,
                    value: tempContent,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;

            setContent(tempContent);

            // Trigger revalidation
            await fetch("/api/revalidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: pathname }),
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save content");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setTempContent(content);
        setIsEditing(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadImage = async (file: File) => {
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `content/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("images")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("images").getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
            return null;
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSaving(true);
        const publicUrl = await uploadImage(file);
        setIsSaving(false);

        if (publicUrl) {
            setTempContent(publicUrl);
        }
    };

    const currentSrc = isLoading ? defaultValue : content;

    return (
        <div className={`relative group inline-block ${className}`}>
            {renderImage ? (
                renderImage(currentSrc)
            ) : (
                <img src={currentSrc} alt={alt} className="w-full h-auto" />
            )}

            {isAdmin && (
                <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTempContent(content);
                        setIsEditing(true);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-blue-500 text-white rounded-full shadow-lg z-50 cursor-pointer"
                    title="Edit Image"
                >
                    <Pencil className="w-4 h-4" />
                </div>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Image Source
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isSaving}
                                    className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    {isSaving ? "Uploading..." : "Click to upload new image"}
                                </button>
                                <div className="text-center text-xs text-gray-400">OR</div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={tempContent}
                                    onChange={(e) => setTempContent(e.target.value)}
                                    className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center border">
                            {tempContent ? (
                                <img src={tempContent} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-gray-400">No image</span>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
