import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink, useHistory } from 'react-router-dom';
import BackgroundImage from '../assets/Images/ArmImage3.jpeg'; // Reuse your background image

// Container for the login page with background image
const LoginContainer = styled.div`
  background: ${props => props.theme.body} url(${BackgroundImage}) no-repeat center center fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

// Styled form wrapper
const LoginForm = styled.form`
  background: ${props => props.theme.text};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 300px;
  display: flex;
  flex-direction: column;
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

// Styled motion button for login
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

// Title of the form
const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.body};
`;

// Container for the sign-up link
const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.body};
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const Login = () => {
  // Local state to store email and password values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  // Complete login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save the token and redirect after a short delay
        localStorage.setItem('token', data.token);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          history.push('/dashboard'); // Redirect to a protected/dashboard page
        }, 2000);
      } else {
        // If not OK, show the error message from backend
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
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
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Log In
        </Button>
        <LinkContainer>
          Don't have an account?{' '}
          <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Sign Up
          </NavLink>
        </LinkContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
