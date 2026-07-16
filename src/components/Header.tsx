import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.hash = id;
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: '/now', label: 'Now' },
    { id: '/about', label: 'About' },
    { id: '/media', label: 'Media' },
    { id: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-zinc-900/60 px-6 py-4 md:px-12">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-2.5 group text-left cursor-pointer"
        >
          <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-black font-display font-black text-xs tracking-tighter transition-all">
            DP
          </div>
          <span className="font-display font-medium tracking-widest uppercase text-xs text-white group-hover:text-zinc-300 transition-colors">
            David Peterson
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer hover:text-white transition-all py-1 relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#10B981] after:transition-all ${
                  isActive ? 'text-white font-bold after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('/contact')}
            className="border border-zinc-800 bg-zinc-950 hover:border-white text-white px-4 py-2 rounded text-[11px] font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[61px] left-0 right-0 bottom-0 bg-[#0A0A0A] border-t border-zinc-900 px-6 py-8 flex flex-col justify-between z-40">
          <nav className="flex flex-col space-y-3 text-sm font-mono uppercase tracking-wider text-zinc-400">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-3 border-b border-zinc-900/60 flex justify-between items-center ${
                    isActive ? 'text-white font-bold pl-2 border-l border-l-white border-b-transparent' : ''
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-zinc-600 text-[10px]">/ 0{idx + 1}</span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-6 pb-8">
            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full text-center bg-white text-black py-3.5 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-1.5 rounded"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-center text-[9px] text-zinc-600 tracking-wider uppercase font-mono">
              © 2026 David Peterson
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
