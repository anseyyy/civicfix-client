import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Table, Form } from 'react-bootstrap';
import { allAPI } from '../services/allAPI';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';

function WorkerReports() {
    const location = useLocation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(location.state?.filter || 'pending');
    const [statusUpdates, setStatusUpdates] = useState({});
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await allAPI.issue.getAllReports();
            setReports(res || []);
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
            showToast(`Work updated to ${newStatus}`, 'success');
            setStatusUpdates(prev => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            });
            fetchReports();
        } catch (err) {
            console.error(err);
            showToast('Failed to update work status', 'error');
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

    // Workers primarily care about Pending (to pick up) and In-Progress (their active work)
    // They generally don't need to see 'rejected' or 'resolved' unless reviewing history.
    const safeReports = reports || [];
    const filteredReports = filter === 'all' ? safeReports : safeReports.filter(r => r.status === filter);

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
                        <h1 className="fw-bold text-success display-5">Work Orders</h1>
                        <p className="text-muted fs-5">View and manage execution of civic tasks</p>
                    </motion.div>

                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Form.Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ width: '200px', borderRadius: '12px', border: '1px solid #ced4da' }}
                            className="shadow-sm"
                        >
                            <option value="pending">Available Works</option>
                            <option value="in-progress">My Active Works</option>
                            <option value="resolved">Completed Works</option>
                        </Form.Select>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <PremiumCard className="p-0 overflow-hidden border-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle">
                                <thead className="bg-success text-white">
                                    <tr>
                                        <th className="py-3 ps-4">Task</th>
                                        <th className="py-3">Location</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Date</th>
                                        <th className="py-3 pe-4 text-end">My Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length === 0 && (
                                        <tr>
                                            <td colspan="5" className="text-center py-5 text-muted">
                                                <i className="fa-solid fa-clipboard-check display-4 mb-3 d-block"></i>
                                                No works found in this category
                                            </td>
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
                                                <div>{report.location}</div>
                                                <div className="text-muted small">{report.pincode}</div>
                                            </td>
                                            <td>{getStatusBadge(report.status)}</td>
                                            <td className="text-muted small">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="pe-4 text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    {report.status === 'pending' && (
                                                        <PremiumButton
                                                            variant="primary"
                                                            className="py-1 px-3"
                                                            style={{ fontSize: '0.8rem' }}
                                                            onClick={() => handleStatusUpdate(report._id, 'in-progress')}
                                                        >
                                                            <i className="fa-solid fa-hand-holding-hand me-2"></i>Accept Job
                                                        </PremiumButton>
                                                    )}
                                                    {report.status === 'in-progress' && (
                                                        <div className="d-flex align-items-center gap-2">
                                                            <Form.Select
                                                                size="sm"
                                                                style={{ width: '130px', borderRadius: '8px' }}
                                                                value={statusUpdates[report._id] || ''}
                                                                onChange={(e) => setStatusUpdates(prev => ({ ...prev, [report._id]: e.target.value }))}
                                                            >
                                                                <option value="">Update Status</option>
                                                                <option value="resolved">Completed</option>
                                                                <option value="rejected">Cannot Complete</option>
                                                                <option value="pending">Release Job</option>
                                                            </Form.Select>
                                                            <PremiumButton
                                                                variant="success"
                                                                className="py-1 px-2"
                                                                style={{ fontSize: '0.8rem' }}
                                                                disabled={!statusUpdates[report._id]}
                                                                onClick={() => handleStatusUpdate(report._id, statusUpdates[report._id])}
                                                            >
                                                                Submit
                                                            </PremiumButton>
                                                        </div>
                                                    )}
                                                    {(report.status === 'resolved' || report.status === 'rejected') && (
                                                        <span className="text-muted small fst-italic">Archived</span>
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
                    <PremiumButton variant="outline" onClick={() => navigate('/worker')} className="d-inline-flex align-items-center">
                        <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
                    </PremiumButton>
                </div>
            </div>
        </div>
    );
}

export default WorkerReports;
