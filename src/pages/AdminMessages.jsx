import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { allAPI } from '../services/allAPI';

function AdminMessages() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await allAPI.contact.getMessages();
            setMessages(res || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="border" variant="success" />
        </div>
    );

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <h1 className="fw-bold text-success display-5">User Messages</h1>
                        <p className="text-muted fs-5">Feedback and inquiries from the Contact Us form</p>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <PremiumCard className="p-0 overflow-hidden border-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle">
                                <thead className="bg-success text-white">
                                    <tr>
                                        <th className="py-3 ps-4">User Details</th>
                                        <th className="py-3">Subject</th>
                                        <th className="py-3">Message</th>
                                        <th className="py-3 pe-4 text-end">Received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5 text-muted">
                                                <i className="fa-regular fa-envelope display-4 mb-3 d-block"></i>
                                                No messages received yet.
                                            </td>
                                        </tr>
                                    )}
                                    {messages.map((msg) => (
                                        <tr key={msg._id}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-dark">{msg.name}</div>
                                                <div className="text-muted small">{msg.email}</div>
                                            </td>
                                            <td className="fw-bold text-success">{msg.subject}</td>
                                            <td>
                                                <div className="text-muted small" style={{ maxWidth: '400px' }}>
                                                    {msg.message}
                                                </div>
                                            </td>
                                            <td className="pe-4 text-end text-muted small">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                                <br />
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </PremiumCard>
                </motion.div>

                <div className="text-center mt-4">
                    <PremiumButton variant="outline" onClick={() => navigate('/admin')} className="d-inline-flex align-items-center">
                        <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
                    </PremiumButton>
                </div>
            </div>
        </div>
    );
}

export default AdminMessages;
