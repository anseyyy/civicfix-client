import React, { useEffect, useState, useCallback } from 'react';
import { allAPI } from '../services/allAPI';
import { useToast } from '../context/ToastContext';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await allAPI.admin.getUsers();
            if (res && res.users) setUsers(res.users);
        } catch (err) {
            console.error('Failed to fetch users', err);
            showToast('Failed to fetch users', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        const userType = sessionStorage.getItem('userType') || localStorage.getItem('userType');
        if (userType !== 'admin') {
            showToast('Access denied: admin only', 'error');
            navigate('/admin');
            return;
        }

        fetchUsers();
    }, [fetchUsers, navigate, showToast]);

    const promote = async (id, toType) => {
        try {
            await allAPI.admin.updateUserType(id, toType);
            showToast(`User promoted to ${toType} successfully`, 'success');
            fetchUsers();
        } catch (err) {
            console.error('Promote error', err);
            showToast('Failed to update user', 'error');
        }
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
                    <h1 className="fw-bold text-success display-5">Manage Users</h1>
                    <p className="text-muted fs-5">Approve worker requests or modify user roles</p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <PremiumCard className="p-0 overflow-hidden border-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-success text-white">
                                    <tr>
                                        <th className="py-3 ps-4">Name</th>
                                        <th className="py-3">Email</th>
                                        <th className="py-3">Mobile</th>
                                        <th className="py-3">Type</th>
                                        <th className="py-3 pe-4 text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(u => u.userType !== 'admin').length === 0 && (
                                        <tr>
                                            <td colspan="5" className="text-center py-5 text-muted">
                                                <i className="fa-solid fa-users-slash display-4 mb-3 d-block"></i>
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                    {users.map((u, index) => (
                                        <tr key={u._id} className={u.workerRequest ? "table-warning" : ""}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-dark">{u.name}</div>
                                                {u.workerRequest && <span className="badge bg-warning text-dark mt-1">Requesting Worker</span>}
                                            </td>
                                            <td className="text-muted">{u.email}</td>
                                            <td className="text-muted">{u.mobile}</td>
                                            <td>
                                                <span className={`badge rounded-pill bg-${u.userType === 'admin' ? 'danger' :
                                                    u.userType === 'worker' ? 'primary' : 'secondary'
                                                    } px-3 py-2`}>
                                                    {u.userType.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="pe-4 text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    {u.userType !== 'worker' && u.userType !== 'admin' && (
                                                        <PremiumButton
                                                            variant={u.workerRequest ? "success" : "primary"}
                                                            className="py-1 px-3"
                                                            onClick={() => promote(u._id, 'worker')}
                                                            style={{ fontSize: '0.875rem' }}
                                                        >
                                                            <i className={`fa-solid ${u.workerRequest ? 'fa-check' : 'fa-helmet-safety'} me-2`}></i>
                                                            {u.workerRequest ? "Approve Request" : "Make Worker"}
                                                        </PremiumButton>
                                                    )}
                                                    {u.userType !== 'admin' && (
                                                        <PremiumButton
                                                            variant="danger"
                                                            className="py-1 px-3"
                                                            onClick={() => promote(u._id, 'admin')}
                                                            style={{ fontSize: '0.875rem' }}
                                                        >
                                                            <i className="fa-solid fa-shield-halved me-2"></i>Make Admin
                                                        </PremiumButton>
                                                    )}
                                                    {u.userType === 'worker' && (
                                                        <span className="text-muted small align-self-center fst-italic">No actions available</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default AdminUsers;
