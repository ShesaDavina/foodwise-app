import React from "react";

function FooterComp() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2e5b4e] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5">
            <img 
              src="/images/foodwise.png" 
              alt="FoodWise Logo" 
              className="h-12 mb-4"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Terima kasih telah mengunjungi website ini, kenal lebih dekat dengan kami
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg mb-4" style={{ fontFamily: "'Bowlby One', cursive" }}>Panduan</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition text-sm">
                  Privacy & Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
              <div>
                <h3 className="text-lg mb-4" style={{ fontFamily: "'Bowlby One', cursive" }}>Social</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white/70 hover:text-white transition text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                      </svg>
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/70 hover:text-white transition text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                      </svg>
                      Email
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/70 hover:text-white transition text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      Github
                    </a>
                  </li>
                </ul>
              </div>

              <div className="sm:self-center">
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white text-white/80 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Kembali ke atas
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center sm:text-left">
            ©2026 FoodwiseTeam. All rights reserved
          </p>
          
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy Policy
            </a>
            <span className="text-white/30">|</span>
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComp;