import Link from "next/link";
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const stats = [
  {
    icon: Award,
    bg: "bg-blue-500/20",
    color: "text-blue-400",
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: Users,
    bg: "bg-green-500/20",
    color: "text-green-400",
    value: "5000+",
    label: "Happy Customers",
  },
  {
    icon: Zap,
    bg: "bg-purple-500/20",
    color: "text-purple-400",
    value: "24/7",
    label: "Support Available",
  },
  {
    icon: Clock,
    bg: "bg-orange-500/20",
    color: "text-orange-400",
    value: "48hr",
    label: "Quick Delivery",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/fabrics", label: "Fabrics" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/calculate-price", label: "Calculate Price" },
  { href: "/request-quote", label: "Request Quote" },
];

const supportLinks = [
  { href: "/calculate-price", label: "Calculate Price" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/about", label: "Return Policy" },
  { href: "/about", label: "Our Process" },
  { href: "/about", label: "FAQ" },
  { href: "/contact", label: "Help Center" },
];

const Footer = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("categories")
    .select("title,id")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const { data: blogsData, error: blogsError } = await supabase
    .from("blogs")
    .select("title,id")
    .order("created_at", { ascending: false })
    .limit(6);

  if (blogsError) throw blogsError;

  const { data: servicesData, error: servicesError } = await supabase
    .from("services")
    .select("title,id")
    .order("created_at", { ascending: false });

  if (servicesError) throw servicesError;

  return (
    <footer className="bg-gradient-to-br from-[#042e59] via-[#0a3d6b] to-[#042e59] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-6 py-20">
        {/* <div className="sm:col-span-2 md:grid-cols-2 lg:grid-cols-6  md:col-span-2 space-y-4 sm:space-y-6"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className=" lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6 relative">
                Ferrati Sports
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-400 rounded-full"></div>
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                Premium fabric printing and customization services. We bring
                your designs to life with quality, precision, and unmatched
                craftsmanship. Your vision, our expertise.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Contact Information
              </h4>
              <div className="space-y-3">
                {[
                  {
                    icon: Phone,
                    value: "+92 332 85 74 009",
                    sub: "Call us anytime",
                  },
                  {
                    icon: Mail,
                    value: "info@ferratisports.com",
                    sub: "Get quick response",
                  },
                  {
                    icon: MapPin,
                    value: "Pakistan",
                    sub: "Serving worldwide",
                  },
                ].map(({ icon: Icon, value, sub }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-sm text-gray-400">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-green-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {servicesData?.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></div>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Categories
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {data?.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform"></div>
                    {category.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-red-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {supportLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full group-hover:scale-125 transition-transform"></div>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blogs */}
          <div className="space-y-6 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Recent Blogs
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-cyan-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {blogsData?.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 group w-full  "
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-125 transition-transform" />
                    <span className="line-clamp-2 text-sm  ">{blog.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blogs"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Read All Blogs →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-center lg:text-left">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Ferrati Sports. All rights
                reserved.
              </p>
              <p className="text-xs mt-1">
                Crafted with ❤️ for premium fabric printing solutions
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex gap-3">
                <Link
                  href="https://www.instagram.com/ferratisports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </Link>
                <Link
                  href="mailto:info@ferratisports.com"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                >
                  <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
