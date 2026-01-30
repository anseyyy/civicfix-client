import React from 'react';
import PremiumCard from './common/PremiumCard';

const MapSection = () => {
    return (
        <section className="py-5 bg-white position-relative">
            <div className="container py-4">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-5">
                        <h6 className="text-uppercase fw-bold text-success ls-2 mb-3">Live Coverage</h6>
                        <h2 className="display-5 fw-bold mb-4">Active in Your Neighborhood</h2>
                        <p className="lead text-muted mb-4">
                            CivicFix is currently active in 8 major metropolitan areas. Check the map to see reports being resolved near you in real-time.
                        </p>

                        <div className="d-flex gap-3 mb-4">
                            <div>
                                <h2 className="fw-bold text-dark mb-0">8</h2>
                                <small className="text-muted">Cities</small>
                            </div>
                            <div className="border-start border-2 h-100 mx-2"></div>
                            <div>
                                <h2 className="fw-bold text-dark mb-0">120+</h2>
                                <small className="text-muted">Zones</small>
                            </div>
                            <div className="border-start border-2 h-100 mx-2"></div>
                            <div>
                                <h2 className="fw-bold text-dark mb-0">15m</h2>
                                <small className="text-muted">Citizens</small>
                            </div>
                        </div>

                        <div className="alert alert-success d-flex align-items-center shadow-sm" role="alert">
                            <i className="fa-solid fa-circle-check fs-4 me-3"></i>
                            <div>
                                <strong>Now Live:</strong> Expansion to 3 new districts starting next month!
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <PremiumCard className="p-0 overflow-hidden shadow-lg border-0" style={{ height: '400px', borderRadius: '24px' }}>
                            {/* Embed Google Map (Generic Location) */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1626359052670!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.2)' }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Live Impact Map"
                            ></iframe>

                            {/* Overlay Badge */}
                            <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-4 shadow-lg d-flex align-items-center">
                                <span className="spinner-grow spinner-grow-sm text-danger me-2" role="status" aria-hidden="true"></span>
                                <small className="fw-bold">Live Updates Active</small>
                            </div>
                        </PremiumCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
