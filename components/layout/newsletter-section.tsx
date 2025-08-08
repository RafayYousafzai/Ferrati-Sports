"use client";

import { useState } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface NewsletterSectionProps {
  sectionTitle?: string;
  headline: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "orange" | "white" | "dark";
  showBenefits?: boolean;
  onSubscribe?: (email: string) => void;
  className?: string;
}

const benefits = [
  "Weekly digital marketing insights",
  "Exclusive case studies and success stories",
  "Early access to new tools and resources",
  "Industry trends and predictions",
  "No spam, unsubscribe anytime",
];
const sectionTitle = "NEWSLETTER";
const headline = "Stay ahead of the digital marketing curve.";
const description =
  "Get the latest insights, strategies, and trends delivered directly to your inbox. Join thousands of marketers who trust our weekly newsletter.";
const placeholder = "Enter your email address";
const buttonText = "Subscribe Now";

export default function NewsletterSection({
  variant = "orange",
  showBenefits = true,
  className = "",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(true);

    setIsSubscribed(true);
    setIsLoading(false);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "orange":
        return {
          bg: "bg-orange-500",
          text: "text-white",
          accent: "text-white",
          inputBg:
            "bg-white/10 border-white/20 text-white placeholder:text-white/70",
          buttonBg: "bg-white text-orange-500 hover:bg-gray-100",
        };
      case "dark":
        return {
          bg: "bg-gray-900",
          text: "text-white",
          accent: "text-orange-500",
          inputBg:
            "bg-white/10 border-white/20 text-white placeholder:text-white/70",
          buttonBg: "bg-orange-500 text-white hover:bg-orange-600",
        };
      default: // white
        return {
          bg: "bg-white",
          text: "text-gray-900",
          accent: "text-orange-500",
          inputBg:
            "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500",
          buttonBg: "bg-orange-500 text-white hover:bg-orange-600",
        };
    }
  };

  const styles = getVariantStyles();

  if (isSubscribed) {
    return (
      <section className={`py-20 px-6 ${styles.bg} ${className}`}>
        <div className="max-w-4xl mx-auto text-center">
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
      </section>
    );
  }

  return (
    <section className={`py-20 px-6 ${styles.bg} ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span
                className={`font-bold text-sm tracking-[0.2em] uppercase mb-6 block ${styles.accent}`}
              >
                {sectionTitle}
              </span>
              <div
                className={`w-16 h-0.5 mb-8 ${variant === "orange" ? "bg-black" : "bg-orange-500"}`}
              />

              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] ${styles.text}`}
              >
                {headline}
              </h2>

              <p
                className={`text-xl leading-relaxed ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
              >
                {description}
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    fullWidth
                    required
                    className={`h-14 text-lg   `}
                    placeholder={placeholder}
                    size="lg"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  className=" bg-white"
                  disabled={isLoading}
                  size="lg"
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

              <p
                className={`text-sm ${styles.text} ${variant === "white" ? "text-gray-500" : "opacity-70"}`}
              >
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </form>
          </div>

          {/* Right Benefits */}
          {showBenefits && (
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Mail
                  className={`w-16 h-16 mx-auto lg:mx-0 mb-6 ${styles.accent}`}
                />
                <h3 className={`text-2xl font-bold mb-6 ${styles.text}`}>
                  What you will get:
                </h3>
              </div>

              <div className="space-y-4">
                {benefits.length > 0 ? (
                  benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          variant === "orange" ? "bg-black" : "bg-orange-500"
                        }`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p
                        className={`text-lg ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
                      >
                        {benefit}
                      </p>
                    </div>
                  ))
                ) : (
                  // Default benefits
                  <>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          variant === "orange" ? "bg-black" : "bg-orange-500"
                        }`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p
                        className={`text-lg ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
                      >
                        Weekly insights and industry trends
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          variant === "orange" ? "bg-black" : "bg-orange-500"
                        }`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p
                        className={`text-lg ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
                      >
                        Exclusive tips and strategies
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          variant === "orange" ? "bg-black" : "bg-orange-500"
                        }`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p
                        className={`text-lg ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
                      >
                        Early access to new resources
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          variant === "orange" ? "bg-black" : "bg-orange-500"
                        }`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p
                        className={`text-lg ${styles.text} ${variant === "white" ? "text-gray-600" : "opacity-90"}`}
                      >
                        No spam, unsubscribe anytime
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
