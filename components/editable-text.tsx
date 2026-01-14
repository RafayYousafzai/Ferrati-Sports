"use client";

import React, { useState, useEffect, useRef } from "react";
import { Pencil, Save, X, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useAdmin } from "@/hooks/use-admin";

interface EditableTextProps {
  id: string;
  defaultValue: string;
  initialContent?: string;
  className?: string;
  multiline?: boolean;
  as?: React.ElementType;
}

import { usePathname } from "next/navigation";

export default function EditableText({
  id,
  defaultValue,
  initialContent,
  className = "",
  multiline = false,
  as: Component = "span",
}: EditableTextProps) {
  const [content, setContent] = useState(initialContent || defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
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
      const { error } = await supabase.from("content_blocks").upsert({
        key: id,
        value: content,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

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
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Component className={`${className} opacity-50`}>
        {defaultValue}
      </Component>
    );
  }

  if (isEditing) {
    return (
      <span className="relative group inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className={`w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${className}`}
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            className={`w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${className}`}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        <span className="absolute top-0 right-0 transform translate-x-full pl-2 flex gap-1 z-50">
          <button
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isSaving}
            title="Save"
            onClick={handleSave}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
            title="Cancel"
            onClick={handleCancel}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      </span>
    );
  }

  return (
    <span className="relative group inline-block">
      <Component className={className}>{content}</Component>
      {isAdmin && (
        <div
          className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-blue-500 text-white rounded-full shadow-lg z-10 cursor-pointer"
          role="button"
          tabIndex={0}
          title="Edit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsEditing(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              setIsEditing(true);
            }
          }}
        >
          <Pencil className="w-3 h-3" />
        </div>
      )}
    </span>
  );
}
