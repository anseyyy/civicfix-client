import React from 'react';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function WorkerLogin() {
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
          <h1 className="fw-bold text-success display-5">Worker Dashboard</h1>
          <p className="text-muted fs-5">View assigned tasks and manage work progress</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row g-4 justify-content-center"
        >
          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="New Works" icon="fa-solid fa-clipboard-check" className="h-100 text-center">
              <p className="text-muted mb-4">Browse newly assigned civic tasks awaiting your attention.</p>
              <PremiumButton variant="primary" onClick={() => navigate('/worker/reports')}>View New</PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Completed Works" icon="fa-solid fa-check-double" className="h-100 text-center">
              <p className="text-muted mb-4">Review all the tasks you've successfully completed.</p>
              <PremiumButton variant="success" onClick={() => navigate('/worker/reports')}>View Completed</PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Pending Works" icon="fa-solid fa-hourglass-half" className="h-100 text-center">
              <p className="text-muted mb-4">Track ongoing tasks and update their progress as needed.</p>
              <PremiumButton variant="outline" className="text-success border-success" onClick={() => navigate('/worker/reports')}>View Pending</PremiumButton>
            </PremiumCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default WorkerLogin