import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import PremiumInput from '../components/common/PremiumInput';
import { useToast } from '../context/ToastContext';
import { allAPI } from '../services/allAPI';

function Contact() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await allAPI.contact.sendMessage(formData);
            showToast('Message sent successfully! We will get back to you soon.', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error("Failed to send message", err);
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { title: 'Visit Us', info: '123 Civic Plaza, Innovation District, NY 10001', icon: 'fa-solid fa-location-dot', color: 'primary' },
        { title: 'Email Us', info: 'support@civicfix.com', icon: 'fa-solid fa-envelope', color: 'danger' },
        { title: 'Call Us', info: '+1 (555) 123-4567', icon: 'fa-solid fa-phone', color: 'success' }
    ];

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div className="position-relative d-flex align-items-center justify-content-center text-center text-white"
                style={{
                    background: 'linear-gradient(rgba(15, 81, 50, 0.8), rgba(15, 81, 50, 0.9)), url("https://images.unsplash.com/photo-1423666639041-f142fcb9a386?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50vh',
                    marginBottom: '-3rem'
                }}>
                <Container>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Get in Touch</h1>
                        <p className="lead fs-4 mx-auto" style={{ maxWidth: '700px', opacity: 0.9 }}>
                            We'd love to hear from you. Whether you have a question, feedback, or need support.
                        </p>
                    </motion.div>
                </Container>
            </div>

            <Container style={{ marginTop: '0rem' }}>
                <Row className="g-4">
                    {/* Contact Info Cards */}
                    <Col lg={12} className="mb-4">
                        <Row className="g-4 justify-content-center">
                            {contactInfo.map((item, index) => (
                                <Col md={4} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <PremiumCard className="text-center h-100 border-0 shadow-sm">
                                            <div className={`rounded-circle bg-${item.color} bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '60px', height: '60px' }}>
                                                <i className={`${item.icon} fa-xl text-${item.color}`}></i>
                                            </div>
                                            <h5 className="fw-bold">{item.title}</h5>
                                            <p className="text-muted mb-0">{item.info}</p>
                                        </PremiumCard>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Contact Form */}
                    <Col lg={7}>
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <PremiumCard title="Send us a Message" className="border-0 shadow-lg p-4 p-md-5">
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <PremiumInput
                                                label="Your Name"
                                                id="name" name="name"
                                                value={formData.name} onChange={handleChange}
                                                placeholder="John Doe"
                                                icon="fa-solid fa-user"
                                                required
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <PremiumInput
                                                label="Your Email"
                                                id="email" name="email"
                                                type="email"
                                                value={formData.email} onChange={handleChange}
                                                placeholder="john@example.com"
                                                icon="fa-solid fa-envelope"
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <PremiumInput
                                        label="Subject"
                                        id="subject" name="subject"
                                        value={formData.subject} onChange={handleChange}
                                        placeholder="How can we help?"
                                        icon="fa-solid fa-tag"
                                        required
                                    />

                                    <Form.Group className="mb-4">
                                        <label className="form-label fw-bold text-success">Message</label>
                                        <textarea
                                            className="form-control p-3 border-0 shadow-sm"
                                            rows="5"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Write your message here..."
                                            required
                                            style={{ resize: 'none', borderRadius: '12px' }}
                                        ></textarea>
                                    </Form.Group>

                                    <PremiumButton type="submit" variant="primary" disabled={loading} className="py-3 px-5 w-auto">
                                        {loading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Sending...</> : <><i className="fa-solid fa-paper-plane me-2"></i>Send Message</>}
                                    </PremiumButton>
                                </Form>
                            </PremiumCard>
                        </motion.div>
                    </Col>

                    {/* Map Section */}
                    <Col lg={5}>
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="h-100">
                            <div className="h-100 rounded-4 overflow-hidden shadow-lg position-relative" style={{ minHeight: '400px' }}>
                                {/* Placeholder for Google Map - Using an image/iframe for now */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1645564756836!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Office Location"
                                ></iframe>
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;
