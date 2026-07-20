import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NowViewProps {
  setActiveTab: (tab: string) => void;
}

const FOCUS = [
  {
    n: '01',
    label: 'Software architecture',
    body: "Architecting private, generative agent microservices that run customer-lifecycle and marketing automation end to end. Systematically stripping out operational bloat and replacing headcount with system design.",
  },
  {
    n: '02',
    label: 'Operations & services',
    body: 'Running organic growth and search-visibility infrastructure through BudAuthority, my digital marketing and SEO platform, for a set of select enterprise retainers.',
  },
  {
    n: '03',
    label: 'Audio & media',
    body: 'Recording weekly long-form conversations for Taking Back Entrepreneurship and We Tried, We Failed. The raw, survivor-bias-free version of operator reality.',
  },
  {
    n: '04',
    label: 'Real estate advisory',
    body: 'Holding active brokerage licensing in Rhode Island and Massachusetts, advising on off-market commercial deals and localized search targeting for physical assets.',
  },
  {
    n: '05',
    label: 'Systems engineering',
    body: 'Putting twenty years of operations into code instead of org charts: model chaining, context-window management, and automated workflow triggers.',
  },
];

export default function NowView({ setActiveTab }: NowViewProps) {
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-6 pt-32 pb-28 md:pt-44"
    >
      <motion.div variants={item} className="space-y-4 mb-12">
        <div className="flex items-center gap-2.5 text-ink-soft text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
          <span className="font-medium">Currently in Rhode Island, USA</span>
        </div>
        <h1 id="now-title" className="font-display font-bold text-ink text-5xl md:text-7xl tracking-tight">
          Now
        </h1>
        <p className="text-ink-faint text-sm">Last updated July 15, 2026 · refreshed quarterly</p>
      </motion.div>

      <motion.div variants={item} className="border-t border-line pt-10">
        <p className="text-ink text-xl md:text-2xl leading-relaxed font-light">
          A quarterly, no-spin snapshot of what I'm actually working on. Inspired by the{' '}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium link-underline"
          >
            /now page
          </a>{' '}
          movement.
        </p>
      </motion.div>

      <div className="mt-12 space-y-10">
        {FOCUS.map((f) => (
          <motion.div
            key={f.n}
            variants={item}
            className="group grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-start"
          >
            <span className="font-display font-bold text-3xl md:text-4xl text-line-2 group-hover:text-accent transition-colors tracking-tight">
              {f.n}
            </span>
            <div className="space-y-2 border-b border-line pb-8">
              <h2 className="font-display font-semibold text-xl md:text-2xl text-ink tracking-tight">
                {f.label}
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={item}
        className="mt-14 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <p className="text-ink-soft text-lg">Aligned on any of these? Let's compare notes.</p>
        <button
          onClick={() => handleNavClick('/contact')}
          className="btn-accent inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide group cursor-pointer"
        >
          <span>Get in touch</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
