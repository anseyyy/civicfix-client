import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('');
    const location = useLocation();

    const refreshUserFromStorage = () => {
        const sessionName = sessionStorage.getItem('username');
        const sessionUserType = sessionStorage.getItem('userType');
        const localUser = localStorage.getItem('user');
        const localUserType = localStorage.getItem('userType');

        if (sessionName) {
            setUser({ name: sessionName });
            setUserType(sessionUserType || '');
        } else if (localUser && localUserType) {
            try {
                setUser(JSON.parse(localUser));
            } catch (e) {
                setUser(null);
            }
            setUserType(localUserType);
        } else {
            setUser(null);
            setUserType('');
        }
    };

    useEffect(() => {
        refreshUserFromStorage();
        const onStorage = () => refreshUserFromStorage();
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    useEffect(() => {
        refreshUserFromStorage();
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        try {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('userType');
        } catch (e) { }
        setUser(null);
        setUserType('');
        navigate('/login');
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky-top"
            style={{ zIndex: 1000 }}
        >
            <Navbar expand="lg" className="py-3" style={{
                background: 'rgba(15, 81, 50, 0.90)', // 90% opacity as requested (approx)
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-light fw-bold d-flex align-items-center">
                        <i className="fa-solid fa-leaf me-2 text-warning"></i>
                        <span style={{ fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>CIVICFIX</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-light">
                        <i className="fa-solid fa-bars"></i>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto align-items-center">
                            {userType === 'admin' ? (
                                <Nav.Link as={Link} to="/admin" className="text-light mx-2 px-3 position-relative nav-hover-effect" style={{ fontWeight: '500' }}>Dashboard</Nav.Link>
                            ) : userType === 'worker' ? (
                                <Nav.Link as={Link} to="/worker" className="text-light mx-2 px-3 position-relative nav-hover-effect" style={{ fontWeight: '500' }}>Dashboard</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/home" className="text-light mx-2 px-3 position-relative nav-hover-effect" style={{ fontWeight: '500' }}>Home</Nav.Link>
                                    <Nav.Link as={Link} to="/about" className="text-light mx-2 px-3 position-relative nav-hover-effect" style={{ fontWeight: '500' }}>About</Nav.Link>
                                    <Nav.Link as={Link} to="/contact" className="text-light mx-2 px-3 position-relative nav-hover-effect" style={{ fontWeight: '500' }}>Contact Us</Nav.Link>
                                    <Link to="/form" className="btn btn-warning ms-3 fw-bold rounded-pill px-4 shadow-sm" style={{ color: '#0f5132' }}>
                                        <i className="fa-solid fa-bullhorn me-2"></i>Report Issue
                                    </Link>
                                </>
                            )}
                        </Nav>

                        <Nav className="ms-auto align-items-center mt-3 mt-lg-0">
                            {user ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="d-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-1"
                                >
                                    <div className="text-light me-3 text-end lh-1">
                                        <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{user.name}</div>
                                        {userType && <small className="text-white-50" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{userType}</small>}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-sm btn-light rounded-circle text-success d-flex align-items-center justify-content-center"
                                        style={{ width: '32px', height: '32px' }}
                                        title="Logout"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </button>
                                </motion.div>
                            ) : (
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-outline-light rounded-pill px-4 fw-bold"
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.div>
    )
}

export default Header