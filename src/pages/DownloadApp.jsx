import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumButton from '../components/common/PremiumButton';

function DownloadApp() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #0f5132 0%, #198754 100%)', minHeight: '100vh', color: 'white', paddingBottom: '5rem' }}>
            <div className="container pt-5">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-5"
                >
                    <div className="d-inline-block bg-warning text-dark px-4 py-2 rounded-pill fw-bold mb-4 shadow-lg">
                        <i className="fa-solid fa-rocket me-2"></i> Launching Soon
                    </div>
                    <h1 className="display-3 fw-bold mb-3">CivicFix Mobile App</h1>
                    <p className="lead opacity-75 fs-4">Fixing your city is about to get even easier.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="row g-5 justify-content-center align-items-center"
                >
                    {/* App Features / Mockup Column */}
                    <div className="col-lg-5 text-center text-lg-start">
                        <div className="mb-5">
                            <h2 className="fw-bold mb-4">Powerful Features in Your Pocket</h2>
                            <ul className="list-unstyled fs-5 d-flex flex-column gap-3">
                                <li className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fa-solid fa-camera text-warning"></i>
                                    </div>
                                    Snap & Report instantly
                                </li>
                                <li className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fa-solid fa-location-dot text-info"></i>
                                    </div>
                                    Auto-GPS Location Tagging
                                </li>
                                <li className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className="fa-solid fa-bell text-white"></i>
                                    </div>
                                    Real-time Status Alerts
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur-sm border border-white border-opacity-10">
                            <h5 className="fw-bold mb-3">Get Notified When We Launch!</h5>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control form-control-lg border-0" placeholder="Enter your email" />
                                <button className="btn btn-warning fw-bold px-4" onClick={() => alert("We'll notify you as soon as the app is live!")}>Notify Me</button>
                            </div>
                            <small className="opacity-75"><i className="fa-solid fa-lock me-1"></i> No spam, we promise.</small>
                        </div>

                        <div className="mt-5">
                            <PremiumButton variant="outline-light" onClick={() => navigate('/')}>
                                <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
                            </PremiumButton>
                        </div>
                    </div>

                    {/* Horizontal Auto-Scroll Column */}
                    <div className="col-lg-6 offset-lg-1 overflow-hidden position-relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        <motion.div
                            className="d-flex gap-4"
                            animate={{ x: ["0%", "-25%"] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            style={{ width: "fit-content" }}
                        >
                            {/* Duplicated images for seamless loop */}
                            {[
                                { src: "/images/app-home.png", alt: "Home Screen" },
                                { src: "/images/app-report.png", alt: "Report Screen" },
                                { src: "/images/app-status.png", alt: "Status Screen" },
                                { src: "/images/app-home.png", alt: "Home Screen" },
                                { src: "/images/app-report.png", alt: "Report Screen" },
                                { src: "/images/app-status.png", alt: "Status Screen" }
                            ].map((img, index) => (
                                <div key={index} className="flex-shrink-0" style={{ width: '280px' }}>
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="rounded-4 w-100" // w-100 of container
                                        style={{ height: 'auto' }}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default DownloadApp;
