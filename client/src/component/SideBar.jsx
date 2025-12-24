import React from 'react'
import { useClerk, useUser,SignIn } from '@clerk/clerk-react';

const SideBar = (sidebar, setSideBar) => {
    const {user}= useUser();
    const {signOut, SignIn}= useClerk();
 
  return  (
    <div className={`w-60 border-r bg-white border-gray-600 flex flex-col justify-between items-center absolute bottom-0 top-14 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} translate-all duration-100 ease-in-out`}>
      <div className='my-7 w-full'>
        <img src={user.imageUrl} alt='logo' className='w-13 rounded-full mx-auto' />
        <h1 className='text-center mt-2 font-semibold'>{user.fullName}</h1>
      </div>
      <div className='mb-7 w-full flex flex-col items-center'>
        {/* <button onClick={() => openSignIn()} className='w-11/12 bg-blue-500 text-white py-2 cursor-pointer rounded-md mb-4'>Sign In</button> */}
        <button onClick={() => signOut()} className='w-11/12 bg-red-500 text-white py-2 cursor-pointer rounded-md'>Sign Out</button>
      </div>
    </div>
  ) 
  

}

export default SideBar
