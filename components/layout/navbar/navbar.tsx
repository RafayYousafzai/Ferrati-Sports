import { Suspense } from "react";

import ClientNavbar from "./client-navbar";
import { getNavbarData } from "./navbar-data";

// Loading fallback component
function NavbarSkeleton() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-gray-200">
      <div className="flex items-center justify-between h-[10vh] px-4">
        <div className="w-[60px] h-[60px] bg-gray-700 rounded animate-pulse" />
        <div className="hidden md:flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-4 bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="hidden md:flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-4 bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

// Server component that fetches data and renders client navbar
export default async function Appbar() {
  const navbarData = await getNavbarData();

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <ClientNavbar
        categories={navbarData.categories}
        fabrics={navbarData.fabrics}
        services={navbarData.services}
      />
    </Suspense>
  );
}
