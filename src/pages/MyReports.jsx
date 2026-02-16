import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { allAPI } from '../services/allAPI';
import { useToast } from '../context/ToastContext';
import SERVER_URL from '../services/serverURL';

function MyReports() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const userData = localStorage.getItem('user');
            if (!userData) {
                navigate('/login');
                return;
            }
            const user = JSON.parse(userData);
            const res = await allAPI.issue.getUserReports(user._id || user.id);
            setIssues(res.data || res); // Handle both structure possibilities
        } catch (err) {
            setError('Failed to fetch reports. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        try {
            await allAPI.issue.deleteReport(id);
            showToast("Report deleted successfully", 'success');
            fetchIssues();
        } catch (err) {
            console.error("Delete failed", err);
            showToast("Failed to delete report", 'error');
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            'pending': 'warning',
            'in-progress': 'info',
            'resolved': 'success',
            'rejected': 'danger'
        };
        const icons = {
            'pending': 'fa-regular fa-clock',
            'in-progress': 'fa-solid fa-eye',
            'resolved': 'fa-solid fa-check-circle',
            'rejected': 'fa-solid fa-triangle-exclamation'
        };

        return (
            <Badge bg={variants[status] || 'secondary'} className="px-3 py-2 rounded-pill shadow-sm">
                <i className={`${icons[status] || 'fa-solid fa-circle'} me-2`}></i>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </Badge>
        );
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
                    <h1 className="fw-bold text-success display-5">My Reported Issues</h1>
                    <p className="text-muted fs-5">Track and view all your civic issue reports</p>
                </motion.div>

                {error && <div className="alert alert-danger text-center shadow-sm">{error}</div>}

                {issues.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5"
                    >
                        <i className="fa-solid fa-folder-open text-muted mb-3 display-1"></i>
                        <h3 className="text-muted">No Issues Reported Yet</h3>
                        <p className="text-muted mb-4">Start by reporting your first civic issue!</p>
                        <PremiumButton variant="primary" onClick={() => navigate('/form')} className="d-inline-block w-auto px-5">
                            Report an Issue
                        </PremiumButton>
                    </motion.div>
                ) : (
                    <div className="row g-4">
                        {issues.map((issue, index) => (
                            <motion.div
                                key={index}
                                className="col-lg-6 col-xl-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PremiumCard className="h-100 d-flex flex-column border-0">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '65%' }}>{issue.title}</h5>
                                        {getStatusBadge(issue.status)}
                                    </div>

                                    <p className="text-muted flex-grow-1" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {issue.description}
                                    </p>

                                    <div className="mt-3 pt-3 border-top">
                                        <div className="d-flex align-items-center text-muted small mb-2">
                                            <i className="fa-solid fa-location-dot me-2 text-success"></i>
                                            {issue.location} - {issue.pincode}
                                        </div>

                                        <div className="d-flex align-items-center text-muted small mb-3">
                                            <i className="fa-regular fa-calendar-alt me-2 text-success"></i>
                                            {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>

                                        {issue.imageUrl && (
                                            <div className="rounded overflow-hidden mb-3 shadow-sm" style={{ height: '180px' }}>
                                                <img
                                                    src={`${SERVER_URL}/${issue.imageUrl.replace(/\\/g, '/')}`}
                                                    alt="Issue"
                                                    className="w-100 h-100 object-fit-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <div className="d-flex gap-2">
                                            <PremiumButton variant="outline" className="flex-grow-1" onClick={() => setSelectedIssue(issue)}>
                                                <i className="fa-solid fa-eye me-2"></i>Details
                                            </PremiumButton>
                                            {issue.status === 'pending' && (
                                                <PremiumButton variant="danger" className="flex-grow-0" onClick={() => handleDelete(issue._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </PremiumButton>
                                            )}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <Modal show={!!selectedIssue} onHide={() => setSelectedIssue(null)} size="lg" centered>
                {selectedIssue && (
                    <>
                        <Modal.Header closeButton className="border-0">
                            <Modal.Title className="fw-bold text-success">{selectedIssue.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedIssue.imageUrl && (
                                <img
                                    src={`${SERVER_URL}/${selectedIssue.imageUrl.replace(/\\/g, '/')}`}
                                    alt={selectedIssue.title}
                                    className="img-fluid rounded mb-3 w-100"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                    }}
                                />
                            )}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {getStatusBadge(selectedIssue.status)}
                                <small className="text-muted">
                                    {selectedIssue.createdAt ? new Date(selectedIssue.createdAt).toLocaleString() : 'N/A'}
                                </small>
                            </div>
                            <p className="lead">{selectedIssue.description}</p>
                            <hr />
                            <div className="text-muted">
                                <p className="mb-1"><i className="fa-solid fa-location-dot me-2"></i><strong>Location:</strong> {selectedIssue.location}</p>
                                <p className="mb-0"><i className="fa-solid fa-map-pin me-2"></i><strong>Pincode:</strong> {selectedIssue.pincode}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button variant="secondary" onClick={() => setSelectedIssue(null)}>Close</Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default MyReports;