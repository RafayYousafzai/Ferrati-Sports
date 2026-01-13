/**
 * Pushover notification service
 * Sends push notifications to your phone via Pushover API
 */

interface PushoverPayload {
  token: string; // Pushover app token
  user: string; // Pushover user key
  title: string;
  message: string;
  priority?: number; // -2 to 2
  sound?: string;
  html?: number; // 1 for HTML formatting
  url?: string; // URL to open on notification
  url_title?: string;
}

interface NotificationData {
  type: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  description?: string;
  cartItems?: Array<{ title: string; quantity: number }>;
}

const buildMessage = (lines: (string | undefined)[]) =>
  lines.filter((line) => Boolean(line && line.trim())).join("\n");

export async function sendPushoverNotification(
  data: NotificationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const pushoverToken = "aw3v32bxuzqjbad7gu6ypv7scenw6q";
    const pushoverUser = "u21we6a6w2s8icf1j6t42xx57iasoj";

    if (!pushoverToken || !pushoverUser) {
      console.warn("Pushover credentials not configured");
      return { success: false, error: "Pushover not configured" };
    }

    let title = "";
    let message = "";

    if (data.type === "contact") {
      title = "📧 New Contact Form Submission";
      message = buildMessage([
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : undefined,
        data.description
          ? `Message:\n${data.description.substring(0, 200)}${
              data.description.length > 200 ? "..." : ""
            }`
          : undefined,
      ]);
    } else if (data.type === "quote") {
      title = "🛒 New Quote Request Received";
      const productsSection =
        data.cartItems && data.cartItems.length > 0
          ? [
              "Products:",
              ...data.cartItems.map(
                (item) => `• ${item.title} (Qty: ${item.quantity})`
              ),
            ].join("\n")
          : undefined;

      message = buildMessage([
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : undefined,
        data.description
          ? `Description:\n${data.description.substring(0, 200)}${
              data.description.length > 200 ? "..." : ""
            }`
          : undefined,
        productsSection,
      ]);
    }

    const payload: PushoverPayload = {
      token: pushoverToken,
      user: pushoverUser,
      title,
      message,
      priority: 1,
      sound: "pushover",
      html: 1,
    };

    // Debug logging
    console.log("Sending Pushover notification with payload:", {
      token: pushoverToken,
      user: pushoverUser,
      title,
      messageLength: message.length,
      priority: payload.priority,
    });

    // Build form data properly
    const formData = new URLSearchParams();
    formData.append("token", payload.token);
    formData.append("user", payload.user);
    formData.append("title", payload.title);
    formData.append("message", payload.message);
    formData.append("priority", String(payload.priority));
    formData.append("sound", payload.sound || "pushover");
    formData.append("html", String(payload.html));

    const response = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Pushover error:", errorData);
      return {
        success: false,
        error: errorData.errors?.join(", ") || "Failed to send notification",
      };
    }

    const result = await response.json();
    console.log("Pushover notification sent:", result);

    return { success: true };
  } catch (error) {
    console.error("Error sending Pushover notification:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}
