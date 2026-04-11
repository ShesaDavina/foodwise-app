import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavComp() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Beranda", id: "hero" },
    { name: "Tentang", id: "about" },
    { name: "Alasan", id: "reasons" },
    { name: "Panduan", id: "guidelines" },
  ];

  return (
    <nav className="bg-[#2F5D56] px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/foodwise.png" alt="Logo" className="h-10 object-contain" />
        </div>
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-white font-bold text-sm hover:text-[#F59E0B] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/login" className="text-white font-bold text-sm hover:text-[#F59E0B]">Sign In</Link>
          <Link to="/signup" className="bg-[#F59E0B] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md">Sign Up</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#2F5D56] absolute left-0 right-0 shadow-xl border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-white font-bold text-lg hover:text-[#F59E0B] border-b border-white/5 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-white text-center font-bold py-2">Sign In</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-[#F59E0B] text-white text-center py-2 rounded-full font-bold">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}