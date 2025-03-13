import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import KeepMountedModal from '../components/Modal';

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
    const [expanded, setExpanded] = useState();
    const [toggle, setToggle] = useState({
        Threats: true,
        Updates: true,
        Security: true,
        Reports: true,
        RealTimeProtection: true,
        AutoScan: true,
        AutoUpdate: true,
        Firewall: true
    });


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleToggle = (type) => () => {
        setToggle(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex flex-col min-h-screen py-8'>
                <div className="bg-[rgba(48,48,48,0.3)] w-[65%] md:w-[50%] lg:w-[40%] mx-auto mt-24 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-4 md:p-8 lg:p-[30px_40px]">
                    <div className='flex flex-row items-center gap-4'>
                        <Settings /> 
                        <h1 className='text-l md:text-xl lg:text-2xl font-bold'>Settings</h1>
                    </div>
                    <div className='mt-8 md:mt-12 lg:mt-16 space-y-8'>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <StyledTypography variant="header" component="span">Security Settings</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                    <p>Real-Time Protection</p>
                                    <button 
                                        onClick={handleToggle('RealTimeProtection')} 
                                        className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                            toggle.RealTimeProtection 
                                            ? 'bg-[#2196F3] text-white' 
                                            : 'bg-white/10 text-white/50'
                                        }`}
                                    >
                                        {toggle.RealTimeProtection ? 'Enabled' : 'Disabled'}
                                    </button>
                                 </div>
                               
                                    <div className='flex justify-between items-center'>
                                    <p>Auto Scan</p>
                                    <button 
                                        onClick={handleToggle('AutoScan')} 
                                        className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                            toggle.AutoScan 
                                            ? 'bg-[#2196F3] text-white' 
                                            : 'bg-white/10 text-white/50'
                                        }`}
                                    >
                                        {toggle.AutoScan ? 'Enabled' : 'Disabled'}
                                        </button>
                                    
                                </div>
                                    <div className='flex justify-between items-center'>
                                        <p>Auto Update</p>
                                    <button 
                                        onClick={handleToggle('AutoUpdate')} 
                                        className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                            toggle.AutoUpdate 
                                            ? 'bg-[#2196F3] text-white' 
                                            : 'bg-white/10 text-white/50'   
                                        }`}
                                    >
                                        {toggle.AutoUpdate ? 'Enabled' : 'Disabled'}
                                        </button>
                                    
                                </div>
                                
                                    <div className='flex justify-between items-center'>
                                        <p>Firewall</p>
                                        <button 
                                        onClick={handleToggle('Firewall')} 
                                        className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                            toggle.Firewall 
                                            ? 'bg-[#2196F3] text-white' 
                                            : 'bg-white/10 text-white/50'
                                        }`}
                                    >
                                        {toggle.Firewall ? 'Enabled' : 'Disabled'}
                                        </button>
                                    
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <StyledTypography variant="header" component="span">Notifications</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <p>Threats</p>
                                        <button 
                                            onClick={handleToggle('Threats')} 
                                            className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                                toggle.Threats 
                                                ? 'bg-[#2196F3] text-white' 
                                                : 'bg-white/10 text-white/50'
                                            }`}
                                        >
                                            {toggle.Threats ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p>Updates</p>
                                        <button 
                                            onClick={handleToggle('Updates')} 
                                            className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                                toggle.Updates 
                                                ? 'bg-[#2196F3] text-white' 
                                                : 'bg-white/10 text-white/50'
                                            }`}
                                        >
                                            {toggle.Updates ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p>Security</p>
                                        <button 
                                            onClick={handleToggle('Security')} 
                                            className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                                toggle.Security 
                                                ? 'bg-[#2196F3] text-white' 
                                                : 'bg-white/10 text-white/50'
                                            }`}
                                        >
                                            {toggle.Security ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p>Reports</p>
                                        <button 
                                            onClick={handleToggle('Reports')} 
                                            className={`text-sm px-3 py-1 rounded-full transition-colors ${
                                                toggle.Reports 
                                                ? 'bg-[#2196F3] text-white' 
                                                : 'bg-white/10 text-white/50'
                                            }`}
                                        >
                                            {toggle.Reports ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <StyledTypography variant="header" component="span">About</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='flex flex-col gap-4'>
                                    <p>App Name <span className='text-white/50'>ProtecTron Antivirus</span></p>
                                    <p>Version <span className='text-white/50'>1.0.0</span></p>
                                    <p>Developer <span className='text-white/50'>ProtecTron</span></p>
                                    <p>Release Date <span className='text-white/50'>2025-03-30</span></p>
                                    <p>License <span className='text-white/50'>Open Source</span></p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                <StyledTypography variant="header" component="span">Account</StyledTypography>
                            </AccordionSummary>
                            <AccordionDetails className='flex flex-col gap-4'>
                                <Link to='/Welcome'>
                                    <button className='w-36 h-9 bg-white text-black font-bold rounded-full shadow-sm hover:bg-red-600 transition-all duration-300"'>
                                        Sign Out
                                    </button>
                                </Link>
                                <button className='w-36 h-9 bg-white text-black font-bold rounded-full shadow-sm hover:bg-red-600 transition-all duration-300"'>
                                    <KeepMountedModal title='Delete Data' description='Are you sure you want to delete your data?' buttonText='Delete Data' link='/Welcome' />
                                </button>
                             
                                <button className='w-36 h-9 bg-white text-black font-bold rounded-full shadow-sm hover:bg-red-600 transition-all duration-300"'>
                                    <KeepMountedModal title='Delete Account' description='Are you sure you want to delete your account?' buttonText='Delete Account' link='/Welcome' />
                                </button>
                               
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}