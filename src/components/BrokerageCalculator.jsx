import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const BrokerageCalculator = () => {
    const [turnover, setTurnover] = useState(100000);
    const [orders, setOrders] = useState(10);
    const FLAT_FEE = 11;
    const STT = 0.001; // 0.1% delivery

    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(val);
    };

    const results = useMemo(() => {
        const brokerage = orders * FLAT_FEE;
        const taxes = turnover * STT;
        const total = brokerage + taxes;
        const traditionalBrokerage = turnover * 0.003;
        const savings = Math.max(0, traditionalBrokerage - brokerage);

        return {
            brokerage: formatINR(brokerage),
            taxes: formatINR(taxes),
            total: formatINR(total),
            savings: formatINR(savings)
        };
    }, [turnover, orders]);

    return (
        <div className="glass" style={{ padding: '2rem', borderRadius: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Calculator color="var(--accent-green)" size={28} />
                <h2 style={{ fontSize: '2rem', letterSpacing: '-1px' }}>Profit Optimizer</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Daily Turnover (₹)
                        </label>
                        <input
                            type="range" min="1000" max="10000000" step="10000" value={turnover}
                            onChange={(e) => setTurnover(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
                        />
                        <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: '800' }}>₹{formatINR(turnover).split('.')[0]}</div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Monthly Orders
                        </label>
                        <input
                            type="range" min="1" max="1000" value={orders}
                            onChange={(e) => setOrders(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
                        />
                        <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: '800' }}>{orders} Orders</div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(17, 169, 113, 0.05)', borderRadius: '1.5rem', padding: '2rem',
                    border: '1px solid rgba(17, 169, 113, 0.15)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Indiabulls Brokerage</span>
                            <span style={{ fontWeight: '700' }}>₹{results.brokerage}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Estimated Taxes</span>
                            <span style={{ fontWeight: '700' }}>₹{results.taxes}</span>
                        </div>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '1rem' }}>Total Cost</span>
                            <span style={{ fontWeight: '800', fontSize: '1.3rem' }}>₹{results.total}</span>
                        </div>

                        <motion.div
                            initial={{ scale: 0.98 }} animate={{ scale: 1 }} key={results.savings}
                            style={{
                                marginTop: '1rem', background: 'var(--accent-green)', padding: '1.2rem',
                                borderRadius: '1rem', color: 'black', textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.7 }}>
                                Monthly Savings
                            </div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '900' }}>₹{results.savings}</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrokerageCalculator;
