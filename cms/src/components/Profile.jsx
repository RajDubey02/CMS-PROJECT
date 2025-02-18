import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Lock } from "lucide-react";
import { motion } from "framer-motion";
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
  PopupOverlay,
  PopupContent,
  ToggleOptions
} from "../styles/ProfileStyles";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false); // Track if the password update form is visible

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email"); // Get email from storage
        const response = await axios.get(
          `http://localhost:5000/api/auth/user/profile/${email}`
        );
        setUserData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (error) {
        toast.error("Failed to fetch profile data");
      }
    };
    fetchProfile();
  }, []);

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = "Old password is required";
    if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setLoading(true);
    try {
      const email = localStorage.getItem("email");
      const payload = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      await axios.put(`http://localhost:5000/api/auth/user/profile/${email}`, payload);
      setShowPopup(true);
      setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" }); // Clear form fields
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ProfileCard>
          <Title>My Profile</Title>
          <p style={{textAlign:"right"}}> <strong >Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>

          <ToggleOptions>
            <Button onClick={() => setIsPasswordUpdate(!isPasswordUpdate)}>
              {isPasswordUpdate ? "Cancel Password Update" : "Change Password"}
            </Button>
          </ToggleOptions>

          {isPasswordUpdate && (
            <Form onSubmit={handlePasswordUpdate}>
              <InputGroup>
                <IconWrapper>
                  <Lock size={20} />
                </IconWrapper>
                <Input
                  type="password"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  error={errors.oldPassword}
                />
              </InputGroup>
              {errors.oldPassword && <ErrorMessage>{errors.oldPassword}</ErrorMessage>}

              <InputGroup>
                <IconWrapper>
                  <Lock size={20} />
                </IconWrapper>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  error={errors.newPassword}
                />
              </InputGroup>
              {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}

              <InputGroup>
                <IconWrapper>
                  <Lock size={20} />
                </IconWrapper>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={formData.confirmNewPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmNewPassword: e.target.value })
                  }
                  error={errors.confirmNewPassword}
                />
              </InputGroup>
              {errors.confirmNewPassword && <ErrorMessage>{errors.confirmNewPassword}</ErrorMessage>}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </motion.div>
            </Form>
          )}
        </ProfileCard>
      </motion.div>

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
