import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { allAPI } from '../services/allAPI'
import { useToast } from '../context/ToastContext'
import PremiumCard from '../components/common/PremiumCard'
import PremiumButton from '../components/common/PremiumButton'
import PremiumInput from '../components/common/PremiumInput'
import { motion } from 'framer-motion'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await allAPI.auth.login({
        email,
        password,
      });

      const { userType: actualUserType, user, token } = response;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', actualUserType);

      if (token) {
        localStorage.setItem('token', token);
      }

      showToast('Login successful!', 'success');

      setTimeout(() => {
        if (actualUserType === 'admin') {
          navigate('/admin');
        } else if (actualUserType === 'worker') {
          navigate('/worker');
        } else {
          navigate('/');
        }
      }, 1000);

    } catch (err) {
      console.error('Login error:', err);
      showToast(err.response?.data?.error || err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(rgba(15, 81, 50, 0.8), rgba(1, 39, 8, 0.9)), url("/images/OIP.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

      <div style={{ maxWidth: '450px', width: '100%', margin: '1rem' }}>
        <PremiumCard title="Welcome Back" icon="fa-solid fa-user-circle">
          <p className="text-center text-muted mb-4">Sign in to report issues and track progress</p>

          <form onSubmit={handleLogin}>
            <PremiumInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              icon="fa-solid fa-envelope"
              required
            />

            <div className="position-relative">
              <PremiumInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon="fa-solid fa-lock"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link text-success text-decoration-none position-absolute"
                style={{ top: '38px', right: '10px', fontSize: '0.9rem' }}
              >
                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Remember me</label>
              </div>
              <a href="#" className="text-success text-decoration-none fw-bold small">Forgot password?</a>
            </div>

            <PremiumButton type="submit" disabled={loading} variant="primary">
              {loading ? 'Signing In...' : 'Sign In'}
            </PremiumButton>

            <div className="text-center mt-4 text-muted">
              Don't have an account? <Link to="/register" className="text-success fw-bold text-decoration-none">Create one</Link>
            </div>

            <div className="mt-4 p-3 bg-light rounded shadow-sm border small text-start">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-2"><i className="fa-solid fa-key me-2 text-warning"></i>Demo Credentials</h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success">User</span>
                  <code className="text-muted">jhon@gmail.com / jhon123</code>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary bg-opacity-10 text-primary">Worker</span>
                  <code className="text-muted">abhi@gmail.com / abhi123</code>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-danger bg-opacity-10 text-danger">Admin</span>
                  <code className="text-muted">ansil@gmail.com / ansil123</code>
                </div>
              </div>
            </div>
          </form>
        </PremiumCard>
      </div>
    </div>
  )
}

export default Login