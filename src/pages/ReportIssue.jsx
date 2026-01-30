import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import PremiumCard from '../components/common/PremiumCard';
import PremiumButton from '../components/common/PremiumButton';
import PremiumInput from '../components/common/PremiumInput';
import { motion } from 'framer-motion';

function ReportIssue() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    pincode: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const userTypeData = localStorage.getItem('userType');

    if (!userData || !userTypeData) {
      showToast('Please login to report an issue', 'error');
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('pincode', formData.pincode);
      // Add user ID to the form data
      formDataToSend.append('userId', user.id);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.post('http://localhost:3000/report', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      showToast('Issue reported successfully!', 'success');

      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to submit issue. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'var(--secondary-green)' }}>
        <PremiumCard className="text-center" style={{ maxWidth: '500px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <i className="fa-solid fa-circle-check text-success mb-4" style={{ fontSize: '5rem' }}></i>
          </motion.div>
          <h2 className="text-success fw-bold mb-3">Report Submitted!</h2>
          <p className="text-muted mb-4">Thank you for your contribution. We've received your report and will look into it shortly.</p>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Redirecting...</span>
          </div>
        </PremiumCard>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-5"
      style={{
        background: 'linear-gradient(rgba(240, 242, 245, 0.9), rgba(240, 242, 245, 0.9)), url("/images/city-bg.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <PremiumCard title="Report an Issue" icon="fa-solid fa-bullhorn">
          <p className="text-center text-muted mb-5">Help us maintain our city by reporting infrastructure issues</p>

          <Form onSubmit={handleSubmit}>
            {/* Title Selection */}
            <div className="mb-4">
              <label className="form-label fw-bold text-success">Issue Category</label>
              <div className="input-group shadow-sm rounded-3 overflow-hidden border">
                <span className="input-group-text bg-white border-0 text-success ps-3"><i className="fa-solid fa-list"></i></span>
                <Form.Select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other') {
                      setFormData(prev => ({ ...prev, title: '' }));
                    } else if (val) {
                      setFormData(prev => ({ ...prev, title: val }));
                    }
                  }}
                  className="form-control border-0 py-3"
                  style={{ boxShadow: 'none' }}
                  value={['Broken Streetlight', 'Pothole on Road', 'Water Leakage', 'Garbage Accumulation', 'Traffic Signal Issue', 'Road Blockage'].includes(formData.title) ? formData.title : (formData.title ? 'Other' : '')}
                >
                  <option value="">Select a common issue...</option>
                  <option value="Broken Streetlight">Broken Streetlight</option>
                  <option value="Pothole on Road">Pothole on Road</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Garbage Accumulation">Garbage Accumulation</option>
                  <option value="Traffic Signal Issue">Traffic Signal Issue</option>
                  <option value="Road Blockage">Road Blockage</option>
                  <option value="Other">Other (specify below)</option>
                </Form.Select>
              </div>
            </div>

            {/* Custom Title Input if needed */}
            <PremiumInput
              label="Issue Specifics"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Broken Streetlight on 5th Ave"
              icon="fa-solid fa-heading"
              required
            />

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold text-success">Description</label>
              <div className="input-group shadow-sm rounded-3 overflow-hidden border">
                <span className="input-group-text bg-white border-0 text-success ps-3 pt-3 align-items-start"><i className="fa-solid fa-align-left"></i></span>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Provide more details about the issue..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border-0 py-3"
                  style={{ boxShadow: 'none', resize: 'none' }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Near City Center"
                  icon="fa-solid fa-location-dot"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <PremiumInput
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 679577"
                  icon="fa-solid fa-map-pin"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="form-label fw-bold text-success">Upload Photo</label>
              <div className={`border-2 border-dashed rounded-4 p-4 text-center ${formData.image ? 'border-success bg-light' : 'border-secondary'}`}
                style={{ borderStyle: 'dashed', transition: 'all 0.3s' }}>

                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="imageUpload"
                  className="d-none"
                />

                {formData.image ? (
                  <div className="position-relative">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="img-fluid rounded-3 shadow-sm"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                      onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                    <p className="mt-2 text-success fw-bold"><i className="fa-solid fa-check-circle me-1"></i> {formData.image.name}</p>
                  </div>
                ) : (
                  <label htmlFor="imageUpload" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                    <i className="fa-solid fa-cloud-arrow-up text-secondary mb-3" style={{ fontSize: '3rem' }}></i>
                    <p className="mb-0 text-muted">Click to upload an image of the issue</p>
                    <small className="text-muted">(Optional but recommended)</small>
                  </label>
                )}
              </div>
            </div>

            <PremiumButton type="submit" disabled={loading} variant="primary" className="py-3 fs-5">
              {loading ? 'Submitting Report...' : 'Submit Report'}
            </PremiumButton>
          </Form>
        </PremiumCard>
      </div>
    </div>
  );
}

export default ReportIssue;