import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBull = ({ theme = 'dark' }) => {
    // High-end asset with green neon lines
    const bullImage = "/neon-bull-ultra.png";
    const canvasRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const img = new Image();
        img.src = bullImage;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Initial draw
            ctx.drawImage(img, 0, 0);

            // Aggressive Pixel Processing
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Calculate max intensity to preserve neon lines
                const maxIntensity = Math.max(r, g, b);

                // Threshold: If it's effectively background
                if (maxIntensity < 80) {
                    data[i + 3] = 0; // Absolute transparency
                } else {
                    // Smooth the edges slightly based on intensity
                    const alpha = Math.min(255, (maxIntensity - 60) * 5);
                    data[i + 3] = alpha;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
            setIsLoaded(true);
        };
    }, [bullImage]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ambient Background Glow (Dynamic based on theme) */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: theme === 'dark' ? [0.2, 0.4, 0.2] : [0.1, 0.25, 0.1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    background: theme === 'dark'
                        ? 'radial-gradient(circle, rgba(0, 171, 78, 0.3) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(0, 171, 78, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 0
                }}
            />

            {/* The Charging Bull (Processed Canvas) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: 1,
                    y: [0, -25, 0]
                }}
                transition={{
                    opacity: { duration: 1.5 },
                    scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ zIndex: 1 }}
            >
                {/* Fallback Filter for extreme black removal (Only needed in dark/blended mode) */}
                {theme === 'dark' && (
                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                        <filter id="clean-isolation">
                            <feColorMatrix type="matrix" values="1 0 0 0 0
                                                               0 1 0 0 0
                                                               0 0 1 0 0
                                                               1 1 1 0 -1.5" />
                        </filter>
                    </svg>
                )}

                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        maxWidth: '850px',
                        height: 'auto',
                        // Theme-specific rendering logic
                        mixBlendMode: theme === 'dark' ? 'screen' : 'normal',
                        filter: theme === 'dark'
                            ? 'url(#clean-isolation) drop-shadow(0 0 40px rgba(0, 171, 78, 0.5))'
                            : 'contrast(1.4) brightness(0.95) saturate(1.2) drop-shadow(0 0 35px rgba(0, 171, 78, 0.35))', // Deeper contrast for light mode
                        pointerEvents: 'none',
                        display: 'block'
                    }}
                />
            </motion.div>
        </div>
    );
};

export default AnimatedBull;
