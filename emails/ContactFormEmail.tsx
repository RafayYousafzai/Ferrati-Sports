import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
}

export const ContactFormEmail = ({
  firstName,
  lastName,
  email,
  phone,
  interest,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        New Contact Form Submission from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={text}>
            You have received a new contact form submission from your website.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>
              {firstName} {lastName}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Phone:</Text>
            <Text style={value}>{phone || "Not provided"}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message/Interest:</Text>
            <Text style={value}>{interest || "Not provided"}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from the Ferrati Sports contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "24px 0",
  padding: "0 40px",
};

const section = {
  padding: "0 40px",
  marginBottom: "16px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 4px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
};
