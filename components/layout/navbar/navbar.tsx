"use client";
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
import { useState, useEffect } from "react";
import { MenuItem } from "./navbar-menu";
import { HoveredLink, Menu, ProductItem } from "./navbar-menu";
import Badge from "../../Badge";

// Type definitions
type NavItem = {
  title: string;
  href: string;
  description?: string;
  image?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
  isProductGrid?: boolean;
};

type NavigationConfig = {
  leftNav: NavItem[];
  centerDropdowns: NavGroup[];
  rightNav: NavItem[];
  mobileNav: string[];
};

const navigationConfig: NavigationConfig = {
  leftNav: [
    { title: "Home", href: "/" },
    { title: "Fabrics", href: "/fabrics" },
  ],
  centerDropdowns: [
    {
      title: "Services",
      items: [
        { title: "Printing", href: "/printing" },
        { title: "Sublimation", href: "/sublimation" },
        { title: "Embroidery", href: "/embroidery" },
        { title: "Stitching", href: "/stitching" },
      ],
    },

    {
      title: "Products",
      isProductGrid: true,
      items: [
        {
          title: "Sports Wear",
          href: "/sports-wear",
          image: "https://ferratisports.com/items/attimgs/8a0c8o3a7f.jpg",
          description: "High-performance sportswear for athletes.",
        },
        {
          title: "Active Wear",
          href: "/active-wear",
          image: "https://ferratisports.com/items/attimgs/0g9o6x2i7k.jpg",
          description: "Comfortable wear for workouts.",
        },
        {
          title: "Casual Wear",
          href: "/casual-wear",
          image: "https://ferratisports.com/items/attimgs/5f2g0f2r2h.jpg",
          description: "Trendy everyday clothing.",
        },
        {
          title: "Motorbike Gear",
          href: "/bike-gear",
          image: "https://ferratisports.com/items/attimgs/8o1k4v0m0x.jpg",
          description: "Durable gear for bikers.",
        },
      ],
    },
    {
      title: "About",
      items: [
        { title: "About us", href: "/about-us" },
        { title: "Return Policy", href: "/return-policy" },
        { title: "Our Process", href: "/our-process" },
      ],
    },
  ],
  rightNav: [
    { title: "Blogs", href: "/blogs" },
    { title: "Contact Us", href: "/contact" },
    { title: "Calculate Price", href: "/calculate-price" },
    { title: "Request Quote", href: "/request-quote" },
  ],
  mobileNav: [
    "Home",
    "About",
    "Fabrics",
    "Our Services",
    "Our Products",
    "More",
    "Blogs",
    "Contact Us",
    "Request Quote",
    "Calculate Price",
  ],
};

export default function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `transition-all duration-300 ${
    scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-black"
  }`;

  return (
    <Navbar
      className={navbarClasses}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>
          <Badge containerStyles="xl:flex w-[160px] h-[180px]" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex gap-4">
        {navigationConfig.leftNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="text-white hover:text-gray-300">
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <MenuContent />

      <NavbarContent justify="end" className="hidden sm:flex gap-4 -ml-4">
        {navigationConfig.rightNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className={`text-white hover:text-gray-300 ${
                item.title === "Request Quote" ? "font-bold text-primary" : ""
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="bg-black/95">
        {navigationConfig.mobileNav.map((item, index) => {
          const allItems = [
            ...navigationConfig.leftNav,
            ...navigationConfig.rightNav,
            ...navigationConfig.centerDropdowns.flatMap((group) => group.items),
          ];
          const navItem = allItems.find((n) => n.title === item);

          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href={navItem?.href || "#"}
                className="w-full text-white hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden text-white"
      />
    </Navbar>
  );
}

function MenuContent() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Menu setActive={setActive}>
      {navigationConfig.centerDropdowns.map((group) => (
        <MenuItem
          key={group.title}
          setActive={setActive}
          active={active}
          item={group.title}
        >
          {group.isProductGrid ? (
            <div className="text-sm grid grid-cols-2 gap-4 p-4">
              {group.items.map((item) => (
                <ProductItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  src={item.image || ""}
                  description={item.description || ""}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4 text-sm">
              {group.items.map((item) => (
                <HoveredLink key={item.href} href={item.href}>
                  {item.title}
                </HoveredLink>
              ))}
            </div>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
}
