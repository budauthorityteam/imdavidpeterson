import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import NowView from './components/NowView';
import AboutView from './components/AboutView';
import MediaView from './components/MediaView';
import ContactView from './components/ContactView';
import ShaderBackground from './components/ShaderBackground';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const lenisRef = useRef<Lenis | null>(null);

  // Momentum smooth scroll + smooth in-page anchor jumps
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      }
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Jump to top when the active view changes
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [activeTab]);

  // Sync hash changes with the active tab for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Strip out leading slash if present to look up tab cleanly
        const cleanTab = hash === '/' ? 'home' : hash;
        
        const validTabs = ['home', '/now', 'now', '/about', 'about', '/media', 'media', '/contact', 'contact'];
        if (validTabs.includes(cleanTab)) {
          // Keep internal state aligned with path structure
          if (cleanTab === 'now' || cleanTab === '/now') {
            setActiveTab('/now');
          } else if (cleanTab === 'about' || cleanTab === '/about') {
            setActiveTab('/about');
          } else if (cleanTab === 'media' || cleanTab === '/media') {
            setActiveTab('/media');
          } else if (cleanTab === 'contact' || cleanTab === '/contact') {
            setActiveTab('/contact');
          } else {
            setActiveTab('home');
          }
        } else {
          setActiveTab('home');
        }
      } else {
        setActiveTab('home');
      }
    };

    // Initialize on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic SEO page metadata & Schema injection
  useEffect(() => {
    let title = "David Peterson | Operator & Builder";
    let description = "I scaled other people's companies to $30M+. Now I build my own, and I share exactly how. Systems, growth, and applied AI for operators who'd rather build than talk.";

    switch (activeTab) {
      case 'home':
        title = "David Peterson | Operator & Builder";
        description = "I scaled other people's companies to $30M+. Now I build my own, and I share exactly how. Systems, growth, and applied AI for operators who'd rather build than talk.";
        break;
      case '/now':
        title = "Now | What David Peterson Is Building";
        description = "A quarterly, no-spin snapshot of what David Peterson is actually working on right now: the systems, the software, and the operating focus.";
        break;
      case '/about':
        title = "About | David Peterson";
        description = "From a 350-person music operation to $30M+ ARR turnarounds to building AI systems that replace headcount. The full operator's arc, told straight.";
        break;
      case '/media':
        title = "Podcasts & Speaking | David Peterson";
        description = "Taking Back Entrepreneurship and We Tried, We Failed. Raw, survivor-bias-free conversations on building. Plus keynotes, workshops, and press.";
        break;
      case '/contact':
        title = "Work With David Peterson";
        description = "Advisory, speaking, partnerships, or a straight answer to a hard question. Tell me what you're building and I'll tell you the truth.";
        break;
    }

    // Set page title
    document.title = title;

    // Keep name/property meta tags in sync as the active view changes, so that
    // deep-linked hash URLs shared by JS-capable scrapers unfurl with the right copy.
    // (Canonical entity structured data lives statically in index.html.)
    const upsertMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const url = `${window.location.origin}/${activeTab === 'home' ? '' : `#${activeTab}`}`;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} />;
      case '/now':
        return <NowView setActiveTab={setActiveTab} />;
      case '/about':
        return <AboutView setActiveTab={setActiveTab} />;
      case '/media':
        return <MediaView setActiveTab={setActiveTab} />;
      case '/contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div id="app-root" className="relative min-h-screen flex flex-col bg-paper text-ink overflow-x-clip">
      {/* Intro preloader + bespoke cursor */}
      <Preloader />
      <Cursor />

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[60]"
      />

      {/* Living shader field + warm paper texture */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ShaderBackground />
        <div className="paper-grain" />
      </div>

      {/* Elegant Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Primary Route Stage */}
      <main id="main-content" className="relative z-10 flex-grow">
        {renderActiveView()}
      </main>

      {/* Elegant Footer */}
      <div className="relative z-10">
        <Footer
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Floating CTA bar on Mobile */}
      {activeTab !== '/contact' && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => {
              setActiveTab('/contact');
              window.location.hash = '/contact';
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="btn-accent w-full py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Work With Me</span>
          </button>
        </div>
      )}
    </div>
  );
}
