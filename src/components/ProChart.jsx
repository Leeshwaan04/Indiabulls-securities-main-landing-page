import React, { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

const ProChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        try {
            const chart = LightweightCharts.createChart(chartContainerRef.current, {
                layout: {
                    background: { type: 'solid', color: 'transparent' },
                    textColor: '#d1d4dc',
                },
                grid: {
                    vertLines: { color: 'rgba(42, 46, 57, 0.2)' },
                    horzLines: { color: 'rgba(42, 46, 57, 0.2)' },
                },
                width: chartContainerRef.current.clientWidth || 800,
                height: 400,
            });

            chartRef.current = chart;

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            });

            const data = [
                { time: '2024-01-01', open: 180.16, high: 185.84, low: 179.16, close: 184.92 },
                { time: '2024-01-02', open: 184.92, high: 190.62, low: 183.16, close: 188.08 },
                { time: '2024-01-03', open: 188.08, high: 195.1, low: 187.08, close: 191.56 },
                { time: '2024-01-04', open: 191.56, high: 192.22, low: 185.83, close: 186.86 },
                { time: '2024-01-05', open: 186.86, high: 189.26, low: 182.3, close: 185.82 },
                { time: '2024-01-06', open: 185.82, high: 195.00, low: 184.20, close: 193.40 },
                { time: '2024-01-07', open: 193.40, high: 198.50, low: 192.10, close: 197.80 },
                { time: '2024-01-08', open: 197.80, high: 202.30, low: 196.40, close: 199.20 },
                { time: '2024-01-09', open: 199.20, high: 205.10, low: 198.50, close: 203.40 },
                { time: '2024-01-10', open: 203.40, high: 208.50, low: 202.10, close: 207.80 },
            ];

            candlestickSeries.setData(data);

            const handleResize = () => {
                if (chartContainerRef.current && chartRef.current) {
                    chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        } catch (err) {
            console.error("Chart Error:", err);
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div style={{
                position: 'absolute', top: '20px', left: '20px', zIndex: 10,
                background: 'rgba(0,0,0,0.6)', padding: '8px 12px', borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                pointerEvents: 'none'
            }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 'bold' }}>Live Asset</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#11A971' }}>IBULHSGFIN / INR</div>
            </div>
            <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default ProChart;
