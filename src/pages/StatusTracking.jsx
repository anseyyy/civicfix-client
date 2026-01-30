import React, { useState, useEffect } from 'react';
import { Badge, ProgressBar, Spinner } from 'react-bootstrap';
import { allAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';

function StatusTracking() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
            if (!userData) {
                navigate('/login');
                return;
            }
            const response = await allAPI.issue.getUserReports(userData.id || userData._id);
            setIssues(response);
        } catch (err) {
            setError('Failed to fetch issues. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status) => {
        const statusInfo = {
            'pending': {
                color: 'warning',
                icon: 'fa-regular fa-clock',
                progress: 25,
                description: 'Your issue has been received and is awaiting review.'
            },
            'in-progress': {
                color: 'info',
                icon: 'fa-regular fa-eye',
                progress: 60,
                description: 'Your issue is currently being worked on.'
            },
            'resolved': {
                color: 'success',
                icon: 'fa-regular fa-circle-check',
                progress: 100,
                description: 'Your issue has been successfully resolved!'
            },
            'rejected': {
                color: 'danger',
                icon: 'fa-solid fa-triangle-exclamation',
                progress: 0,
                description: 'Your issue could not be processed.'
            }
        };

        return statusInfo[status] || statusInfo['pending'];
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="border" variant="success" />
        </div>
    );

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-5"
                >
                    <h1 className="fw-bold text-success display-5">Status Tracking</h1>
                    <p className="text-muted fs-5">Real-time updates on your reported issues</p>
                </motion.div>

                {error && <div className="alert alert-danger text-center shadow-sm">{error}</div>}

                {issues.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5"
                    >
                        <i className="fa-solid fa-satellite-dish text-muted mb-3 display-1"></i>
                        <h3 className="text-muted">No Issues to Track</h3>
                        <p className="text-muted">Start by reporting your first civic issue!</p>
                    </motion.div>
                ) : (
                    <div className="row g-4">
                        {issues.map((issue, index) => {
                            const statusInfo = getStatusInfo(issue.status);

                            return (
                                <motion.div
                                    key={index}
                                    className="col-lg-6 col-xl-4"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PremiumCard className="h-100 border-0">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '65%' }}>{issue.title}</h5>
                                            <Badge bg={statusInfo.color} className="px-3 py-2 rounded-pill shadow-sm">
                                                <i className={`${statusInfo.icon} me-1`}></i>
                                                {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
                                            </Badge>
                                        </div>

                                        <p className="text-muted" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {issue.description}
                                        </p>

                                        <div className="mb-4 bg-light p-3 rounded-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <small className="text-muted fw-bold">Progress</small>
                                                <small className={`text-${statusInfo.color} fw-bold`}>{statusInfo.progress}%</small>
                                            </div>
                                            <ProgressBar
                                                variant={statusInfo.color}
                                                now={statusInfo.progress}
                                                className="mb-2 shadow-sm"
                                                style={{ height: '8px', borderRadius: '4px' }}
                                            />
                                            <small className="text-muted fst-italic">{statusInfo.description}</small>
                                        </div>

                                        <div className="mt-auto border-top pt-3">
                                            <div className="d-flex align-items-center text-muted small mb-2">
                                                <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                                                {issue.location} - {issue.pincode}
                                            </div>
                                            <div className="d-flex align-items-center text-muted small">
                                                <i className="fa-regular fa-calendar-alt me-2 text-primary"></i>
                                                Reported: {new Date(issue.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </PremiumCard>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatusTracking;