import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { useAuth } from '../context/AuthContext'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: ` ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  marginBottom: '1rem',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.8rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  color: 'white',
  fontFamily: 'inherit',
  padding: '0 0.75rem',
  minHeight: '40px',
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    color: 'white'
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)'
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    fontFamily: 'inherit',
    margin: '8px 0'
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '0.25rem 0.75rem',
  color: 'lightgray',
  fontFamily: 'inherit',
  '& .MuiTypography-root': {
    fontFamily: 'inherit'
  },
  '& form': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    maxWidth: '400px'
  },
  '& input': {
    width: '100%'
  },
  '& button': {
    alignSelf: 'flex-start'
  }
}))

const StyledTypography = styled(Typography)(({ variant }) => ({
  fontFamily: 'inherit !important',
  fontSize: variant === 'header' ? '1.1rem !important' : '0.9rem !important',
  fontWeight: variant === 'header' ? '500 !important' : '400 !important'
}))

export default function Profile() {
  const { user, logout } = useAuth()
  useEffect(() => {
    console.log('User updated:', user)
  }, [user])

  const [expanded, setExpanded] = useState()

  const [profileInput, setProfileInput] = useState({
    username: user?.username || '',
    password: '',
    email: '',
    number: ''
  })

  function handleClick(event) {
    event.preventDefault()
    const { value, name } = event.target
    console.log(name, value)
  }
  function handleInput(event) {
    const { value, name } = event.target
    console.log(name, value)
    setProfileInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-screen py-8">
        <div className="bg-[rgba(48,48,48,0.3)] w-[95%] md:w-[85%] lg:w-3/4 mx-auto mt-24 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-4 md:p-8 lg:p-[30px_40px]">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start">
            <Avatar
              sx={{
                width: 'min(15vw, 100px)',
                height: 'min(15vw, 100px)',
                minWidth: '80px',
                minHeight: '80px'
              }}
            />
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left">
              {user?.username || 'User'}
              <div className="text-m md:text-lg lg:text-xl text-gray-400">
                {profileInput.email || 'Your mail ID'}
              </div>
              <div className="text-m md:text-lg lg:text-xl text-gray-400">
                {profileInput.number || 'Your mobile no.'}
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-12 lg:mt-16 space-y-4">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <StyledTypography variant="header" component="span">
                  Change Username
                </StyledTypography>
              </AccordionSummary>
              <AccordionDetails>
                <form action="" className="flex flex-col gap-3">
                  <input
                    name="username"
                    type="text"
                    onChange={handleInput}
                    placeholder="New Username"
                    value={profileInput.username}
                    className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30"
                  />
                  <button
                    name="username"
                    type="submit"
                    onClick={handleClick}
                    className="w-20 h-8 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    Change
                  </button>
                </form>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <StyledTypography variant="header" component="span">
                  Change Password
                </StyledTypography>
              </AccordionSummary>
              <AccordionDetails>
                <form action="" className="flex flex-col gap-3">
                  <input
                    name="oldPassword"
                    type="password"
                    onChange={handleInput}
                    placeholder="Current Password"
                    className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30"
                  />
                  <input
                    name="newPassword"
                    type="password"
                    onChange={handleInput}
                    placeholder="New Password"
                    className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30"
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    onChange={handleInput}
                    placeholder="Confirm New Password"
                    className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30"
                  />
                  <button
                    name="password"
                    type="submit"
                    onClick={handleClick}
                    className="w-20 h-8 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                  >
                    Change
                  </button>
                </form>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <StyledTypography variant="header" component="span">
                  Change Email
                </StyledTypography>
              </AccordionSummary>
              <AccordionDetails>
                <form action="">
                  <input
                    name="email"
                    type="email"
                    onChange={handleInput}
                    placeholder="New Email"
                    value={profileInput.email}
                    className="w-full md:w-3/4 lg:w-1/2 h-10 bg-transparent border border-white/20 outline-none rounded-[40px] text-base text-white px-5 placeholder-white/50 focus:border-white/30"
                  />
                  <button
                    name="email"
                    type="submit"
                    onClick={handleClick}
                    className="w-20 h-6 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer  hover:scale-105 transition-all duration-300"
                  >
                    Change
                  </button>
                </form>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                <StyledTypography variant="header" component="span">
                  Change Mobile Number
                </StyledTypography>
              </AccordionSummary>
              <AccordionDetails>
                <form action="">
                  <input
                    name="number"
                    type="text"
                    onChange={handleInput}
                    placeholder="New Mobile Number"
                    value={profileInput.number}
                    className="w-full md:w-3/4 lg:w-1/2 h-10 bg-transparent border border-white/20 outline-none rounded-[40px] text-base text-white px-5 placeholder-white/50 focus:border-white/30"
                  />
                  <button
                    name="number"
                    type="submit"
                    onClick={handleClick}
                    className="w-20 h-6 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer  hover:scale-105 transition-all duration-300"
                  >
                    Change
                  </button>
                </form>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
