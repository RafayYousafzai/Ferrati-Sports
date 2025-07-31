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
import React, { useState } from "react";
import { MenuItem } from "./navbar-menu";
import { HoveredLink, Menu, ProductItem } from "./navbar-menu";
import Badge from "./Badge";

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

// EDIT THIS CONFIGURATION TO UPDATE ALL PAGES
const navigationConfig: NavigationConfig = {
  leftNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
  ],
  centerDropdowns: [
    {
      title: "Our Services",
      items: [
        { title: "Printing", href: "/printing" },
        { title: "Sublimation", href: "/sublimation" },
        { title: "Embroidery", href: "/embroidery" },
        { title: "Stitching", href: "/stitching" },
      ],
    },
    {
      title: "Our Products",
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
  ],
  rightNav: [
    { title: "Blogs", href: "/blogs" },
    { title: "Contact Us", href: "/contact" },
  ],
  mobileNav: [
    "Home",
    "About",
    "Our Services",
    "Our Products",
    "Blogs",
    "Contact Us",
  ],
};

export default function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="dark  fixed " onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Badge containerStyles="  xl:flex w-[160px] h-[180px]" />
        </NavbarBrand>
      </NavbarContent>

      {/* Left-aligned navigation */}
      <NavbarContent justify="start" className="hidden sm:flex gap-4">
        {navigationConfig.leftNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="text-white">
              {item.title}
            </Link>
          </NavbarItem>
        ))}
        <MenuContent />
        {navigationConfig.rightNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="text-white">
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {navigationConfig.mobileNav.map((item, index) => {
          const navItem =
            [...navigationConfig.leftNav, ...navigationConfig.rightNav].find(
              (n) => n.title === item
            ) || navigationConfig.centerDropdowns.find((n) => n.title === item);

          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" href={navItem?.href || "#"}>
                {item}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
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
