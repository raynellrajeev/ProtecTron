import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import Dropdown from './Dropdown';
import { Menu } from '@mui/icons-material';
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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />}
    {...props}
  />
))(({ theme }) => ({
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    color: 'white',
    fontFamily: 'inherit',
    padding: '0 0.5rem',
    minHeight: '32px',
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
        color: 'white',
    },
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
        fontFamily: 'inherit',
        margin: '4px 0',
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
    fontSize: variant === 'header' ? '0.9rem !important' : '0.85rem !important',
    fontWeight: variant === 'header' ? '500 !important' : '400 !important',
}));

export default function Navbar() {
    const [username, setUsername] = useState('John Doe');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const navLinks = [
        { path: '/Home', label: 'Home' },
        { path: '/Scan', label: 'Scan' },
        { path: '/Quiz', label: 'Quiz' },
        { path: '/Settings', label: 'Settings' },
    ];

    return (
        <>
            <header className='fixed w-full h-auto flex justify-between p-3 items-center z-50'>
                <Link to='/Home'>
                    <div className="logo-container-header w-32 ml-3">
                        <img className="logo-image hover:box-shadow-[0_0_15px_rgba(255,255,255,0.8)]" src={Logo} alt="ProtecTron" />
                    </div>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex w-auto h-8 flex-row gap-8 bg-white/10 rounded-[20px] justify-center items-center">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.path}
                            to={link.path} 
                            className={({ isActive }) => 
                                `px-5 text-sm ${isActive ? 'text-white' : 'text-neutral-500'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden mr-4 text-white p-2 hover:bg-white/10 rounded-full"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Menu />
                </button>

                {/* Profile Dropdown */}
                <div className="hidden md:block">
                    <Dropdown username={username} />
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="absolute border-2 border-white/25 top-full right-0 mt-2 w-auto bg-gray-950/95 rounded-lg shadow-lg py-2 mr-4 md:hidden">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.path}
                                to={link.path} 
                                className={({ isActive }) => 
                                    `block px-4 py-2 text-sm ${isActive ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="border-t border-white/25 mt-2 pt-2">
                            <div className="px-4">
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <StyledTypography variant="header" component="span"><strong>{username}</strong></StyledTypography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Link 
                                            to="/profile" 
                                            className="block px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Edit Profile
                                        </Link>
                                        <Link 
                                            to="/Welcome" 
                                            className="block w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5"
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            Sign Out
                                        </Link>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}