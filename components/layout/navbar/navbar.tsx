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

import Badge from "../../badge";

import { MenuItem } from "./navbar-menu";
import { HoveredLink, Menu, ProductItem } from "./navbar-menu";

import { createClient } from "@/lib/supabase/client";

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

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Category[]>([]);
  const [services, setServices] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("title,id,description,image_url")
          .order("created_at", { ascending: false })
          .limit(3); // Only fetch 4 categories

        if (error) throw error;
        setCategories(data || []);

        const { data: blogsData, error: blogsError } = await supabase
          .from("blogs")
          .select("title,id")
          .order("created_at", { ascending: false });

        if (blogsError) throw blogsError;
        setBlogs(blogsData || []);

        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("title,id")
          .order("created_at", { ascending: false });

        if (servicesError) throw servicesError;
        setServices(servicesData || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to static data if database fetch fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Convert categories to navigation items
  const categoryNavItems: NavItem[] = [
    ...categories.map((category) => ({
      title: category.title,
      href: `/categories/${category.id}`,
      description: `${category.description.substring(0, 50)}...`,
      image: category.image_url || "/placeholder.svg?height=200&width=200",
    })),
    {
      title: "All Categories",
      href: `/categories`,
      description: `Check our all categories`,
      image: "/assets/cat4.png",
    },
  ];
  const blogsNavItems: NavItem[] = [
    {
      title: "All Blogs",
      href: `/blogs`,
    },
    ...blogs.map((blogs) => ({
      title: blogs.title,
      href: `/blogs/${blogs.id}`,
    })),
  ];
  const servicesNavItems: NavItem[] = [
    {
      title: "All Services",
      href: `/services`,
    },
    ...services.map((services) => ({
      title: services.title,
      href: `/services/${services.id}`,
    })),
  ];

  const navigationConfig: NavigationConfig = {
    leftNav: [
      { title: "Home", href: "/" },
      { title: "Fabrics", href: "/fabrics" },
    ],
    centerDropdowns: [
      {
        href: "/services",
        title: "Services",
        items: loading
          ? servicesNavItems.length > 0
            ? servicesNavItems
            : []
          : servicesNavItems,
      },
      {
        href: "/categories",
        title: "Products",
        isProductGrid: true,
        items: loading
          ? categoryNavItems.length > 0
            ? categoryNavItems
            : []
          : categoryNavItems,
      },
      {
        href: "/blogs",
        title: "Blogs",
        items: loading
          ? blogsNavItems.length > 0
            ? blogsNavItems
            : []
          : blogsNavItems,
      },
    ],
    rightNav: [
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Calculate Price", href: "/calculate-price" },
      { title: "Request Quote", href: "/request-quote" },
    ],
    mobileNav: [
      { title: "Home", href: "/" },
      { title: "Fabrics", href: "/fabrics" },
      {
        title: "Services",
        href: "/services ",
      },
      { title: "Blogs", href: "/blogs" },
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Calculate Price", href: "/calculate-price" },
      { title: "Request Quote", href: "/request-quote" },
    ],
  };

  return (
    <Navbar
      shouldHideOnScroll
      className="transition-all duration-300 bg-black h-[8vh] "
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Badge containerStyles="xl:flex w-[160px] h-[180px] " sqr={false} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4 " justify="end">
        {navigationConfig.leftNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link className="text-white hover:text-gray-300" href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <MenuContent navigationConfig={navigationConfig} />
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4 -ml-4" justify="center">
        {navigationConfig.rightNav.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className={`text-white hover:text-gray-300 ${
                item.title === "Request Quote" ? "font-bold text-primary" : ""
              }`}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="bg-black/80 justify-center ">
        {navigationConfig.mobileNav.map((item, index) => (
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
  );
}

function MenuContent({
  navigationConfig,
}: {
  navigationConfig: NavigationConfig;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Menu setActive={setActive}>
      {navigationConfig.centerDropdowns.map((group) => (
        <MenuItem
          key={group.title}
          active={active}
          href={group.href}
          item={group.title}
          setActive={setActive}
        >
          {group.isProductGrid ? (
            <div className="text-sm grid grid-cols-2 gap-4 p-4">
              {group.items.map((item) => (
                <ProductItem
                  key={item.href}
                  description={item.description || ""}
                  href={item.href}
                  src={
                    item.image ||
                    "/placeholder.svg?height=200&width=200&query=product"
                  }
                  title={item.title}
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
