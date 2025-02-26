import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

export default function KeepMountedModal(props) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className='w-full'>
      <button onClick={() => setOpen(true)} className='w-full font-semibold text-center'>
        {props.title}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition={false}
        slotProps={{
          backdrop: {
            timeout: 0,
          }
        }}
      >
        <div className='p-4 w-96 border-2 rounded-xl border-white/25 shadow-black flex flex-col items-center justify-center bg-gray-950/95 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <p className='text-white text-xl font-bold text-center'>
            {props.title}
          </p>
          <p id="modal-description" className='text-white mt-4 text-center'>
            {props.description}
          </p>
          <Link to={props.link}>
            <button 
                onClick={() => setOpen(false)}
                className='m-4 w-36 h-9 bg-white text-black font-bold rounded-full shadow-sm hover:bg-red-600 transition-colors'
            >
                {props.buttonText}
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}
