import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaChevronRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebookF size={15} />,
      href: "https://www.facebook.com/northsouthgroupbd",
      label: "Facebook",
      hoverColor: "hover:bg-blue-600 hover:border-blue-600",
    },
    {
      icon: <FaXTwitter size={15} />,
      href: "https://x.com/nsgroupbd",
      label: "Twitter / X",
      hoverColor: "hover:bg-slate-600 hover:border-slate-600",
    },
    {
      icon: <FaLinkedinIn size={15} />,
      href: "https://www.linkedin.com/in/northsouthgroupbd/",
      label: "LinkedIn",
      hoverColor: "hover:bg-blue-700 hover:border-blue-700",
    },
    {
      icon: <FaInstagram size={15} />,
      href: "https://www.instagram.com",
      label: "Instagram",
      hoverColor: "hover:bg-pink-600 hover:border-pink-600",
    },
    {
      icon: <FaYoutube size={15} />,
      href: "https://www.youtube.com/channel/UCXFv3Z_4RYqThJIYSU8o85A",
      label: "YouTube",
      hoverColor: "hover:bg-red-600 hover:border-red-600",
    },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/aboutUs" },
    { label: "Projects", to: "/projects" },
    { label: "Real Estate", to: "/realEstate" },
    { label: "Land Wanted", to: "/landWanted" },
    { label: "News & Events", to: "/newsEvent" },
    { label: "Career", to: "/career" },
    { label: "Privacy Policy", to: "/privacyPolicy" },
  ];

  const concerns = [
    { label: "North South Consortium Ltd", to: "/northSouthConsortiumLtd" },
    { label: "Northsouth Green City Ltd", to: "/greenCity" },
    { label: "Northsouth Industrial City", to: "/industrialCity" },
    { label: "Northsouth Square City", to: "/squareCity" },
    { label: "Purbachal Nirapad Valley", to: "/purbachalNirapadValley" },
    { label: "Northsouth Farms Ltd", to: "/northsouthFarmsLtd" },
    { label: "Northsouth Garments", to: "/northsouthGarments" },
    { label: "Northsouth Tours & Travels", to: "/northsouthToursTravels" },
    { label: "Northsouth Foundation", to: "/northsouthFoundation" },
    { label: "Northsouth Butterfly", to: "/northsouthButterfly" },
  ];

  return (
    <footer
      className="text-white"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #040811 100%)" }}
    >
      {/* ─── TOP ACCENT BAR ─── */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #0a2a66 0%, #0f7771 50%, #0a2a66 100%)",
        }}
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── COLUMN 1 : Brand ── */}
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img src={logo} alt="North South Group" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              A pioneering housing &amp; real estate company in Bangladesh,
              dedicated to transforming lives through exceptional living spaces
              since 2019.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 text-gray-300 transition-all duration-300 hover:text-white hover:scale-110 ${item.hoverColor}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── COLUMN 2 : Quick Links ── */}
          <div>
            <h3
              className="text-base font-bold uppercase tracking-widest mb-6 pb-3 border-b"
              style={{ color: "#0f7771", borderColor: "#0f7771" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-400 text-sm transition-colors duration-200 hover:text-white group"
                  >
                    <FaChevronRight
                      size={10}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#0f7771" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 3 : Our Concern ── */}
          <div>
            <h3
              className="text-base font-bold uppercase tracking-widest mb-6 pb-3 border-b"
              style={{ color: "#0f7771", borderColor: "#0f7771" }}
            >
              Our Concern
            </h3>
            <ul className="flex flex-col gap-3">
              {concerns.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-gray-400 text-sm transition-colors duration-200 hover:text-white group"
                  >
                    <FaChevronRight
                      size={10}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#0f7771" }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 4 : Contact Info ── */}
          <div>
            <h3
              className="text-base font-bold uppercase tracking-widest mb-6 pb-3 border-b"
              style={{ color: "#0f7771", borderColor: "#0f7771" }}
            >
              Contact Us
            </h3>
            <ul className="flex flex-col gap-5 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="mt-1 shrink-0"
                  style={{ color: "#0f7771" }}
                />
                <div>
                  <p className="text-white font-semibold mb-0.5">Corporate Office</p>
                  16 Tower Hamlet, Level-07, 08 &amp; 11th,<br />
                  Kamal Ataturk Avenue, Banani,<br />
                  Dhaka-1213, Bangladesh
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="mt-1 shrink-0"
                  style={{ color: "#0f7771" }}
                />
                <div>
                  <p className="text-white font-semibold mb-0.5">Dubai Office</p>
                  House-47, Street-12, Hamriya Deira,<br />
                  Dubai — POBox: 83129
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt
                  className="mt-1 shrink-0"
                  style={{ color: "#0f7771" }}
                />
                <div>
                  <a href="tel:+88028822274792" className="hover:text-white transition-colors">+88 02222 274792</a><br />
                  <a href="tel:+8801894801923" className="hover:text-white transition-colors">+88 01894 801923</a><br />
                  <a href="tel:+8809642801925" className="hover:text-white transition-colors">+88 09642 801925</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope
                  className="mt-1 shrink-0"
                  style={{ color: "#0f7771" }}
                />
                <div>
                  <a href="mailto:northsouthgroupbd@gmail.com" className="hover:text-white transition-colors block">northsouthgroupbd@gmail.com</a>
                  <a href="mailto:info@northsouthgroup.com" className="hover:text-white transition-colors block">info@northsouthgroup.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaGlobe
                  className="mt-1 shrink-0"
                  style={{ color: "#0f7771" }}
                />
                <div>
                  <a href="https://www.northsouthgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">www.northsouthgroup.com</a>
                  <a href="https://www.northsouthgroupbd.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">www.northsouthgroupbd.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-800" />
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
        <p>
          © {currentYear}{" "}
          <Link to="/" className="font-semibold hover:text-white transition-colors" style={{ color: "#0f7771" }}>
            North South Group
          </Link>
          . All Rights Reserved.
        </p>
        <p>
          Designed &amp; Developed with{" "}
          <span style={{ color: "#0f7771" }}>♥</span>{" "}
          by{" "}
          <span className="font-semibold text-gray-400">NS Tech Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

