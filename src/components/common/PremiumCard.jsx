import React from 'react';
import { motion } from 'framer-motion';

const PremiumCard = ({ children, className = '', title, icon, style = {}, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`premium-card ${className}`}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                padding: '2rem',
                overflow: 'hidden',
                position: 'relative',
                ...style // Allow overriding styles
            }}
            {...props}
        >
            {title && (
                <div className="mb-4 text-center">
                    {icon && <i className={`${icon} mb-3`} style={{ fontSize: '2.5rem', color: style.color || 'var(--primary-green)' }}></i>}
                    <h3 style={{ fontWeight: '700', color: style.color || 'var(--text-dark)' }}>{title}</h3>
                </div>
            )}
            {children}
        </motion.div>
    );
};

export default PremiumCard;
