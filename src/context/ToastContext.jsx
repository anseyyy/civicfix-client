import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type };

        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const getToastVariant = (type) => {
        switch (type) {
            case 'success': return 'success';
            case 'error': return 'danger';
            case 'warning': return 'warning';
            case 'info':
            default: return 'info';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer
                position="middle-center"
                className="p-3"
                style={{
                    zIndex: 9999,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        onClose={() => removeToast(toast.id)}
                        show={true}
                        bg={getToastVariant(toast.type)}
                        autohide={true}
                        delay={4000}
                        className="shadow-lg border-0 rounded-3"
                        style={{
                            minWidth: '300px',
                            maxWidth: '500px'
                        }}
                    >
                        <Toast.Header closeButton={true} className="d-flex justify-content-between">
                            <strong className="me-auto">
                                {toast.type === 'success' && '✓ Success'}
                                {toast.type === 'error' && '✗ Error'}
                                {toast.type === 'warning' && '⚠ Warning'}
                                {toast.type === 'info' && 'ℹ Information'}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className="text-white fw-medium">
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};