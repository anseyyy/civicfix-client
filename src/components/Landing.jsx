import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Testimonials from '../pages/ReviewCard';
import PremiumCard from './common/PremiumCard';
import PremiumButton from './common/PremiumButton';
import { Accordion } from 'react-bootstrap';

function Landing() {
  const navigate = useNavigate();

  const faqs = [
    { q: "Is CivicFix free to use?", a: "Yes! CivicFix is a completely free platform for all citizens to report community issues." },
    { q: "Who handles the reports?", a: "We partner with local municipal bodies and send your reports directly to their verified officers." },
    { q: "Can I report anonymously?", a: "Currently, we require user registration to ensure the authenticity of reports and prevent spam." },
    { q: "What areas do you cover?", a: "We are currently active in 8 major cities and expanding rapidly to new regions." },
  ];

  return (
    <div className="overflow-x-hidden bg-light">

      {/* 1. HERO SECTION - Split Layout for Modern Look */}
      <section className="position-relative d-flex align-items-center" style={{ minHeight: '85vh', background: 'linear-gradient(135deg, #0f5132 0%, #198754 100%)' }}>
        <div className="container position-relative z-2">
          <div className="row align-items-center g-5 h-100 py-5">
            {/* Left: Text Content */}
            <div className="col-lg-6 text-white text-center text-lg-start">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <span className="badge bg-warning text-dark rounded-pill fw-bold mb-3 px-3 py-2 shadow-sm text-uppercase ls-1">
                  <i className="fa-solid fa-star me-2"></i>Official Partner of 8 Cities
                </span>
                <h1 className="display-3 fw-bold mb-4 lh-sm">
                  Fix Your City, <br /> One Click at a Time.
                </h1>
                <p className="lead fw-light mb-5 opacity-75 mx-auto mx-lg-0" style={{ maxWidth: '90%' }}>
                  Empowering citizens to report potholes, garbage, and broken lights instantly. We connect you directly to municipal authorities for faster resolutions.
                </p>

                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                  <Link to="/home">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-warning btn-lg fw-bold px-4 py-3 rounded-pill shadow-lg text-dark">
                      Report an Issue <i className="fa-solid fa-arrow-right ms-2"></i>
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-outline-light btn-lg fw-bold px-4 py-3 rounded-pill">
                      How it Works
                    </motion.button>
                  </Link>
                  <Link to="/download-app">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-success btn-lg fw-bold px-4 py-3 rounded-pill shadow-lg border-2 border-white">
                      <i className="fa-brands fa-apple me-2"></i>Download App
                    </motion.button>
                  </Link>
                </div>

                <div className="mt-5 pt-3 border-top border-white border-opacity-10 d-flex gap-5 justify-content-center justify-content-lg-start">
                  <div>
                    <h4 className="fw-bold mb-0">50k+</h4>
                    <small className="opacity-75">Reports Solved</small>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">4.8/5</h4>
                    <small className="opacity-75">App Rating</small>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">24h</h4>
                    <small className="opacity-75">Avg. Response</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Visual/Image */}
            <div className="col-lg-6 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="position-relative"
              >
                {/* Decorative Shapes */}
                <div className="position-absolute top-50 start-50 translate-middle bg-warning rounded-circle" style={{ width: '300px', height: '300px', filter: 'blur(60px)', opacity: 0.2, zIndex: -1 }}></div>

                <div className=" text-center p-4 " >
                  <img
                    src="/images/landing-mockup.png"
                    className="img-fluid rounded-5 "
                    alt="Mobile App Interface"
                    style={{ width: '100%', maxWidth: '350px', height: 'auto' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID - Bento Style */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h6 className="text-success fw-bold text-uppercase ls-2">Why Use CivicFix?</h6>
            <h2 className="fw-bold display-5 mb-3 text-dark">Smart Tools for Active Citizens</h2>
            <p className="text-muted text-center mx-auto">We provide the cutting-edge tools you need to make a tangible difference in your community.</p>
          </div>

          <div className="row g-4">
            {/* Large Card Left */}
            <div className="col-lg-7">
              <motion.div whileHover={{ y: -5 }} className="h-100 p-5 rounded-5 bg-light border border-secondary border-opacity-10 position-relative overflow-hidden group">
                {/* <div className="position-absolute top-0 end-0 p-5 opacity-10">
                  <i className="fa-solid fa-map-location-dot fa-10x text-success"></i>
                </div> */}
                <div className="position-relative z-1">
                  <div className="d-inline-flex align-items-center justify-content-center bg-white p-3 rounded-4 shadow-sm mb-4">
                    <i className="fa-solid fa-location-crosshairs fa-2x text-primary"></i>
                  </div>
                  <h3 className="fw-bold mb-3">Precision Geo-Tagging</h3>
                  <p className="text-muted mb-4 lead">Don't know the address? No problem. Our app automatically pins your exact location to ensure crews find the issue instantly.</p>
                  <Link to="/about" className="text-decoration-none fw-bold text-primary">Learn more <i className="fa-solid fa-arrow-right ms-1"></i></Link>
                </div>
              </motion.div>
            </div>

            {/* Stacked Cards Right */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4 h-100">
                <motion.div whileHover={{ y: -5 }} className="flex-grow-1 p-4 rounded-5 bg-success text-white position-relative overflow-hidden">
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 p-2 rounded-3 me-3">
                      <i className="fa-solid fa-bolt text-warning"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Instant Updates</h5>
                  </div>
                  <p className="opacity-75 small mb-0">Get real-time notifications via SMS and Push when your report is viewed, assigned, and resolved.</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="flex-grow-1 p-4 rounded-5 bg-dark text-white position-relative overflow-hidden">
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 p-2 rounded-3 me-3">
                      <i className="fa-solid fa-shield-halved text-info"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Verified Anonymous</h5>
                  </div>
                  <p className="opacity-75 small mb-0">We verify your identity to prevent spam, but you can choose to keep your name hidden from public reports.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS - Horizontal Steps */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 text-center">
              <h6 className="text-success fw-bold text-uppercase ls-2">The Process</h6>
              <h2 className="fw-bold display-6">From Broken to Fixed in 3 Steps</h2>
            </div>
          </div>

          <div className="row g-4 text-center">
            {[
              { title: "Snap a Photo", icon: "fa-camera", desc: "Use the app to capture the issue clearly." },
              { title: "Add Details", icon: "fa-pen-to-square", desc: "Briefly describe the problem and category." },
              { title: "We Handle It", icon: "fa-check-double", desc: "Authorities are notified instantly." }
            ].map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="bg-white p-5 rounded-4 shadow-sm h-100 position-relative border border-light">
                  <div className="position-absolute top-0 start-50 translate-middle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '60px', height: '60px', border: '4px solid #f8f9fa' }}>
                    <span className="fw-bold fs-5">{idx + 1}</span>
                  </div>
                  <div className="mt-3">
                    <i className={`fa-solid ${item.icon} fa-3x text-success mb-4 opacity-75`}></i>
                    <h4 className="fw-bold mb-3">{item.title}</h4>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-warning fw-bold text-uppercase ls-2">Community Voices</h6>
            <h2 className="fw-bold display-6 text-dark max-w-lg mx-auto">See What Your Neighbors Say</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* 5. FAQ MASONRY */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="fw-bold text-center mb-5">Frequently Asked Questions</h3>
              <Accordion defaultActiveKey="0" flush className="shadow-sm rounded-4 bg-white overflow-hidden">
                {faqs.map((faq, i) => (
                  <Accordion.Item eventKey={i.toString()} key={i} className="border-0 border-bottom">
                    <Accordion.Header className="py-2"><span className="fw-bold text-dark fs-5">{faq.q}</span></Accordion.Header>
                    <Accordion.Body className="text-muted fs-6 pb-4">
                      {faq.a}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="py-5" style={{ background: '#0f5132' }}>
        <div className="container text-center py-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="display-4 fw-bold text-white mb-4">Ready to Improve Your City?</h2>
            <p className="lead text-white-50 mb-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Join a community of over 50,000 proactive citizens. Creating an account takes less than a minute.
            </p>
            <Link to="/register">
              <button className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg">
                Create Free Account
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Landing