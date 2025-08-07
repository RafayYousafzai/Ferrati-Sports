import { SidebarDashboard } from "@/components/layout/admin-dashboard";
import Footer from "@/components/layout/footer";
import Appbar from "@/components/layout/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Appbar />
      {children}
      <Footer />
    </>
  );
}
