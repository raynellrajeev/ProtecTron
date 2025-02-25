import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: ` ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    marginBottom: '1rem',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

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
        color: 'white',
    },
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
        fontFamily: 'inherit',
        margin: '8px 0',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '0.25rem 0.75rem',
    color: 'lightgray',
    fontFamily: 'inherit',
    '& .MuiTypography-root': {
        fontFamily: 'inherit',
    },
    '& form': {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '400px',
    },
    '& input': {
        width: '100%',
    },
    '& button': {
        alignSelf: 'flex-start',
    }
}));

const StyledTypography = styled(Typography)(({ variant }) => ({
    fontFamily: 'inherit !important',
    fontSize: variant === 'header' ? '1.1rem !important' : '0.9rem !important',
    fontWeight: variant === 'header' ? '500 !important' : '400 !important',
}));

export default function Profile() {
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [mobileNumber, setMobileNumber] = useState('+1234567890');
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex flex-col min-h-screen py-8'>
                <div className="bg-[rgba(48,48,48,0.3)] w-[95%] md:w-[85%] lg:w-3/4 mx-auto mt-24 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-4 md:p-8 lg:p-[30px_40px]">
                    <div className='flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start'>
                        <Avatar 
                            sx={{ 
                                width: 'min(15vw, 100px)',
                                height: 'min(15vw, 100px)',
                                minWidth: '80px',
                                minHeight: '80px'
                            }} 
                        />
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left">
                            {username}
                            <div className='text-m md:text-lg lg:text-xl text-gray-400'>{email}</div>
                            <div className='text-m md:text-lg lg:text-xl text-gray-400'>{mobileNumber}</div>
                        </div>
                    </div>
                    <div className='mt-8 md:mt-12 lg:mt-16 space-y-4'>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <StyledTypography variant="header" component="span">Change Username</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form action="" className="flex flex-col gap-3">
                                    <input 
                                        type="text" 
                                        placeholder='New Username' 
                                        className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30" 
                                    />
                                    <button 
                                        type='submit' 
                                        className="w-20 h-8 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                    >
                                        Change
                                    </button>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <StyledTypography variant="header" component="span">Change Password</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form action="" className="flex flex-col gap-3">
                                    <input 
                                        type="password" 
                                        placeholder='Current Password' 
                                        className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30" 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder='New Password' 
                                        className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30" 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder='Confirm New Password' 
                                        className="w-full md:w-3/4 lg:w-1/2 h-8 bg-transparent border border-white/20 outline-none rounded-[40px] text-sm text-white px-4 placeholder-white/50 focus:border-white/30" 
                                    />
                                    <button 
                                        type='submit' 
                                        className="w-20 h-8 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-sm font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                    >
                                        Change
                                    </button>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <StyledTypography variant="header" component="span">Change Email</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                               
                                <form action="">
                                    <input type="email" placeholder='New Email' className="w-full md:w-3/4 lg:w-1/2 h-10 bg-transparent border border-white/20 outline-none rounded-[40px] text-base text-white px-5 placeholder-white/50 focus:border-white/30"  />
                                    <button type='submit' className="w-20 h-6 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer  hover:scale-105 transition-all duration-300">Change</button>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                <StyledTypography variant="header" component="span">Change Mobile Number</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                
                                <form action="">
                                    <input type="text" placeholder='New Mobile Number' className="w-full md:w-3/4 lg:w-1/2 h-10 bg-transparent border border-white/20 outline-none rounded-[40px] text-base text-white px-5 placeholder-white/50 focus:border-white/30"  />
                                    <button type='submit' className="w-20 h-6 bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer  hover:scale-105 transition-all duration-300">Change</button>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}