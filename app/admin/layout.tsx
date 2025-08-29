
import { SidebarDashboard } from "@/components/layout/admin-dashboard";
import RequireAdminAuth from "@/components/layout/RequireAdminAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAdminAuth>
      <SidebarDashboard>{children}</SidebarDashboard>
    </RequireAdminAuth>
  );
}
