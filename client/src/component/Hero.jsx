import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useClerk,useUser } from '@clerk/clerk-react';

const Hero = () => {
   const [open, setOpen] = useState(false);
   const Navigate = useNavigate();
    const { openSignIn } = useClerk();
    const { user } = useUser();
   return (
      <div className='px-4 sm:px-20 xl:px-32  relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

         <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]'>Create amazing content <br /> with <span className='text-[#5044E5]'>AI Tools</span>  </h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'> Transform your content creation with our suite of premium AI tools. Write articles , Generate image and enhance your workflow. </p>
         </div>
         <div className='flex justify-center mt-6'>
           {
            user?( <button onClick={() => Navigate('/ai')} className='bg-[#5044E5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5044E5]-600  active:scale-95 transition duration-300 cursor-pointer '>Start Creating  </button>):( <button  onClick={openSignIn} className='bg-[#5044E5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5044E5]-600  active:scale-95 transition duration-300 cursor-pointer '>Start Creating  </button>)
           }
           
            <button
               onClick={() => setOpen(true)}
               className="ml-4 bg-gray-200 text-[#5044E5] px-6 py-3 rounded-lg font-medium active:scale-95 hover:bg-gray-300 transition duration-300 cursor-pointer"
            >
               Watch Demo!
            </button>
            <p className="text-gray-500 flex justify-center items-center">    2min</p>

            {open && (
               <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center">

                  {/* Close button — OUTSIDE video */}
                  <button
                     onClick={() => setOpen(false)}
                     className="absolute top-6 right-6 text-lg font-semibold  bg-linear-to-l from-[#3C81F6] to-[#9234EA] text-white px-4 py-2 rounded-md shadow hover:bg-gray-200 cursor-pointer"
                  >
                     Close
                  </button>

                  {/* Video container */}
                  <div className="w-[80vw] h-[45vw] max-w-5xl max-h-[70vh] bg-black">
                     <iframe className='w-full h-full'

                       src="https://www.youtube.com/embed/RkYIWg5XAnI?start=5&end=390&rel=0&controls=1"

                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                     </iframe>

                  </div>

               </div>
            )}


         </div>
         <div className='flex items-center  gap-4 mt-8 mx-auto text-gray-500 -mb-15'>
            <img src={assets.user_group} alt='group image' className='h-8' /> Trusted by 10K+ Users Worldwide
         </div>
      </div>

      // for the ultimate content creation experience.
   )
}

export default Hero







