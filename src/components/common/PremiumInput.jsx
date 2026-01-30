import React from 'react';

const PremiumInput = ({ label, type = 'text', value, onChange, placeholder, icon, required = false, id, name }) => {
    return (
        <div className="mb-4">
            {label && <label className="form-label fw-bold text-success" htmlFor={id}>{label}</label>}
            <div className="input-group" style={{
                boxShadow: 'var(--shadow-sm)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e0e0e0'
            }}>
                {icon && (
                    <span className="input-group-text bg-white border-0 text-success ps-3">
                        <i className={icon}></i>
                    </span>
                )}
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="form-control border-0 py-3"
                    placeholder={placeholder}
                    required={required}
                    style={{ boxShadow: 'none', background: '#fff' }}
                />
            </div>
        </div>
    );
};

export default PremiumInput;
