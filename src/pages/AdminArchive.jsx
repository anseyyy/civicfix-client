import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Table, Form } from 'react-bootstrap';
import { allAPI } from '../services/allAPI';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';

function AdminArchive() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await allAPI.issue.getAllReports();
            // Filter only resolved and rejected reports for the archive
            const archivedReports = (res || []).filter(r =>
                r.status === 'resolved' || r.status === 'rejected'
            );
            setReports(archivedReports);
        } catch (err) {
            console.error(err);
            showToast('Failed to fetch archive', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            'resolved': 'success',
            'rejected': 'danger'
        };
        const icons = {
            'resolved': 'fa-solid fa-check-circle',
            'rejected': 'fa-solid fa-triangle-exclamation'
        };
        return (
            <Badge bg={variants[status] || 'secondary'} className="px-3 py-2 rounded-pill">
                <i className={`${icons[status]} me-2`}></i>
                {status.charAt(0).toUpperCase() + status.slice(1)}
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
                        <h1 className="fw-bold text-success display-5">Archive</h1>
                        <p className="text-muted fs-5">History of resolved and closed issues</p>
                    </motion.div>

                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Form.Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ width: '200px', borderRadius: '12px', border: '1px solid #ced4da' }}
                            className="shadow-sm"
                        >
                            <option value="all">All Archived</option>
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
                                        <th className="py-3">Location</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Date</th>
                                        <th className="py-3 pe-4 text-end">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length === 0 && (
                                        <tr>
                                            <td colspan="5" className="text-center py-5 text-muted">No archived reports found</td>
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
                                                <span className="text-muted small fst-italic">Archived</span>
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

export default AdminArchive;
