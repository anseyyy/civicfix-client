import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Table, Form, Modal, Button } from 'react-bootstrap';
import { allAPI } from '../services/allAPI';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '../components/common/PremiumCard';

import PremiumButton from '../components/common/PremiumButton';
import SERVER_URL from '../services/serverURL';

function AdminReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await allAPI.issue.getAllReports();
            setReports(res || []); // API returns the array directly
        } catch (err) {
            console.error(err);
            showToast('Failed to fetch reports', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await allAPI.issue.updateReportStatus(id, newStatus);
            showToast(`Report marked as ${newStatus}`, 'success');
            fetchReports();
        } catch (err) {
            console.error(err);
            showToast('Failed to update status', 'error');
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
            <Badge bg={variants[status] || 'secondary'} className="px-3 py-2 rounded-pill">
                <i className={`${icons[status]} me-2`}></i>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </Badge>
        );
    };

    const filteredReports = filter === 'all' ? reports : reports.filter(r => r.status === filter);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="border" variant="success" />
        </div>
    );

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <h1 className="fw-bold text-success display-5">Manage Reports</h1>
                        <p className="text-muted fs-5">Review and update status of civic issues</p>
                    </motion.div>

                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Form.Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ width: '200px', borderRadius: '12px', border: '1px solid #ced4da' }}
                            className="shadow-sm"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                        </Form.Select>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <PremiumCard className="p-0 overflow-hidden border-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle">
                                <thead className="bg-success text-white">
                                    <tr>
                                        <th className="py-3 ps-4">Issue</th>
                                        <th className="py-3">Image</th>
                                        <th className="py-3">Location</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Date</th>
                                        <th className="py-3 pe-4 text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length === 0 && (
                                        <tr>
                                            <td colspan="5" className="text-center py-5 text-muted">No reports found</td>
                                        </tr>
                                    )}
                                    {filteredReports.map((report) => (
                                        <tr key={report._id}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-dark">{report.title}</div>
                                                <div className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>
                                                    {report.description}
                                                </div>
                                            </td>
                                            <td>
                                                {report.imageUrl ? (
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                                        onClick={() => setSelectedIssue(report)}
                                                        title="View Image"
                                                    >
                                                        <i className="fa-solid fa-image"></i>
                                                    </button>
                                                ) : (
                                                    <span className="text-muted small">-</span>
                                                )}
                                            </td>
                                            <td>
                                                <div>{report.location}</div>
                                                <div className="text-muted small">{report.pincode}</div>
                                            </td>
                                            <td>{getStatusBadge(report.status)}</td>
                                            <td className="text-muted small">
                                                {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="pe-4 text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    {report.status === 'pending' && (
                                                        <>
                                                            <PremiumButton
                                                                variant="primary"
                                                                className="py-1 px-2"
                                                                style={{ fontSize: '0.8rem' }}
                                                                onClick={() => handleStatusUpdate(report._id, 'in-progress')}
                                                            >
                                                                Accept
                                                            </PremiumButton>
                                                            <PremiumButton
                                                                variant="danger"
                                                                className="py-1 px-2"
                                                                style={{ fontSize: '0.8rem' }}
                                                                onClick={() => handleStatusUpdate(report._id, 'rejected')}
                                                            >
                                                                Reject
                                                            </PremiumButton>
                                                        </>
                                                    )}
                                                    {report.status === 'in-progress' && (
                                                        <PremiumButton
                                                            variant="success"
                                                            className="py-1 px-2"
                                                            style={{ fontSize: '0.8rem' }}
                                                            onClick={() => handleStatusUpdate(report._id, 'resolved')}
                                                        >
                                                            Resolve
                                                        </PremiumButton>
                                                    )}
                                                    {(report.status === 'resolved' || report.status === 'rejected') && (
                                                        <span className="text-muted small fst-italic">Completed</span>
                                                    )}
                                                </div>
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

                {/* Image Modal */}
                <Modal show={!!selectedIssue} onHide={() => setSelectedIssue(null)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Issue Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedIssue && (
                            <img
                                src={`${SERVER_URL}/${selectedIssue.imageUrl}`}
                                alt="Issue"
                                className="img-fluid rounded"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                }}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedIssue(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default AdminReports;
