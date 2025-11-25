"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import { Image } from "@heroui/image";

import MobileAccordion from "./mobile-accordion";
import {
  MenuItem,
  HoveredLink,
  Menu,
  ProductItem,
  NestedMenuItem,
} from "./navbar-menu";
import { useNavbarScroll } from "./use-navbar-scroll";

// Type definitions
type NavItem = {
  title: string;
  href: string;
  description?: string;
  image?: string;
  products?: { title: string; href: string }[]; // Add products for nested menu
};

type NavGroup = {
  title: string;
  href: string;
  items: NavItem[];
  isProductGrid?: boolean;
};

type NavigationConfig = {
  leftNav: NavItem[];
  centerNav: NavGroup[];
  rightNav: NavItem[];
  mobileNav: NavItem[];
};

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  slug?: string;
}

interface NavItemSimple {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  slug?: string;
}

interface ClientNavbarProps {
  categories: Category[];
  services: NavItemSimple[];
  fabrics: NavItemSimple[];
  products: Product[];
  loading?: boolean;
}

export default function ClientNavbar({
  categories,
  services,
  fabrics,
  products,
  loading = false,
}: ClientNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hidden } = useNavbarScroll();

  // Convert categories to navigation items with their products
  const categoryNavItems: NavItem[] = [
    ...categories.map((category) => {
      // Get products for this category
      const categoryProducts = products
        .filter((product) => product.category_id === category.id)
        .map((product) => ({
          title: product.title,
          href: `/${category.slug || category.id}/${product.slug || product.id}`,
        }));

      return {
        title: category.title,
        href: `/${category.slug || category.id}`,
        description: `${category.description.substring(0, 50)}...`,
        image: category.image_url || "/placeholder.svg?height=200&width=200",
        products: categoryProducts, // Add products to category
      };
    }),
  ];

  // Convert services to navigation items
  const serviceNavItems: NavItem[] = services.map((service) => ({
    title: service.name,
    href: `/services/${service.slug || service.id}`,
  }));

  // Convert fabrics to navigation items
  const fabricNavItems: NavItem[] = fabrics.map((fabric) => ({
    title: fabric.name,
    href: `/fabrics/${fabric.slug || fabric.id}`,
  }));

  const leftNav = [{ title: "Home", href: "/" }];
  const centerNav = [
    {
      title: "Products",
      href: "/categories",
      isProductGrid: false,
      items: loading
        ? categoryNavItems.length > 0
          ? categoryNavItems
          : []
        : categoryNavItems,
    },
    ...(serviceNavItems.length > 0
      ? [
          {
            title: "Services",
            href: "/services",
            isProductGrid: false,
            items: serviceNavItems,
          },
        ]
      : []),
    ...(fabricNavItems.length > 0
      ? [
          {
            title: "Fabrics",
            href: "/fabrics",
            isProductGrid: false,
            items: fabricNavItems,
          },
        ]
      : []),
  ];
  const rightNav = [
    { title: "Blogs", href: "/blogs" },
    { title: "About", href: "/about" },
    { title: "Contact Us", href: "/contact" },
  ];
  const mobileNav = [
    { title: "Home", href: "/" },
    ...centerNav.map((item) => ({
      title: item.title,
      href: item.href,
      items: item.items,
    })),
    ...rightNav,
    { title: "Calculate Price", href: "/calculate-price" },
    { title: "Request Quote", href: "/request-quote" },
  ];

  const navigationConfig: NavigationConfig = {
    leftNav,
    centerNav,
    rightNav,
    mobileNav,
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-gray-200 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Navbar
        className="transition-all duration-300 bg-black/90 h-[10vh]"
        disableAnimation={true}
        isMenuOpen={isMenuOpen}
        maxWidth="2xl"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <div className="relative xl:flex w-auto h-[4rem]">
                <Image
                  alt="Ferrati Sports Logo"
                  className="object-contain w-auto h-[4rem]"
                  src="/logo.png"
                />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-6" justify="center">
          {navigationConfig.leftNav.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="text-white text-lg hover:text-gray-300"
                href={item.href}
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
          {navigationConfig.centerNav.map((item) => (
            <NavbarItem key={item.href}>
              {item.items && item.items.length > 0 ? (
                <MenuContent item={item} />
              ) : (
                <Link
                  className="text-white text-lg hover:text-gray-300"
                  href={item.href}
                >
                  {item.title}
                </Link>
              )}
            </NavbarItem>
          ))}
          {navigationConfig.rightNav.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={`text-white text-lg hover:text-gray-300  `}
                href={item.href}
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
          <Link href={"/services/free-clothing-samples"}>
            <button className="rounded-full uppercase border-2 border-white hover:border-orange-500 tracking-wider cursor-pointer bg-transparent text-white hover:bg-orange-500 hover:text-white font-semibold px-4 py-2 -mr-2 transition-all duration-300">
              Calculator
            </button>
          </Link>
          <Link href={"request-quote"}>
            <button className="rounded-full uppercase border-2 border-orange-500 bg-orange-500  tracking-wider  cursor-pointer  text-white font-semibold px-4 py-2 -mr-2 transition-all duration-300">
              Free Quote{" "}
            </button>
          </Link>
        </NavbarContent>

        <NavbarMenu className="bg-black/80 py-4 -mt-1">
          {navigationConfig.mobileNav.map((item: any, index: number) => (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              {item.items && item.items.length > 0 ? (
                <MobileAccordion
                  title={item.title}
                  href={item.href}
                  items={item.items}
                  onLinkClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <Link
                  className="w-full text-white hover:text-slate-200 py-2 text-2xl"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-white"
        />
      </Navbar>
    </nav>
  );
}

function MenuContent({ item }: { item: NavGroup }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Menu setActive={setActive}>
      <MenuItem
        active={active}
        href={item.href}
        item={item.title}
        setActive={setActive}
      >
        {item.isProductGrid ? (
          <div className="text-sm grid grid-cols-2 gap-4 p-4">
            {item.items.map((navItem) => (
              <ProductItem
                key={navItem.href}
                description={navItem.description || ""}
                href={navItem.href}
                src={
                  navItem.image ||
                  "/placeholder.svg?height=200&width=200&query=product"
                }
                title={navItem.title}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-2 text-sm min-w-[200px]">
            {item.items.map((navItem) =>
              navItem.products && navItem.products.length > 0 ? (
                <NestedMenuItem
                  key={navItem.href}
                  href={navItem.href}
                  products={navItem.products}
                  title={navItem.title}
                />
              ) : (
                <HoveredLink key={navItem.href} href={navItem.href}>
                  {navItem.title}
                </HoveredLink>
              )
            )}
          </div>
        )}
      </MenuItem>
    </Menu>
  );
}
