import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'
import { YinYang } from './AllSvgs'
import Intro from './Intro'
import ArmImage from '../assets/Images/ArmImage3.jpeg'; // Import the background image

const MainContainer = styled.div`
  background: ${props => props.theme.body} url(${ArmImage}) no-repeat center center fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2, h3, h4, h5, h6 {
    font-family: 'Karla', sans-serif;
    font-weight: 500;
  }
`

const Container = styled.div`
  padding: 2rem;
`

const Contact = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`
const CONFIGURATION = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`
const WORK = styled(NavLink)`
  color: ${props => props.click ? props.theme.body : props.theme.text};
  position: absolute;
  top: 50%;
  left: calc(1rem + 2vw);
  transform: translate(-50%, -50%) rotate(-90deg);
  text-decoration: none;
  z-index: 1;
`

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const ABOUT = styled(NavLink)`
  color: ${props => props.click ? props.theme.body : props.theme.text};
  text-decoration: none;
  z-index: 1;
`
const ROBOTS = styled(NavLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  z-index: 1;
`

// New authentication buttons container
const AuthButtonsContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 2;
`

const AuthButton = styled(NavLink)`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.theme.text};
  border-radius: 4px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.text};
    color: ${props => props.theme.body};
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`

const Center = styled.button`
  position: absolute;
  top: ${props => props.click ? '85%' : '54%'};
  left: ${props => props.click ? '50%' : '73%'};
  transform: translate(-50%, -50%);
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  & > :first-child {
    animation: ${rotate} infinite 1.5s linear;
  }

  & > :last-child {
    display: ${props => props.click ? 'none' : 'inline-block'};
    padding-top: 1rem;
  }
`

const DarkDiv = styled.div`
  position: absolute;
  top: 0;
  background-color: #000;
  bottom: 0;
  right: 50%;
  width: ${props => props.click ? '50%' : '0%'};
  height: ${props => props.click ? '100%' : '0%'};
  z-index: 1;
  transition: height 0.5s ease, width 1s ease 0.5s;
`

const Main = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <MainContainer>
      <DarkDiv click={click} />
      <Container>
        <PowerButton />
        <LogoComponent theme={click ? 'dark' : 'light'} />
        <SocialIcons theme={click ? 'dark' : 'light'} />

        {/* Center YinYang button */}
        <Center click={click}>
          <YinYang
            onClick={handleClick}
            width={click ? 120 : 200}
            height={click ? 120 : 200}
            fill="#cccccc"
          />
          <span>click here</span>
        </Center>

        <Contact target="_blank" href="mailto:mzhu296@uwo.ca">
          <motion.h2
            initial={{ y: -200, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            animate={{ y: 0, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Team 21..
          </motion.h2>
        </Contact>
        <CONFIGURATION to="/configuration">
          <motion.h2
            initial={{ y: -200, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            animate={{ y: 0, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            configuration
          </motion.h2>
        </CONFIGURATION>
        <WORK to="/work" click={+click}>
          <motion.h2
            initial={{ y: -200, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            animate={{ y: 0, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Work progress
          </motion.h2>
        </WORK>
        <BottomBar>
          <ABOUT to="/about" click={+click}>
            <motion.h2
              initial={{ y: 200, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
              animate={{ y: 0, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              About our team
            </motion.h2>
          </ABOUT>
          <ROBOTS to="/robot">
            <motion.h2
              initial={{ y: 200, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
              animate={{ y: 0, transition: { type: 'spring', duration: 1.5, delay: 1 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Robot control
            </motion.h2>
          </ROBOTS>
        </BottomBar>
      </Container>

      {/* New Authentication Buttons */}
      <AuthButtonsContainer>
        <AuthButton to="/login">
          <motion.h2 whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
            Login
          </motion.h2>
        </AuthButton>
        <AuthButton to="/signup">
          <motion.h2 whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
            Sign Up
          </motion.h2>
        </AuthButton>
      </AuthButtonsContainer>

      {click ? <Intro click={click} /> : null}
    </MainContainer>
  )
}

export default Main