import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const Navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => Navigate('/')} /> 
      {
        user ? <UserButton /> : (

          <button onClick={openSignIn} className='flex items-center gap-2 rounded-full  text-sm  sm:text-base cursor-pointer bg-primary text-white px-6 py-2 sm:px-10 sm:py-2.5 active:scale-95'> Get Started <ArrowRight className='w-3 h-3 sm:w-4 sm:h-4' /> </button>
        )
      }
    </div>
  )
}

export default Navbar
