import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, User, UsersIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';


const navitems = [

    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-title', label: 'Blog Title', Icon: Hash },
    { to: '/ai/generate-image', label: 'Generate Image', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: UsersIcon },
]
const SideBar = ({ sidebar, setSideBar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <div  className={` w-60 bg-white border-r border-gray-600  flex flex-col justify-between items-center  fixed top-14 left-0 h-[calc(100vh-56px)] z-50  transform transition-transform duration-300 ease-in-out ${sidebar ? 'translate-x-0' : '-translate-x-full'} sm:static sm:translate-x-0 sm:h-auto `}>

            <div className='my-7 w-full'>
                <img onClick={() => openUserProfile()} src={user.imageUrl} alt='logo' className='w-13 rounded-full mx-auto h-12 object-cover cursor-pointer' />
                <h1 className='text-center mt-2 font-semibold'>{user.fullName}</h1>
                <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                    {navitems.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} end={to === '/ai'} onClick={() => setSideBar(false)} className={({ isActive }) => `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-linear-to-l from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>

                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                    <span className={`${isActive ? 'text-white' : ''}`}>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}

                </div>
            </div>
            <div className='mb-7 w-full flex flex-col items-center'>
                {/* <button onClick={() => openSignIn()} className='w-11/12 bg-blue-500 text-white py-2 cursor-pointer rounded-md mb-4'>Sign In</button> */}
                <button onClick={() => signOut()} className='w-11/12 bg-linear-to-l from-[#3C81F6] to-[#9234EA] text-white py-2 cursor-pointer rounded-md'>Sign Out</button>
            </div>
            <div className=' w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between '>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img onClick={() => openUserProfile()} src={user.imageUrl} alt='logo' className='w-13 rounded-full mx-auto h-12 object-cover cursor-pointer' />
                    <div onClick={() => openUserProfile()} className='text-sm'>
                        <h1 className=' text-sm font-medium'>{user.fullName}</h1>
                        {/* <p className='text-gray-500'>{user.primaryEmailAddress?.emailAddress}</p> */}
                        <p className='text-xs text-gray-400  '>
                            <Protect plan='premium' fallback='free'> Premium
                            </Protect>
                            Plan

                        </p>
                    </div>
                </div>
                <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />
            </div>
        </div>
    )


}

export default SideBar
