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

import { MenuItem, HoveredLink, Menu, ProductItem } from "./navbar-menu";
import { useNavbarScroll } from "./use-navbar-scroll";
import { Button } from "@heroui/button";

// Type definitions
type NavItem = {
  title: string;
  href: string;
  description?: string;
  image?: string;
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

interface ClientNavbarProps {
  categories: Category[];
  services: NavItemSimple[];
  fabrics: NavItemSimple[];
  loading?: boolean;
}

export default function ClientNavbar({
  categories,
  services,
  fabrics,
  loading = false,
}: ClientNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hidden } = useNavbarScroll();

  // Convert categories to navigation items
  const categoryNavItems: NavItem[] = [
    ...categories.map((category) => ({
      title: category.title,
      href: `/${category.slug || category.id}`,
      description: `${category.description.substring(0, 50)}...`,
      image: category.image_url || "/placeholder.svg?height=200&width=200",
    })),
    {
      title: "All Categories",
      href: "/categories",
      description: "Check our all categories",
      image: "/assets/cat4.webp",
    },
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

  const navigationConfig: NavigationConfig = {
    leftNav: [{ title: "Home", href: "/" }],
    centerNav: [
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
    ],
    rightNav: [
      { title: "Blogs", href: "/blogs" },
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Calculate Price", href: "/calculate-price" },
    ],
    mobileNav: [
      { title: "Home", href: "/" },
      { title: "Products", href: "/categories" },
      { title: "Fabrics", href: "/fabrics" },
      { title: "Services", href: "/services" },
      { title: "Blogs", href: "/blogs" },
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Calculate Price", href: "/calculate-price" },
      { title: "Request Quote", href: "/request-quote" },
    ],
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
              <div className="relative xl:flex w-[60px] h-[60px]">
                <Image
                  alt="Ferrati Sports Logo"
                  className="object-contain w-[60px] h-[60px]"
                  src="/logo.png"
                />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-6" justify="center">
          {navigationConfig.leftNav.map((item) => (
            <NavbarItem key={item.href}>
              <Link className="text-white hover:text-gray-300" href={item.href}>
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
                  className="text-white hover:text-gray-300"
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
                className={`text-white hover:text-gray-300  `}
                href={item.href}
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
          <Link href={"/services/free-clothing-samples"}>
            <button className="rounded-full border-2 border-white hover:border-none cursor-pointer bg-transparent text-white hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 transition-all duration-300">
              Start Free
            </button>
          </Link>
          <Link href={"request-quote"}>
            <Button
              className="bg-orange-500 text-white hover:bg-orange-600 font-semibold transition-all duration-300"
              radius="full"
              size="lg"
              variant="solid"
            >
              Request Quote
            </Button>
          </Link>
        </NavbarContent>

        <NavbarMenu className="bg-black/80 py-4 -mt-1">
          {navigationConfig.mobileNav.map((item: NavItem, index: number) => (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                className="w-full text-white hover:text-slate-200 py-2 text-2xl"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
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
          <div className="flex flex-col space-y-4 text-sm">
            {item.items.map((navItem) => (
              <HoveredLink key={navItem.href} href={navItem.href}>
                {navItem.title}
              </HoveredLink>
            ))}
          </div>
        )}
      </MenuItem>
    </Menu>
  );
}
