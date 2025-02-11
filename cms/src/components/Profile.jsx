import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  ProfileContainer,
  ProfileCard,
  Title,
  Form,
  InputGroup,
  Input,
  IconWrapper,
  Button,
  ErrorMessage,
  ToggleOptions,
  PopupOverlay,
  PopupContent
} from '../styles/ProfileStyles';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.name,
        }));
      } catch (error) {
        toast.error('Failed to fetch profile data');
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';

    if (!useOTP) {
      if (!formData.oldPassword) newErrors.oldPassword = 'Old password is required';
    } else {
      if (!formData.otp) newErrors.otp = 'OTP is required';
    }

    if (formData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOTP = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/user/request-otp', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('OTP sent to your registered mobile number!');
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: formData.name,
        newPassword: formData.newPassword,
      };

      if (useOTP) {
        payload.otp = formData.otp;
      } else {
        payload.oldPassword = formData.oldPassword;
      }

      await axios.put('http://localhost:5000/api/user/profile', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowPopup(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ProfileCard>
          <Title>Edit Profile</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <IconWrapper>
                <User size={20} />
              </IconWrapper>
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
            </InputGroup>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

            <ToggleOptions>
              <button
                type="button"
                className={!useOTP ? 'active' : ''}
                onClick={() => setUseOTP(false)}
              >
                <KeyRound size={16} /> Use Old Password
              </button>
              <button
                type="button"
                className={useOTP ? 'active' : ''}
                onClick={() => setUseOTP(true)}
              >
                <ShieldCheck size={16} /> Use OTP
              </button>
            </ToggleOptions>

            {useOTP ? (
              <>
                <InputGroup>
                  <IconWrapper>
                    <ShieldCheck size={20} />
                  </IconWrapper>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    error={errors.otp}
                  />
                </InputGroup>
                {errors.otp && <ErrorMessage>{errors.otp}</ErrorMessage>}

                <Button type="button" onClick={handleRequestOTP}>
                  Request OTP
                </Button>
              </>
            ) : (
              <>
                <InputGroup>
                  <IconWrapper>
                    <Lock size={20} />
                  </IconWrapper>
                  <Input
                    type="password"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    error={errors.oldPassword}
                  />
                </InputGroup>
                {errors.oldPassword && <ErrorMessage>{errors.oldPassword}</ErrorMessage>}
              </>
            )}

            <InputGroup>
              <IconWrapper>
                <Lock size={20} />
              </IconWrapper>
              <Input
                type="password"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                error={errors.newPassword}
              />
            </InputGroup>
            {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Save Changes'}
              </Button>
            </motion.div>
          </Form>
        </ProfileCard>
      </motion.div>

      {/* Popup */}
      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <h2>Profile Updated Successfully!</h2>
            <p>Your profile changes have been saved.</p>
            <Button onClick={() => setShowPopup(false)}>OK</Button>
          </PopupContent>
        </PopupOverlay>
      )}
    </ProfileContainer>
  );
};

export default Profile;
