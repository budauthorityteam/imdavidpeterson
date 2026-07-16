import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import NowView from './components/NowView';
import AboutView from './components/AboutView';
import MediaView from './components/MediaView';
import ContactView from './components/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

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
    let description = "Two decades operating and scaling businesses. Now building AI-driven systems that do the work of teams. Occasionally available for advisory.";

    switch (activeTab) {
      case 'home':
        title = "David Peterson | Operator & Builder";
        description = "Two decades operating and scaling businesses. Now building AI-driven systems that do the work of teams. Occasionally available for advisory.";
        break;
      case '/now':
        title = "Now | What David Peterson Is Working On";
        description = "The current operational focus and live status page for David Peterson. Understated, updated quarterly.";
        break;
      case '/about':
        title = "About | David Peterson";
        description = "The professional arc of David Peterson, entrepreneur, former music industry executive, and hands-on operational scaling leader.";
        break;
      case '/media':
        title = "Media | David Peterson";
        description = "Listen to episodes of Taking Back Entrepreneurship and We Tried, We Failed. Review active keynotes and publications.";
        break;
      case '/contact':
        title = "Get in Touch | David Peterson";
        description = "Audit, partner, or enquire. Direct, actively filtered inbox for operational scaling and advisory.";
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
    <div id="app-root" className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      {/* Elegant Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Primary Route Stage */}
      <main id="main-content" className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Elegant Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
      />

      {/* Floating CTA bar on Mobile */}
      {activeTab !== '/contact' && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => {
              setActiveTab('/contact');
              window.location.hash = '/contact';
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="w-full bg-white text-black py-4 rounded-lg text-xs font-mono font-bold uppercase tracking-widest shadow-2xl flex items-center justify-center space-x-2 border border-zinc-200 cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      )}
    </div>
  );
}
