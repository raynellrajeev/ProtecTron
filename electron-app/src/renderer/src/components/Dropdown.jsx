import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    Bars3Icon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    PowerIcon,
    UserIcon
} from '@heroicons/react/16/solid';

export default function Dropdown(props) {
  return (
    <div className=" top-24 w-auto p-0 text-right">
      <Menu >
        <MenuButton className="inline-flex items-center gap-2 ml-24 rounded-md py-1.5 px-3 text-sm/6  text-white shadow-white/10 ">
          <Avatar sx={{ width: 25, height: 25 }}  />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="border-2 border-white/25 mt-6 ml-0 w-52 origin-top-right rounded-xl  bg-gray-950/95 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
                      <Link to="/Login">
                          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <UserIcon className="size-4 fill-white/30" />
                          <div className="flex flex-col flex-start text-left">  
                            <p>Signed in as <span><strong>{props.username}</strong></span></p>
                            <p className="text-xs" >Switch Account</p>
                          </div>
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">A</kbd>
            </button>
                      </Link>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
                      <Link to="/Profile">
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Edit Profile
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">E</kbd>
            </button>
                      </Link>
          </MenuItem>
          
          <MenuItem>
            <Link to='/Welcome'>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <PowerIcon className="size-4 fill-white/30" />
                Sign Out
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">Q</kbd>
                </button>
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
