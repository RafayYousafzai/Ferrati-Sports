"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { createClient } from "@/lib/supabase/client";

interface NewsletterFormProps {
  placeholder: string;
  buttonText: string;
  variant: "orange" | "white" | "dark";
  styles: {
    bg: string;
    text: string;
    accent: string;
    inputBg: string;
    buttonBg: string;
  };
}

export function NewsletterForm({
  placeholder,
  buttonText,
  variant,
  styles,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addSubscriber(email: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      console.error("Error saving email:", error.message);

      return { error: error.message };
    }

    return { success: true };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    const result = await addSubscriber(email);

    if (result.error) {
      console.error("Error saving email:", result.error);
      setError(result.error);
      setIsLoading(false);

      return;
    }

    setIsSubscribed(true);
    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 ${styles.text}`}>
          Thank you for subscribing!
        </h3>
        <p className={`text-lg ${styles.text} opacity-80`}>
          You will receive our latest updates and insights directly in your
          inbox.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            required
            size="lg"
            className={` text-lg ${styles.inputBg}`}
            placeholder={placeholder}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          size="lg"
          className={` px-8 text-lg ${styles.buttonBg}`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Subscribing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>

      {error && (
        <p className="text-red-400 text-sm">
          {"Error: "}
          {error}
        </p>
      )}

      <p
        className={`text-sm ${styles.text} ${variant === "white" ? "text-gray-500" : "opacity-70"}`}
      >
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates from our company.
      </p>
    </form>
  );
}
