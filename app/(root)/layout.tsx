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
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
