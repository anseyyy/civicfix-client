import React, { useEffect, useState } from 'react';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';

function WorkerDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        pending: 0,
        inProgress: 0,
        resolved: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkerStats();
    }, []);

    const fetchWorkerStats = async () => {
        try {
            const res = await allAPI.issue.getAllReports();
            const reports = res || [];

            // In a real app, we might filter by assigned worker ID here if the API supported it
            setStats({
                pending: reports.filter(r => r.status === 'pending').length,
                inProgress: reports.filter(r => r.status === 'in-progress').length,
                resolved: reports.filter(r => r.status === 'resolved').length
            });
        } catch (err) {
            console.error("Failed to fetch worker stats", err);
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
                    <span className="badge bg-primary rounded-pill mb-2 px-3 py-2">FIELD WORKER PORTAL</span>
                    <h1 className="fw-bold text-success display-5">Worker Dashboard</h1>
                    <p className="text-muted fs-5">My Tasks & Overview</p>
                </motion.div>

                {/* Quick Stats */}
                <div className="row g-4 mb-5 justify-content-center">
                    <div className="col-md-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-start border-warning border-5">
                            <h2 className="display-3 fw-bold text-warning mb-0">{stats.pending}</h2>
                            <p className="text-muted text-uppercase fw-bold ls-1 mb-0">Open Jobs</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-start border-info border-5">
                            <h2 className="display-3 fw-bold text-info mb-0">{stats.inProgress}</h2>
                            <p className="text-muted text-uppercase fw-bold ls-1 mb-0">In Progress</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm text-center border-start border-success border-5">
                            <h2 className="display-3 fw-bold text-success mb-0">{stats.resolved}</h2>
                            <p className="text-muted text-uppercase fw-bold ls-1 mb-0">Completed</p>
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
                        <PremiumCard title="Available Works" icon="fa-solid fa-clipboard-check" className="h-100 text-center">
                            <p className="text-muted mb-4">Browse and pick up new civic tasks reported in your area.</p>
                            <PremiumButton variant="primary" onClick={() => navigate('/worker/reports', { state: { filter: 'pending' } })}>View Available</PremiumButton>
                        </PremiumCard>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="My Active Jobs" icon="fa-solid fa-person-digging" className="h-100 text-center">
                            <p className="text-muted mb-4">Manage tasks you are currently working on and update status.</p>
                            <PremiumButton variant="outline" className="text-dark border-dark" onClick={() => navigate('/worker/reports', { state: { filter: 'in-progress' } })}>View Active</PremiumButton>
                        </PremiumCard>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-md-4">
                        <PremiumCard title="Completed History" icon="fa-solid fa-check-double" className="h-100 text-center">
                            <p className="text-muted mb-4">Review your past work and completion records.</p>
                            <PremiumButton variant="success" onClick={() => navigate('/worker/reports', { state: { filter: 'resolved' } })}>View History</PremiumButton>
                        </PremiumCard>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default WorkerDashboard
