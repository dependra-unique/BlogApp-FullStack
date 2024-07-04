import React from 'react';
import Logo from '../imgs/youtube2 logo.jpg';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/" className='flex-none w-20'>                  
        <img src={Logo} className='w-full' alt='YouTube Logo'/>
      </Link>

      <div className='absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto'>
        <input 
          type='text'
          placeholder='Search'
          className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-11'
        />

        <i className="fi fi-rr-search absolute right-[10%] md:right-auto md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
    </nav>
  );
}

export default Navbar;




