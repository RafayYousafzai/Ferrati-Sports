"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import {
  Box,
  Contact,
  GitPullRequest,
  Home,
  ListFilterPlusIcon,
  UserRound,
} from "lucide-react";
import { FaServicestack } from "react-icons/fa";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

import { cn } from "@/lib/utils";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <Home className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Fabrics",
      href: "/admin/manage-fabrics",
      icon: (
        <UserRound className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Categories",
      href: "/admin/manage-categories",
      icon: (
        <Box className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Blogs",
      href: "/admin/manage-blogs",
      icon: (
        <ListFilterPlusIcon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Services",
      href: "/admin/manage-services",
      icon: (
        <FaServicestack className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // {
    //   label: "Process Steps",
    //   href: "/admin/manage-process-steps",
    //   icon: (
    //     <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    {
      label: "Request Quotes",
      href: "/admin/manage-quote-requests",
      icon: (
        <GitPullRequest className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    {
      label: "Contact Requests",
      href: "/admin/manage-requests",
      icon: (
        <Contact className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // {
    //   label: "Why Choose Us",
    //   href: "/admin/manage-why-choose-us",
    //   icon: (
    //     <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    //   ),
    // },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full h-full min-h-screen  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto fixed">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              className="fixed bottom-4"
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    alt="Avatar"
                    className="h-7 w-7 shrink-0 rounded-full"
                    height={50}
                    src="https://assets.aceternity.com/manu.png"
                    width={50}
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};
