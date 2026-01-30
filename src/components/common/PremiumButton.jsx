import React from 'react';
import { motion } from 'framer-motion';

const PremiumButton = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        border: 'none',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: '100%',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.7 : 1,
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--primary-green), var(--primary-light))',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(25, 135, 84, 0.3)',
        },
        outline: {
            background: 'transparent',
            border: '2px solid var(--primary-green)',
            color: 'var(--primary-green)',
        },
        danger: {
            background: 'linear-gradient(135deg, #dc3545, #b02a37)',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
        }
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={{ ...baseStyle, ...variants[variant] }}
        >
            {disabled ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Loading...</>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default PremiumButton;
