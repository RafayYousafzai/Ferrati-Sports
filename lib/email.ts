import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Error sending email:", error);

      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Error sending email:", error);

    return { error };
  }
}
