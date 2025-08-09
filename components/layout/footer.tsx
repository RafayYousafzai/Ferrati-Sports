import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Your Company</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium fabric printing and customization services. We bring your
              designs to life with quality and precision.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>123 Business Street, City, State 12345</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@yourcompany.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/737f8537-cfce-4e4d-81c6-576453748b39"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Printing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/0874229c-9fcb-4cce-b4b4-87aa4378707f"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Sublimation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/65eb347d-5158-45be-ab28-e1c885631db5"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Embroidery
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/services/stitching"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Stitching
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/fabrics"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Fabrics
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">
              Customer Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/calculate-price"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Calculate Price
                </Link>
              </li>
              <li>
                <Link
                  href="/request-quote"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Request Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/our-process"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Our Process
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our newsletter for the latest updates and special
              offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>
                &copy; {new Date().getFullYear()} Your Company. All rights
                reserved.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
