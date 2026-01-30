import React, { useState, useEffect } from 'react';
import { Badge, Spinner, Table } from 'react-bootstrap';
import { allAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
function History() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
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
            setError('Failed to fetch history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            'pending': 'warning',
            'in-progress': 'info',
            'resolved': 'success',
            'rejected': 'danger'
        };
        return <Badge bg={variants[status] || 'secondary'}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</Badge>;
    };

    const generateReport = () => {
        const csvContent = [
            ['Title', 'Description', 'Location', 'Pincode', 'Status', 'Date Reported'],
            ...issues.map(issue => [
                `"${issue.title}"`,
                `"${issue.description}"`,
                `"${issue.location}"`,
                issue.pincode,
                issue.status,
                new Date(issue.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `civicfix-history-${dateStr}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

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
                        <h1 className="fw-bold text-success display-6 mb-2">Report History</h1>
                        <p className="text-muted">Complete history of your civic engagement</p>
                    </motion.div>

                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="d-flex gap-2">
                        <PremiumButton variant="outline" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')} className="d-inline-flex align-items-center">
                            <i className={`fa-solid ${viewMode === 'cards' ? 'fa-table' : 'fa-list'} me-2`}></i>
                            {viewMode === 'cards' ? 'Table View' : 'Card View'}
                        </PremiumButton>

                        <PremiumButton variant="success" onClick={generateReport} className="d-inline-flex align-items-center">
                            <i className="fa-solid fa-download me-2"></i> Export CSV
                        </PremiumButton>
                    </motion.div>
                </div>

                {error && <div className="alert alert-danger text-center shadow-sm">{error}</div>}

                {issues.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-clock-rotate-left text-muted mb-3 display-1"></i>
                        <h3 className="text-muted">No History Available</h3>
                        <p className="text-muted">Start reporting issues to build your civic engagement history!</p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'cards' ? (
                            <div className="row g-4">
                                {issues.map((issue, index) => (
                                    <motion.div
                                        key={index}
                                        className="col-lg-6 col-xl-4"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <PremiumCard className="h-100 border-0">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="fw-bold text-dark mb-0">{issue.title}</h5>
                                                {getStatusBadge(issue.status)}
                                            </div>

                                            <p className="text-muted flex-grow-1 small">{issue.description}</p>

                                            <div className="mt-3 pt-3 border-top small text-muted">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span><i className="fa-solid fa-location-dot me-2"></i>{issue.location}</span>
                                                    <span>{issue.pincode}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="fa-regular fa-calendar me-2"></i>
                                                    {new Date(issue.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </PremiumCard>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PremiumCard className="p-0 overflow-hidden border-0">
                                    <div className="table-responsive">
                                        <Table hover className="mb-0 align-middle">
                                            <thead className="bg-success text-white">
                                                <tr>
                                                    <th className="py-3 ps-4">Title</th>
                                                    <th className="py-3">Description</th>
                                                    <th className="py-3">Location</th>
                                                    <th className="py-3">Status</th>
                                                    <th className="py-3">Date</th>
                                                    <th className="py-3 pe-4 text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {issues.map((issue, index) => (
                                                    <tr key={index}>
                                                        <td className="ps-4 fw-bold text-success">{issue.title}</td>
                                                        <td className="text-muted small" style={{ maxWidth: '250px' }}>
                                                            <div className="text-truncate">{issue.description}</div>
                                                        </td>
                                                        <td className="small">
                                                            <div>{issue.location}</div>
                                                            <div className="text-muted">{issue.pincode}</div>
                                                        </td>
                                                        <td>{getStatusBadge(issue.status)}</td>
                                                        <td className="small text-muted">{new Date(issue.createdAt).toLocaleDateString()}</td>
                                                        <td className="pe-4 text-end">
                                                            <button className="btn btn-sm btn-outline-success rounded-circle" title="View Details">
                                                                <i className="fa-solid fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        )}

                        <div className="mt-4 text-center text-muted small">
                            Showing {issues.length} total records
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default History;