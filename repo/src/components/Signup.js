import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SignupContainer = styled.div`
  background: ${props => props.theme.body} url('/path/to/your/ArmImage3.jpeg') no-repeat center center fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const SignupForm = styled.form`
  background: ${props => props.theme.text};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.body};
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

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

const Signup = () => {
  const [username, setUsername]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState('');
  const history = useNavigate();

  // Complete signup handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError('');

    // Prepare the data payload (do not send confirmPassword to the server)
    const payload = { username, email, password };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        // Optionally, clear the form or store user data
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      } else {
        // If response not ok, display the error message returned by the API
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
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
