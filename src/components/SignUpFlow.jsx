import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide-react';

const SignUpFlow = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [error, setError] = useState('');

    const validate = () => {
        if (step === 1 && !formData.name.trim()) return "Please enter your full name.";
        if (step === 2) {
            if (!formData.phone.match(/^[0-9]{10}$/)) return "Enter a valid 10-digit mobile number.";
            if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Enter a valid email address.";
        }
        return "";
    };

    const handleNext = (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        setError('');

        if (step < 3) setStep(step + 1);
        else {
            // Final submission simulation
            setTimeout(() => {
                onClose();
                alert('Welcome to Indiabulls Securities! Account creation initiated.');
                setStep(1); // Reset
                setFormData({ name: '', phone: '', email: '' });
            }, 1500);
        }
    };

    const steps = [
        { title: 'Identity', icon: <User size={20} /> },
        { title: 'Contact', icon: <Phone size={20} /> },
        { title: 'Verify', icon: <ShieldCheck size={20} /> }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)',
                        zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1rem'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        className="premium-glass"
                        style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative', background: 'var(--bg-shade)', borderRadius: '32px' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: '0.3s' }}
                        >
                            <X size={24} />
                        </button>

                        {/* Progress Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '18px', left: '10px', right: '10px', height: '1px', background: 'rgba(255,255,255,0.05)', zLight: 0 }} />
                            {steps.map((s, i) => (
                                <div key={i} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        background: step > i + 1 ? 'var(--accent-green)' : step === i + 1 ? '#121317' : 'rgba(255,255,255,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: step > i + 1 ? 'black' : step === i + 1 ? 'white' : 'var(--text-muted)',
                                        transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        border: step === i + 1 ? '1px solid #00AB4E' : '1px solid transparent',
                                        boxShadow: step === i + 1 ? '0 0 15px rgba(0, 171, 78, 0.3)' : 'none'
                                    }}>
                                        {step > i + 1 ? <CheckCircle2 size={18} /> : s.icon}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: step >= i + 1 ? 'var(--text-primary)' : 'var(--text-muted)', letterSpacing: '0.02em' }}>{s.title}</span>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleNext}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    {step === 1 && (
                                        <>
                                            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Enter your Name</h2>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Official name as per PAN card.</p>
                                            <input
                                                autoFocus required type="text" placeholder="Full Name"
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: error ? '1px solid #ff4444' : '1px solid var(--glass-border)', padding: '1.2rem', borderRadius: '16px', color: 'white', outline: 'none', fontSize: '1rem', transition: '0.3s' }}
                                                value={formData.name} onChange={e => { setFormData({ ...formData, name: e.target.value }); setError(''); }}
                                                className="form-input"
                                            />
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Contact Details</h2>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>OTP will be sent for verification.</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                <input
                                                    required type="tel" placeholder="Mobile Number"
                                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: error && error.includes('mobile') ? '1px solid #ff4444' : '1px solid var(--glass-border)', padding: '1.2rem', borderRadius: '16px', color: 'white', outline: 'none', fontSize: '1rem', transition: '0.3s' }}
                                                    value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); setError(''); }}
                                                />
                                                <input
                                                    required type="email" placeholder="Email Address"
                                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: error && error.includes('email') ? '1px solid #ff4444' : '1px solid var(--glass-border)', padding: '1.2rem', borderRadius: '16px', color: 'white', outline: 'none', fontSize: '1rem', transition: '0.3s' }}
                                                    value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setError(''); }}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Ready to Launch?</h2>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Review your details and start your journey.</p>
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', fontSize: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Name</span><span style={{ fontWeight: 600 }}>{formData.name}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Contact</span><span style={{ fontWeight: 600 }}>{formData.phone}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {error && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={14} /> {error}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <button className="btn-modern primary" style={{ width: '100%', marginTop: '3.5rem', justifyContent: 'center' }}>
                                {step === 3 ? 'Finalize Account' : 'Continue'} <ArrowRight size={20} />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SignUpFlow;
