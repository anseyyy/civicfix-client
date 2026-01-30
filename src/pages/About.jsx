import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    const stats = [
        { label: 'Active Users', value: '5K+', icon: 'fa-solid fa-users' },
        { label: 'Issues Resolved', value: '12K+', icon: 'fa-solid fa-check-double' },
        { label: 'Cities Covered', value: '8', icon: 'fa-solid fa-city' },
        { label: 'Avg. Response', value: '24h', icon: 'fa-solid fa-clock' },
    ];

    const values = [
        { title: 'Transparency', icon: 'fa-solid fa-magnifying-glass', desc: 'We believe in open data and clear communication between citizens and authorities.' },
        { title: 'Efficiency', icon: 'fa-solid fa-bolt', desc: 'Streamlining civic processes to get issues fixed faster than ever before.' },
        { title: 'Community', icon: 'fa-solid fa-hands-holding-circle', desc: 'Empowering local communities to take ownership of their environment.' },
    ];

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div className="position-relative d-flex align-items-center justify-content-center text-center text-white"
                style={{
                    background: 'linear-gradient(rgba(15, 81, 50, 0.8), rgba(15, 81, 50, 0.9)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh',
                    marginBottom: '4rem'
                }}>
                <Container>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>About CivicFix</h1>
                        <p className="lead fs-3 mx-auto" style={{ maxWidth: '800px', opacity: 0.9 }}>
                            Bridging the gap between citizens and local governance for a cleaner, safer tomorrow.
                        </p>
                    </motion.div>
                </Container>
            </div>

            <Container>
                {/* Mission Section */}
                <Row className="mb-5 align-items-center">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-success fw-bold mb-4 display-6">Our Mission</h2>
                            <p className="text-muted fs-5 lh-lg">
                                CivicFix was born from a simple idea: <strong>reporting civic issues should be as easy as taking a photo.</strong>
                            </p>
                            <p className="text-muted fs-5 lh-lg">
                                We aim to revolutionize municipal maintenance by providing a digital platform that empowers citizens to report problems like potholes, broken streetlights, and waste accumulation instantly. By leveraging technology, we ensure these reports reach the right authorities efficiently.
                            </p>
                            <div className="mt-4">
                                <PremiumButton variant="primary" onClick={() => navigate('/register')}>Join our Movement</PremiumButton>
                            </div>
                        </motion.div>
                    </Col>
                    <Col lg={6}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <PremiumCard className="border-0 shadow-lg" style={{ background: 'white' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
                                    alt="Community"
                                    className="img-fluid rounded-3"
                                />
                            </PremiumCard>
                        </motion.div>
                    </Col>
                </Row>

                {/* Stats Counter */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-4 shadow-sm p-5 mb-5"
                >
                    <Row className="text-center g-4">
                        {stats.map((stat, index) => (
                            <Col md={3} key={index}>
                                <div className="text-success mb-3">
                                    <i className={`${stat.icon} fa-3x`}></i>
                                </div>
                                <h2 className="fw-bold mb-0 display-5 text-dark">{stat.value}</h2>
                                <p className="text-muted fw-bold text-uppercase ls-1">{stat.label}</p>
                            </Col>
                        ))}
                    </Row>
                </motion.div>

                {/* Core Values */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-5 display-6">Why We Do It</h2>
                    <Row className="g-4">
                        {values.map((val, index) => (
                            <Col md={4} key={index}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <PremiumCard className="h-100 text-center border-0">
                                        <div className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                                            <i className={`${val.icon} fa-2x text-success`}></i>
                                        </div>
                                        <h4 className="fw-bold mb-3">{val.title}</h4>
                                        <p className="text-muted">{val.desc}</p>
                                    </PremiumCard>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default About;
