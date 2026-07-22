import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
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
    { id: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-paper-2 border-t border-line pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-line">
          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-paper-2 flex items-center justify-center text-ink font-display font-bold text-[12px]">
                D
              </div>
              <span className="font-display font-semibold tracking-tight text-[15px] text-ink">
                David Peterson
              </span>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed max-w-sm">
              Two decades scaling other people's companies. Now building my own portfolio of
              software and AI systems, and sharing the operator's playbook along the way.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: `mailto:${PROFILE.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full border border-line-2 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-paper-2 hover:border-ink transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 space-y-4 md:pl-8">
            <h4 className="kicker">Explore</h4>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-accent transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclosure */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="kicker">Also</h4>
            <div className="p-4 bg-paper rounded-xl border border-line text-sm text-ink-soft leading-relaxed">
              Licensed real estate agent in Rhode Island &amp; Massachusetts.
              <a
                href={PROFILE.realEstate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-deep ml-1 inline-flex items-center font-medium"
              >
                <span>See practice</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
            <div className="text-xs text-ink-faint flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rhode Island, USA · working globally</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-ink-faint gap-4">
          <div>© 2026 David Peterson. All rights reserved.</div>
          <button
            onClick={() => handleNavClick('/contact')}
            className="hover:text-accent transition-colors cursor-pointer font-medium"
          >
            Get in touch →
          </button>
        </div>
      </div>
    </footer>
  );
}
