import React from 'react';
import { motion } from 'framer-motion';

const MobileMockup = () => {
    return (
        <div className="mobile-mockup-container position-relative mx-auto" style={{ maxWidth: '300px', perspective: '1000px' }}>
            <motion.div
                initial={{ rotateY: -15, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1.5, type: 'spring' }}
                className="phone-frame bg-dark rounded-5 shadow-lg border border-4 border-secondary position-relative overflow-hidden"
                style={{ height: '600px', borderRadius: '40px', borderWidth: '8px !important' }}
            >
                {/* Notch/Camera */}
                <div className="position-absolute top-0 start-50 translate-middle-x bg-black rounded-bottom-4 z-3" style={{ width: '120px', height: '25px' }}></div>

                {/* Screen Content */}
                <div className="screen-content bg-light h-100 w-100 d-flex flex-column pt-5 overflow-hidden position-relative">

                    {/* App Header */}
                    <div className="d-flex justify-content-between align-items-center px-4 mb-4">
                        <i className="fa-solid fa-bars text-dark fs-5"></i>
                        <span className="fw-bold text-success">CivicFix</span>
                        <div className="rounded-circle bg-warning overflow-hidden" style={{ width: '30px', height: '30px' }}>
                            <img src="https://i.pravatar.cc/150?img=12" alt="User" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* Greeting */}
                    <div className="px-4 mb-4">
                        <h5 className="fw-bold mb-1">Hello, Sarah! 👋</h5>
                        <small className="text-muted">Ready to make a change?</small>
                    </div>

                    {/* Main Action Card */}
                    <div className="px-3 mb-4">
                        <div className="bg-success text-white p-4 rounded-4 shadow-sm position-relative overflow-hidden">
                            <div className="position-absolute top-0 end-0 p-3 opacity-25">
                                <i className="fa-solid fa-camera fa-4x"></i>
                            </div>
                            <h5 className="fw-bold mb-3">Report an Issue</h5>
                            <button className="btn btn-light text-success fw-bold rounded-pill px-4 btn-sm shadow-sm">
                                Snap Photo <i className="fa-solid fa-camera ms-1"></i>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity List */}
                    <div className="flex-grow-1 bg-white rounded-top-4 p-4 shadow-sm">
                        <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Nearby Reports</h6>

                        {/* Item 1 */}
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                                <i className="fa-solid fa-road text-warning"></i>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 small">Pothole on Main St.</h6>
                                <small className="text-muted" style={{ fontSize: '10px' }}>2 mins ago • <span className="text-warning">Pending</span></small>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                                <i className="fa-solid fa-trash text-danger"></i>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 small">Garbage Dump</h6>
                                <small className="text-muted" style={{ fontSize: '10px' }}>1 hr ago • <span className="text-success">Resolved</span></small>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="d-flex align-items-center">
                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                                <i className="fa-solid fa-lightbulb text-info"></i>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 small">Broken Streetlight</h6>
                                <small className="text-muted" style={{ fontSize: '10px' }}>3 hrs ago • <span className="text-warning">In Progress</span></small>
                            </div>
                        </div>
                    </div>

                    {/* App Nav Bar */}
                    <div className="bg-white border-top py-3 px-4 d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-house text-success fs-5"></i>
                        <i className="fa-solid fa-map-location-dot text-muted fs-5"></i>
                        <i className="fa-solid fa-bell text-muted fs-5"></i>
                        <i className="fa-solid fa-user text-muted fs-5"></i>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default MobileMockup;
