import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Pnp() {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, var(--primary-green) 0%, #000000 100%)',
        color: 'white'
      }}
    >
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h1 style={{ fontSize: '10rem', fontWeight: 'bold', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>404</h1>
          <h2 className="mb-3 display-4">Page Not Found</h2>
          <p className="lead mb-5 text-white-50">
            The path you are looking for does not exist in our city map.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="d-flex justify-content-center gap-3 flex-wrap"
        >
          <Link to="/" className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow">
            <i className="fa-solid fa-house me-2"></i> Go Home
          </Link>

          <button
            className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill"
            onClick={() => window.history.back()}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Pnp;