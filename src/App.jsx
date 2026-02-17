import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  Smartphone,
  CheckCircle2,
  Menu,
  X,
  Shield,
  Zap,
  Layers,
  Activity,
  ChevronRight,
  TrendingUp,
  PieChart,
  Briefcase,
  Monitor,
  Moon,
  Sun,
  Search,
  Settings,
  HelpCircle,
  Bell,
  Cpu,
  Globe,
  Lock,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';

// --- Improved Components ---
import SignUpFlow from './components/SignUpFlow';
import BrokerageCalculator from './components/BrokerageCalculator';
import ProChart from './components/ProChart';
import AnimatedBull from './components/AnimatedBull';
import PremiumChart from './components/PremiumChart';

// --- Motion Component: Interactive Mouse Glow ---
const MouseGlow = ({ theme }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(0, 171, 78, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
          : 'radial-gradient(circle, rgba(0, 171, 78, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        x: useSpring(mouseX, { damping: 50, stiffness: 200 }),
        y: useSpring(mouseY, { damping: 50, stiffness: 200 }),
        translateX: '-50%',
        translateY: '-50%'
      }}
    />
  );
};

// --- Motion Component: Floating Elements ---
const FloatingElement = ({ children, delay = 0, duration = 5, xRange = 20, yRange = 20 }) => (
  <motion.div
    animate={{
      y: [0, yRange, 0],
      x: [0, xRange, 0],
      rotate: [0, 5, 0]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

// --- Motion Graphics: Nebula Background ---
const NebulaBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    const dots = Array.from({ length: theme === 'dark' ? 120 : 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      opacity: Math.random(),
      speed: (Math.random() - 0.5) * 0.2,
      color: theme === 'dark'
        ? ["#00AB4E", "#4285F4", "#A142F4", "#ffffff"][Math.floor(Math.random() * 4)]
        : "#00AB4E"
    }));
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.y += dot.speed;
        if (dot.y > canvas.height) dot.y = 0;
        if (dot.y < 0) dot.y = canvas.height;

        dot.opacity += (Math.random() - 0.5) * 0.02;
        dot.opacity = Math.max(0.1, Math.min(0.6, dot.opacity));

        ctx.fillStyle = theme === 'dark'
          ? dot.color + Math.floor(dot.opacity * 255).toString(16).padStart(2, '0')
          : `rgba(0, 171, 78, ${dot.opacity * 0.15})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow to some dots
        if (dot.size > 1.5 && theme === 'dark') {
          ctx.shadowBlur = 10;
          ctx.shadowColor = dot.color;
        } else {
          ctx.shadowBlur = 0;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -2, width: '100vw', height: '100vh', background: 'var(--bg-main)', overflow: 'hidden', transition: 'background 0.5s ease' }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: theme === 'dark'
          ? 'radial-gradient(circle at 20% 30%, rgba(66, 133, 244, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(161, 66, 244, 0.08) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(0, 171, 78, 0.05) 0%, rgba(5, 7, 9, 1) 100%)'
          : 'radial-gradient(circle at 50% 50%, rgba(66, 133, 244, 0.03) 0%, #f1f5f9 100%)'
      }} />
      <canvas ref={canvasRef} style={{ opacity: theme === 'dark' ? 0.3 : 0.6 }} />
    </div>
  );
};

// --- Motion Graphic: Perspective Cyber Grid ---
const CyberGrid = ({ theme }) => (
  <div style={{
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    right: '-10%',
    height: '600px',
    background: theme === 'dark'
      ? 'linear-gradient(to top, rgba(0, 171, 78, 0.1) 0%, transparent 80%)'
      : 'linear-gradient(to top, rgba(0, 171, 78, 0.03) 0%, transparent 80%)',
    transform: 'perspective(1000px) rotateX(60deg)',
    zIndex: -1,
    overflow: 'hidden'
  }}>
    <div style={{
      width: '200%',
      height: '200%',
      backgroundSize: '40px 40px',
      backgroundImage: theme === 'dark'
        ? `linear-gradient(to right, rgba(0, 171, 78, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 171, 78, 0.1) 1px, transparent 1px)`
        : `linear-gradient(to right, rgba(0, 171, 78, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 171, 78, 0.05) 1px, transparent 1px)`,
      transform: 'translateX(-25%) translateY(-25%)',
    }}>
      <motion.div
        animate={{ y: [0, 40] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  </div>
);

// --- Motion Graphic: Scanning Laser Effect ---
const ScanningGlow = () => (
  <motion.div
    animate={{ y: ['0%', '1000%'] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(0, 171, 78, 0.5), transparent)',
      boxShadow: '0 0 15px rgba(0, 171, 78, 0.3)',
      zIndex: 10,
      pointerEvents: 'none'
    }}
  />
);

// --- Motion Component: Scroll Reveal Wrapper ---
const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }}
  >
    {children}
  </motion.div>
);
// --- Branding: Official Logo ---
const Logo = ({ theme }) => (
  <img
    src={theme === 'dark' ? "https://indiabullssecurities.com/images/ib_logo_darkbg.svg" : "https://image.ibullssecurities.com/brand-sm.svg"}
    alt="Indiabulls Securities"
    style={{ height: '32px', width: 'auto' }}
  />
);

// --- Motion Graphic: Stats Counter ---
const StatsCounter = ({ value, label, prefix = "", suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [value]);

  useEffect(() => {
    return rounded.onChange(v => setDisplayValue(v));
  }, [rounded]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#00AB4E', marginBottom: '0.5rem', letterSpacing: '-2px' }}>
        {prefix}{displayValue}{suffix}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</div>
    </div>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [signUpOpen, setSignUpOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`app-container ${mobileMenuOpen ? 'mobile-menu-active' : ''}`} style={{ color: 'var(--text-primary)' }}>
      <NebulaBackground theme={theme} />
      <MouseGlow theme={theme} />

      {/* Sign Up Flow Modal */}
      <SignUpFlow isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />

      {/* Top Alert Marquee */}
      <div style={{ background: 'rgba(0,171,78,0.9)', backdropFilter: 'blur(5px)', color: 'white', padding: '0.6rem 0', fontSize: '0.75rem', overflow: 'hidden', whiteSpace: 'nowrap', position: 'fixed', width: '100%', top: 0, zIndex: 2000, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="marquee" style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 50s linear infinite' }}>
          KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary. | Attention Investors: 1. Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 01, 2020. | Account Helpline: 022-61446300
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
        .nav-link { color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 600; transition: all 0.3s; position: relative; padding: 0.5rem 0; }
        .nav-link:hover { color: #00AB4E; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #00AB4E; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        
        .premium-glass { 
          background: var(--glass-bg); 
          backdrop-filter: blur(20px); 
          border: 1px solid var(--glass-border); 
          border-radius: 32px; 
          padding: 3rem;
          box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-glass:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px 0 rgba(0, 171, 78, 0.1);
        }
        
        .hero-title {
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 0.95;
          letter-spacing: -3px;
          margin-bottom: 2rem;
        }

        .btn-modern {
          position: relative;
          padding: 1.2rem 3rem;
          border-radius: 99px;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          z-index: 1;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
        }
        .btn-modern.primary { 
          background: #121317; 
          color: white; 
          border: 1px solid rgba(255,255,255,0.1); 
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .btn-modern.primary:hover { 
          background: #000000;
          border-color: #00AB4E;
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 171, 78, 0.2); 
        }
        .btn-modern.outline { 
          background: rgba(255,255,255,0.02); 
          color: var(--text-primary); 
          border: 1px solid var(--glass-border); 
          backdrop-filter: blur(10px); 
        }
        .btn-modern.outline:hover { 
          border-color: rgba(255,255,255,0.4); 
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: '2.8rem', width: '100%', zIndex: 1000, padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1.5rem', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderRadius: '99px', border: '1px solid var(--glass-border)' }}>
          <Logo theme={theme} />
          <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Home', 'Invest', 'Trade', 'Calculator', 'Blogs', 'Support'].map(item => (
              <a key={item} href="#" className="nav-link">{item}</a>
            ))}
            <button
              onClick={toggleTheme}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn-modern outline desktop-only" style={{ padding: '0.6rem 1.5rem', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>Sign In</button>
            <button onClick={() => setSignUpOpen(true)} className="btn-modern primary" style={{ padding: '0.6rem 1.5rem' }}>Open Account</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Enhanced Hero Section */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '10rem' }}>
          <CyberGrid theme={theme} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <ScrollReveal>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,171,78,0.1)', color: '#00AB4E', padding: '0.5rem 1.2rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '2rem', border: '1px solid rgba(0,171,78,0.3)' }}>
                    <Zap size={14} fill="#00AB4E" /> Verbatim Financial Accuracy
                  </div>
                  <h1 className="hero-title" style={{ fontSize: '6rem' }}>
                    Redefining <br />the <span style={{ color: '#00AB4E' }}>Way You Trade</span>
                  </h1>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '580px', marginTop: '2.5rem', marginBottom: '4rem', lineHeight: 1.7, fontWeight: 400 }}>
                    Experience financial liftoff with ₹11 per executed order*. Access seamless multi-platform trading, anytime, anywhere.
                  </p>
                </ScrollReveal>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setSignUpOpen(true)} className="btn-modern primary">Open Account <ArrowRight size={20} /></button>
                  <button className="btn-modern outline" style={{ border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>Download App</button>
                </div>
              </motion.div>

              <div className="desktop-only" style={{ position: 'relative' }}>
                <FloatingElement yRange={30}>
                  {theme === 'dark' ? (
                    <AnimatedBull theme={theme} />
                  ) : (
                    <div className="premium-glass" style={{ minHeight: '400px', display: 'flex', alignItems: 'center' }}>
                      <PremiumChart />
                    </div>
                  )}
                </FloatingElement>

                <div style={{ position: 'absolute', top: '-10%', right: '-10%', zIndex: -1 }}>
                  <FloatingElement delay={1} duration={6} xRange={30}>
                    <div style={{ width: '150px', height: '150px', background: 'rgba(0,171,78,0.1)', borderRadius: '50%', filter: 'blur(30px)' }} />
                  </FloatingElement>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Improved Offerings Grid */}
        <section className="container" style={{ padding: '8rem 0' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>Explore Our <span style={{ color: '#00AB4E' }}>Key Offerings</span></h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', marginBottom: '5rem' }}>Multiple market opportunities in one platform</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Stocks - Equity', desc: 'Invest in your favorite stocks with real-time insights.', icon: <TrendingUp size={32} /> },
              { title: 'Mutual Funds', desc: 'A smart and hassle-free way to secure your wealth.', icon: <PieChart size={32} /> },
              { title: 'Smart Basket', desc: 'Ready-made stock portfolios built for potential.', icon: <Briefcase size={32} /> },
              { title: 'Stock SIP', desc: 'Build your financial future systematically.', icon: <Layers size={32} /> },
              { title: 'IPO', desc: 'Get early access to tomorrow\'s market leaders.', icon: <Activity size={32} /> },
              { title: 'MTF (Margin Trading Funding)', desc: 'Trade bigger, own more shares, and pay less.', icon: <Shield size={32} /> }
            ].map((item, i) => (
              <ScrollReveal delay={i * 0.1} key={i}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="premium-glass"
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', position: 'relative', overflow: 'hidden' }}
                >
                  <ScanningGlow />
                  <div style={{ color: '#00AB4E', background: 'rgba(0,171,78,0.1)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00AB4E', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Learn More <ChevronRight size={16} />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Interactive Pricing Section */}
        <section style={{ position: 'relative', padding: '10rem 0', background: 'rgba(0,171,78,0.02)' }}>
          <div className="container">
            <ScrollReveal>
              <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '5rem' }}>Transparent <span style={{ color: '#00AB4E' }}>Pricing & Savings</span></h2>
            </ScrollReveal>
            <BrokerageCalculator />

            <div style={{ marginTop: '8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
              <ScrollReveal delay={0.1}><StatsCounter value={11} label="Brokerage Per Order" prefix="₹" /></ScrollReveal>
              <ScrollReveal delay={0.2}><StatsCounter value={100} label="Zero Account Opening" suffix="%" /></ScrollReveal>
              <ScrollReveal delay={0.3}><StatsCounter value={24} label="Hour Trading Access" suffix="/7" /></ScrollReveal>
              <ScrollReveal delay={0.4}><StatsCounter value={0} label="Maintenance Charges" prefix="₹" /></ScrollReveal>
            </div>
          </div>
        </section>

        {/* Verbatim Expert Guidance */}
        <section className="container" style={{ padding: '10rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
            <div className="desktop-only">
              <div className="premium-glass" style={{ position: 'relative' }}>
                <Monitor size={48} color="#00AB4E" style={{ marginBottom: '2rem' }} />
                <h3>Omnichannel Support</h3>
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${60 + (i * 10)}%` }} transition={{ duration: 1, delay: i * 0.2 }} style={{ height: '100%', background: '#00AB4E' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Expert Guidance for Confident Investments</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Need support with your investments? Our Assisted Brokerage Model pairs you with a Relationship Manager for personalized guidance.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {['Access to market updates and insights.', 'Guidance aligned to your investment goals.', 'One-on-one support during market hours.'].map(li => (
                  <div key={li} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: '#00AB4E', borderRadius: '50%', padding: '4px' }}><CheckCircle2 size={16} color="white" /></div>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{li}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modernized Verbatim Footer */}
      <footer style={{ padding: '8rem 2rem', background: 'black', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '5rem', marginBottom: '6rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Logo theme={theme} />
            <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '450px' }}>
              Indiabulls Securities Limited (Formerly known as Dhani Stocks Limited) <br />
              [Corporate Identification Number for ISL: U74999DL2003PLC122874]
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <a href="https://indiabullssecurities.com/home/Investor-Risk-Reduction-Access-(IRRA).pdf" target="_blank" rel="noreferrer" className="nav-link">Investor Risk Reduction Access (IRRA)</a>
              <a href="https://www.icclindia.com/DynamicPages/UCCDetails.aspx" target="_blank" rel="noreferrer" className="nav-link">Client Collateral - Segregation</a>
              <a href="https://indiabullssecurities.com/grievance-redressal/feedback-and-suggestions" target="_blank" rel="noreferrer" className="nav-link">Feedback and Suggestions</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Connectivity</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={16} color="#00AB4E" /> 022-61446300
              </div>
              <a href="mailto:helpdesk@indiabulls.com" className="nav-link">helpdesk@indiabulls.com</a>
              <a href="https://indiabullssecurities.com/home/Investor_Grievance_Redressal_Mechanism.pdf" target="_blank" rel="noreferrer" className="nav-link">Investor Grievance Redressal</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>© {new Date().getFullYear()} Indiabulls Securities Limited. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            SEBI Registration Number: INZ000036136 | Depository Participant: IN-DP-423-2019 | Registered Office: A-2, First Floor, Kirti Nagar, New Delhi - 110015.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
