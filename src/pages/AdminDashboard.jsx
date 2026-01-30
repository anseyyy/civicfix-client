import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { motion } from 'framer-motion';
import { allAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        resolved: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [reportsRes, usersRes] = await Promise.all([
                allAPI.issue.getAllReports(),
                allAPI.admin.getUsers()
            ]);

            const reports = reportsRes || [];
            const users = usersRes.users || [];

            setStats({
                total: reports.length,
                pending: reports.filter(r => r.status === 'pending').length,
                resolved: reports.filter(r => r.status === 'resolved').length,
                users: users.length
            });
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="border" variant="success" />
        </div>
    );

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container mt-5 mb-5">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-5"
                >
                    <span className="badge bg-danger rounded-pill mb-2 px-3 py-2">ADMIN ACCESS</span>
                    <h1 className="fw-bold text-success display-5">Admin Dashboard</h1>
                    <p className="text-muted fs-5">System Overview & Controls</p>
                </motion.div>

                {/* Quick Stats Row */}
                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-bottom border-success border-4">
                            <h2 className="display-4 fw-bold text-success mb-0">{stats.total}</h2>
                            <p className="text-muted small text-uppercase ls-1">Total Reports</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-bottom border-warning border-4">
                            <h2 className="display-4 fw-bold text-warning mb-0">{stats.pending}</h2>
                            <p className="text-muted small text-uppercase ls-1">Pending Action</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-bottom border-info border-4">
                            <h2 className="display-4 fw-bold text-info mb-0">{stats.resolved}</h2>
                            <p className="text-muted small text-uppercase ls-1">Resolved Issues</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-bottom border-primary border-4">
                            <h2 className="display-4 fw-bold text-primary mb-0">{stats.users}</h2>
                            <p className="text-muted small text-uppercase ls-1">Total Users</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="row g-4 justify-content-center"
                >
                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="Report Management" icon="fa-solid fa-clipboard-list" className="h-100 text-center">
                            <p className="text-muted mb-4">View detailed list of issues, assign status, and monitor progress.</p>
                            <PremiumButton variant="primary" onClick={() => navigate('/admin/reports')}>View Reports</PremiumButton>
                        </PremiumCard>
                    </motion.div>

                    {/* <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Analytics" icon="fa-solid fa-chart-pie" className="h-100 text-center">
              <p className="text-muted mb-4">Visualize data trends for reported issues and resolution times.</p>
              <PremiumButton variant="primary" onClick={() => navigate('/admin/reports')}>View Analytics</PremiumButton>
            </PremiumCard>
          </motion.div> */}

                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="User Management" icon="fa-solid fa-users-gear" className="h-100 text-center">
                            <p className="text-muted mb-4">Manage user roles, approve workers, and view registered citizens.</p>
                            <PremiumButton variant="primary" onClick={() => navigate('/admin/users')}>Manage Users</PremiumButton>
                        </PremiumCard>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="Archive" icon="fa-solid fa-box-archive" className="h-100 text-center">
                            <p className="text-muted mb-4">Access the complete history of closed and archived reports.</p>
                            <PremiumButton variant="success" onClick={() => navigate('/admin/archive')}>View Archive</PremiumButton>
                        </PremiumCard>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="Messages" icon="fa-solid fa-envelope-open-text" className="h-100 text-center">
                            <p className="text-muted mb-4">View inquiries and feedback sent via the contact form.</p>
                            <PremiumButton variant="info" className="text-white" onClick={() => navigate('/admin/messages')}>View Messages</PremiumButton>
                        </PremiumCard>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default AdminDashboard
