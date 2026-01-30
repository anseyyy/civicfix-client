import React from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { motion } from 'framer-motion';

function AdminLogin() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container mt-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h1 className="fw-bold text-success display-5">Admin Dashboard</h1>
          <p className="text-muted fs-5">Manage civic reports and monitor community progress</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row g-4 justify-content-center"
        >
          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Reported Issues" icon="fa-solid fa-clipboard-list" className="h-100 text-center">
              <p className="text-muted mb-4">View and manage all civic issues submitted by citizens.</p>
              <PremiumButton variant="primary" onClick={() => navigate('/admin/reports')}>View Reports</PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Status Updates" icon="fa-solid fa-chart-line" className="h-100 text-center">
              <p className="text-muted mb-4">Track real-time progress of ongoing issue resolutions.</p>
              <PremiumButton variant="primary" onClick={() => navigate('/admin/reports')}>Track Status</PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Report History" icon="fa-solid fa-clock-rotate-left" className="h-100 text-center">
              <p className="text-muted mb-4">Access the complete archive of resolved community issues.</p>
              <PremiumButton variant="primary" onClick={() => navigate('/history')}>View History</PremiumButton>
            </PremiumCard>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='m-5 text-center'
        >
          <PremiumButton variant="outline" className="d-inline-block w-auto" onClick={() => navigate('/admin/users')}>
            <i className="fa-solid fa-users-gear me-2"></i>Manage Worker Requests
          </PremiumButton>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLogin