import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { allAPI } from '../services/allAPI'
import { useToast } from '../context/ToastContext'
import PremiumCard from '../components/common/PremiumCard'
import PremiumButton from '../components/common/PremiumButton'
import PremiumInput from '../components/common/PremiumInput'
import { motion } from 'framer-motion'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      setLoading(false);
      return;
    }

    try {
      await allAPI.auth.register({
        name,
        email,
        phone,
        password,
        address
      });

      showToast("Registration successful! Please login to continue.", "success");

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Registration error:", err)
      showToast(err.response?.data?.error || 'Server error. Please try again later.', "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-4"
      style={{
        background: 'linear-gradient(rgba(15, 81, 50, 0.8), rgba(1, 39, 8, 0.9)), url("/images/OIP.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div style={{ maxWidth: '700px', width: '100%', margin: '1rem' }}>
        <PremiumCard title="Create Account" icon="fa-solid fa-user-plus">
          <p className="text-center text-muted mb-4">Join CivicFix to make a difference in your community</p>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="fa-solid fa-user"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon="fa-solid fa-envelope"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon="fa-solid fa-phone"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  icon="fa-solid fa-location-dot"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon="fa-solid fa-lock"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon="fa-solid fa-shield-halved"
                  required
                />
              </div>
            </div>

            <PremiumButton type="submit" disabled={loading} variant="primary" className="mt-2">
              {loading ? 'Creating Account...' : 'Register'}
            </PremiumButton>

            <div className="text-center mt-4 text-muted">
              Already have an account? <Link to="/login" className="text-success fw-bold text-decoration-none">Sign in</Link>
            </div>
          </form>
        </PremiumCard>
      </div>
    </div>
  )
}

export default Register