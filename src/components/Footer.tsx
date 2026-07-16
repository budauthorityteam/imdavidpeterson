import React from 'react';
import { Linkedin, Twitter, Mail, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { PROFILE } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.hash = tabId;
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: '/now', label: 'Now' },
    { id: '/about', label: 'About' },
    { id: '/media', label: 'Media' },
    { id: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-zinc-900">
          
          {/* Column 1: Core branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black font-display font-black text-[10px]">
                DP
              </div>
              <span className="font-display font-bold tracking-widest uppercase text-xs text-white">
                David Peterson
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-light">
              Two decades running, scaling, and automating operations. Currently founding and building systemized AI software, automation frameworks, and digital portfolio assets.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label="David Peterson on LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label="David Peterson on X (Twitter)"
                title="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label="Email David Peterson"
                title="Email David"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 md:pl-8">
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Navigation</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)} 
                    className="hover:text-white transition-colors text-left cursor-pointer uppercase text-[10px] tracking-wider"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Credentials & Disclosures */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Professional Disclosure</h4>
            
            <div className="space-y-3">
              <div className="p-4 bg-zinc-950 rounded border border-zinc-900 flex items-start space-x-3">
                <ShieldCheck className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans font-light">
                  Licensed Real Estate Agent in Rhode Island & Massachusetts. Affiliated with premier brokerage networks.
                  <a
                    href={PROFILE.realEstate}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-white hover:underline ml-1 inline-flex items-center font-mono"
                  >
                    <span>Practice Link</span>
                    <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </p>
              </div>

              <div className="text-[9px] text-zinc-600 leading-relaxed font-mono flex items-center space-x-1 uppercase">
                <MapPin className="w-3 h-3 text-zinc-700" />
                <span>Rhode Island Hub • global operational range</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] text-zinc-600 font-mono tracking-wider uppercase gap-4">
          <div>
            © 2026 DAVID PETERSON. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span>STEALTH CONFIDENCE OPERATOR ARCHITECTURE</span>
            <button 
              onClick={() => handleNavClick('/contact')} 
              className="hover:text-white transition-colors cursor-pointer text-zinc-500 font-bold"
            >
              Get In Touch
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
