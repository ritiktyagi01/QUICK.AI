import React, { useCallback, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { LoaderCircle, Menu, X } from 'lucide-react'
import Sidebar from '../component/SideBar'
import { useUser, SignIn } from '@clerk/clerk-react'

const Layout = () => {
  const Navigate = useNavigate()
  const [sidebar, setSideBar] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  console.log('Clerk useUser:', { isLoaded, isSignedIn, user });
  //   useClerk() does NOT return SignIn

  // SignIn is a React component, not a hook value

  // React tries to render undefined → application crashes
  //const {SignIn} = useClerk();  
  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center h-screen bg-[url()}'>
        Loading...
        <LoaderCircle />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-start justify-start  h-screen '>

      <nav className='flex justify-between items-center px-8 min-h-14 w-full border-b border-gray-500'>
        <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt='logo' onClick={() => Navigate('/')} />
        {
          sidebar ? <X onClick={() => setSideBar(false)} className='w-6 h-6 text-gray-600  sm:hidden' />
            : <Menu onClick={() => setSideBar(true)} className='w-6 h-6 cursor-pointer sm:hidden text-gray-600 ' />
        }
      </nav>
      <div className=' flex-1 w-full flex h-[calc(100vh-56px)] '>
        <Sidebar sidebar={sidebar} setSideBar={setSideBar} />
        <div className='flex-1 bg-[#F4F7FB] '>
          <Outlet />
        </div>
       </div>
    </div>
    
  );
}

export default Layout
