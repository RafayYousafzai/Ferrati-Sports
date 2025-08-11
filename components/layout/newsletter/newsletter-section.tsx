import { Mail, Check } from "lucide-react";

import { NewsletterForm } from "./newsletter-form";

interface NewsletterSectionProps {
  sectionTitle?: string;
  headline?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "orange" | "white" | "dark";
  showBenefits?: boolean;
  className?: string;
}

const defaultBenefits = [
  "Weekly digital marketing insights",
  "Exclusive case studies and success stories",
  "Early access to new tools and resources",
  "Industry trends and predictions",
  "No spam, unsubscribe anytime",
];
const defaultSectionTitle = "NEWSLETTER";
const defaultHeadline = "Stay ahead of the digital marketing curve.";
const defaultDescription =
  "Get the latest insights, strategies, and trends delivered directly to your inbox. Join thousands of marketers who trust our weekly newsletter.";
const defaultPlaceholder = "Enter your email address";
const defaultButtonText = "Subscribe Now";

export default function NewsletterSection({
  sectionTitle = defaultSectionTitle,
  headline = defaultHeadline,
  description = defaultDescription,
  placeholder = defaultPlaceholder,
  buttonText = defaultButtonText,
  variant = "orange",
  showBenefits = true,
  className = "",
}: NewsletterSectionProps) {
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
                className={`w-16 h-0.5 mb-8 ${variant === "orange" ? "bg-[#032f59]" : "bg-orange-500"}`}
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

            {/* Newsletter Form (Client Component) */}
            <NewsletterForm
              buttonText={buttonText}
              placeholder={placeholder}
              styles={styles}
              variant={variant}
            />
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
                {defaultBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        variant === "orange" ? "bg-[#032f59]" : "bg-orange-500"
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
