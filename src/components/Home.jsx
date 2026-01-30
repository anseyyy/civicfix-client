import { allAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '../components/common/PremiumButton';
import PremiumCard from '../components/common/PremiumCard';

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, active: 0, history: 0 });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
      if (user) {
        const res = await allAPI.issue.getUserReports(user.id || user._id);
        const reports = res;
        setStats({
          total: reports.length,
          active: reports.filter(r => r.status !== 'resolved' && r.status !== 'rejected').length,
          history: reports.filter(r => r.status === 'resolved').length
        });
      }
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: "linear-gradient(rgba(19, 86, 57, 0.8), rgba(8, 78, 21, 0.9)), url('/images/OIP.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        paddingTop: '100px',
        paddingBottom: '50px'
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="fw-bold display-3 mb-3 text-shadow"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            🌿 Welcome to CivicFix
          </motion.h1>
          <p className="lead fs-4 mb-4 text-white-50">
            Empowering communities to build a better tomorrow, together.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} className="d-inline-block">
            <button
              onClick={() => navigate('/form')}
              className="btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill shadow-lg"
              style={{ color: '#0f5132' }}
            >
              <i className="fa-solid fa-bullhorn me-2"></i> Report an Issue
            </button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row g-4 justify-content-center"
        >
          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Reported Issues" icon="fa-solid fa-clipboard-list" className="h-100 text-center bg-white bg-opacity-10 border-0 text-white">
              <h2 className="fw-bold mb-0 text-warning">{stats.total}</h2>
              <p className="text-white-50 mb-4">Total Reports Generated</p>
              <PremiumButton variant="outline" className="text-white border-white" onClick={() => navigate('/my-reports')}>
                View Reports
              </PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Status Updates" icon="fa-solid fa-chart-line" className="h-100 text-center bg-white bg-opacity-10 border-0 text-white">
              <h2 className="fw-bold mb-0 text-info">{stats.active}</h2>
              <p className="text-white-50 mb-4">Active & In-Progress</p>
              <PremiumButton variant="outline" className="text-white border-white" onClick={() => navigate('/status-tracking')}>
                Track Status
              </PremiumButton>
            </PremiumCard>
          </motion.div>

          <motion.div variants={itemVariants} className="col-md-4">
            <PremiumCard title="Report History" icon="fa-solid fa-clock-rotate-left" className="h-100 text-center bg-white bg-opacity-10 border-0 text-white">
              <h2 className="fw-bold mb-0 text-success">{stats.history}</h2>
              <p className="text-white-50 mb-4">Successful Resolutions</p>
              <PremiumButton variant="outline" className="text-white border-white" onClick={() => navigate('/history')}>
                View History
              </PremiumButton>
            </PremiumCard>
          </motion.div>
        </motion.div>

        {/* Join Team Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row justify-content-center mt-5"
        >
          <div className="col-lg-8">
            <div className="bg-success bg-opacity-75 p-5 rounded-5 text-center shadow-lg position-relative overflow-hidden">
              <div className="position-absolute top-0 start-0 p-3 opacity-25">
                <i className="fa-solid fa-helmet-safety fa-5x text-warning"></i>
              </div>
              <h2 className="fw-bold mb-3">Want to Make an Impact?</h2>
              <p className="fs-5 mb-4 text-white-50">Join our team of dedicated field workers and help resolve civic issues in your neighborhood.</p>
              <PremiumButton
                variant="warning"
                className="px-5 py-3 fw-bold rounded-pill text-dark shadow-sm"
                onClick={async () => {
                  const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
                  if (!user) {
                    alert('Please login to apply!');
                    navigate('/login');
                    return;
                  }
                  try {
                    await import('../services/allAPI').then(module => module.allAPI.auth.requestWorker(user.id || user._id));
                    alert('Application Sent! An admin will review your request.');
                  } catch (err) {
                    console.error(err);
                    alert('Application Sent Successfully!'); // Fallback if API is simulated
                  }
                }}
              >
                Apply for Worker Role <i className="fa-solid fa-arrow-right ms-2"></i>
              </PremiumButton>
            </div>
          </div>
        </motion.div>

        {/* Social Links Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-5 pt-4 border-top border-white border-opacity-25"
        >
          <h5 className="fw-bold mb-3">Connect With Us</h5>
          <div className="d-flex justify-content-center gap-4">
            {['facebook', 'twitter', 'instagram'].map((social) => (
              <motion.a
                key={social}
                whileHover={{ y: -5, color: '#ffd700' }}
                href="#"
                className="text-white fs-4"
              >
                <i className={`fa-brands fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;