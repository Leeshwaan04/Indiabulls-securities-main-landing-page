import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Zap } from 'lucide-react';

const PremiumChart = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        // Generate organic trading points
        const newPoints = Array.from({ length: 40 }).map((_, i) => ({
            x: i * 10,
            y: 100 + Math.sin(i * 0.5) * 50 + Math.random() * 30,
        }));
        setPoints(newPoints);
    }, []);

    const pathData = points.length > 0
        ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
        : "";

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    border: '1px solid var(--glass-border)',
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '2rem'
                }}
            >
                {/* Real-time scanning laser */}
                <motion.div
                    animate={{ x: ['-10%', '110%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(to bottom, transparent, #00AB4E, transparent)',
                        boxShadow: '0 0 15px #00AB4E',
                        zIndex: 5
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Real-time Feed</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>IBULLS / NIFTY 50</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#00AB4E', fontSize: '1.25rem', fontWeight: 'bold' }}>+12.4%</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Last 24h</div>
                    </div>
                </div>

                {/* SVG Chart Line */}
                <svg viewBox="0 0 400 200" style={{ width: '100%', height: '150px', overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00AB4E" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#00AB4E" stopOpacity="1" />
                            <stop offset="100%" stopColor="#4285F4" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    {/* Glowing dot at the end */}
                    {points.length > 0 && (
                        <motion.circle
                            cx={points[points.length - 1].x}
                            cy={points[points.length - 1].y}
                            r="4"
                            fill="#4285F4"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </svg>

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                        { label: 'Volatility', val: 'Low', icon: <Zap size={14} /> },
                        { label: 'Momentum', val: 'High', icon: <TrendingUp size={14} /> },
                        { label: 'Efficiency', val: '99.9%', icon: <Activity size={14} /> }
                    ].map((s, i) => (
                        <div key={i} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(252,255,255,0.05)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                {s.icon} {s.label}
                            </div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.8rem' }}>{s.val}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PremiumChart;
