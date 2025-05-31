import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-50 to-blue-900 text-white relative overflow-hidden">
      {/* Connecting Wave */}
      <div className="absolute top-0 left-0 right-0 h-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-blue-50"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-blue-100"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 animate-fade-in">
            <div className="flex items-center mb-6">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-blue-900 font-bold text-sm">S</span>
              </div> */}
              <img
                src="/logo_transparent.png"
                alt="Logo"
                className="ml-2 h-12"
              />
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Connecting Cameroonians to the best local digital services. From
              food delivery to tech solutions - empowering our digital economy.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition-all duration-300 hover:scale-125 transform"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Popular Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Food Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Job Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Graphic Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Online Learning
                </a>
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div className="animate-fade-in delay-200">
            <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Skill Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Free Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Business Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Tech Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in delay-300">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-blue-300 group-hover:scale-110 transition-transform" />
                <span className="text-blue-100 group-hover:text-white transition-colors">
                  info@digitalcameroon.cm
                </span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-blue-300 group-hover:scale-110 transition-transform" />
                <span className="text-blue-100 group-hover:text-white transition-colors">
                  +237 123 456 789
                </span>
              </div>
              <div className="flex items-center group">
                <MapPin className="w-5 h-5 mr-3 text-blue-300 group-hover:scale-110 transition-transform" />
                <span className="text-blue-100 group-hover:text-white transition-colors">
                  Douala, Cameroon
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-medium mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 rounded-l-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-white placeholder-blue-200 transition-all"
                />
                <button className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-r-lg transition-all hover:scale-105 text-white font-medium shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-400/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-blue-100 text-sm mb-4 md:mb-0">
            <span>© 2024 Silicon. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />
            <span>in Cameroon</span>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
