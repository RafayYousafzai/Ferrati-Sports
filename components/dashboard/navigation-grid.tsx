import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import {
  Package,
  ShoppingBag,
  FileText,
  MessageSquare,
  Palette,
  Quote,
  Info,
  Wrench,
} from "lucide-react";

interface NavigationGridProps {
  stats: {
    products: number;
    categories: number;
    blogs: number;
    services: number;
    fabrics: number;
    contactRequests: number;
    requestedQuotes: number;
    abouts: number;
  } | null;
  loading: boolean;
}

const navigationItems = [
  {
    title: "Products",
    description: "Manage your product catalog",
    icon: Package,
    key: "products" as const,
    href: "/admin/manage-categories", // no equivalent in links, keeping original
    color: "bg-blue-500",
  },
  {
    title: "Categories",
    description: "Organize product categories",
    icon: ShoppingBag,
    key: "categories" as const,
    href: "/admin/manage-categories",
    color: "bg-green-500",
  },
  {
    title: "Blogs",
    description: "Content management",
    icon: FileText,
    key: "blogs" as const,
    href: "/admin/manage-blogs",
    color: "bg-purple-500",
  },
  {
    title: "Services",
    description: "Service offerings",
    icon: Wrench,
    key: "services" as const,
    href: "/admin/manage-services",
    color: "bg-orange-500",
  },
  {
    title: "Fabrics",
    description: "Fabric collections",
    icon: Palette,
    key: "fabrics" as const,
    href: "/admin/manage-fabrics",
    color: "bg-pink-500",
  },
  {
    title: "Contact Requests",
    description: "Customer inquiries",
    icon: MessageSquare,
    key: "contactRequests" as const,
    href: "/admin/manage-requests",
    color: "bg-red-500",
  },
  {
    title: "Quote Requests",
    description: "Pending quotations",
    icon: Quote,
    key: "requestedQuotes" as const,
    href: "/admin/manage-quote-requests",
    color: "bg-yellow-500",
  },
  {
    title: "About Pages",
    description: "Company information",
    icon: Info,
    key: "abouts" as const,
    href: "/admin/about", // no equivalent in links, keeping original
    color: "bg-indigo-500",
  },
];

export function NavigationGrid({ stats, loading }: NavigationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {navigationItems.map((item, index) => (
        <Card
          key={item.title}
          isHoverable
          as="a"
          className="py-4 hover:shadow-lg transition-shadow duration-300"
          href={item.href}
          shadow="sm"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="flex items-center justify-between w-full mb-4">
              <div className={`p-3 rounded-lg ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <Chip color="default" size="sm" variant="flat">
                  {stats ? stats[item.key].toLocaleString() : "N/A"}
                </Chip>
              )}
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 px-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
