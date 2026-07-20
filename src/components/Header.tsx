import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    { id: '/media', label: 'Podcast' },
    { id: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 text-ink transition-all duration-300 border-b ${
        scrolled
          ? 'py-3 bg-paper/80 backdrop-blur-xl border-line'
          : 'py-4 bg-paper/40 backdrop-blur-md border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Signature wordmark + DP monogram */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center group text-left cursor-pointer"
        >
          <span className="script text-[28px] md:text-[32px] leading-none text-accent transition-opacity group-hover:opacity-80 pr-1 -mt-1">
            David Peterson
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-ink-soft">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-accent after:transition-all ${
                  isActive
                    ? 'text-ink after:w-full'
                    : 'hover:text-ink after:w-0 hover:after:w-full'
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
            className="btn-accent px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide cursor-pointer flex items-center gap-1.5"
          >
            <span>Work With Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-ink hover:text-accent focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] left-0 right-0 bottom-0 bg-paper text-ink border-t border-line px-6 py-8 flex flex-col justify-between z-40">
          <nav className="flex flex-col">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-5 border-b border-line flex justify-between items-center font-display text-2xl tracking-tight ${
                    isActive ? 'text-accent' : 'text-ink'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-ink-faint text-xs font-sans">0{idx + 1}</span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-6 pb-8">
            <button
              onClick={() => handleNavClick('/contact')}
              className="btn-accent w-full text-center py-4 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <span>Work With Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-ink-faint tracking-wide">
              © 2026 David Peterson
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
