import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import BackgroundImage from '../assets/Images/ArmImage3.jpeg'; // Reuse your background image

// Container for the signup page with background image
const SignupContainer = styled.div`
  background: ${props => props.theme.body} url(${BackgroundImage}) no-repeat center center fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

// Styled form wrapper
const SignupForm = styled.form`
  background: ${props => props.theme.text};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 320px;
  display: flex;
  flex-direction: column;
`;

// Title of the form
const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.body};
`;

// Styled input fields
const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

// Styled motion button for signup
const Button = styled(motion.button)`
  padding: 0.75rem;
  background: ${props => props.theme.body};
  color: ${props => props.theme.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease;
`;

// Container for the login link
const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.body};
  font-size: 0.9rem;
`;

const Signup = () => {
  // Local state to store form values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission (replace with your signup logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up with:', { username, email, password, confirmPassword });
    // Add your signup logic here (e.g., API call)
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Sign Up
        </Button>
        <LinkContainer>
          Already have an account?{' '}
          <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Login
          </NavLink>
        </LinkContainer>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
