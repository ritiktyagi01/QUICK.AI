import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useState } from 'react';

const Hero = () => {
   const [open, setOpen] = useState(false);
   const Navigate = useNavigate();
   return (
      <div className='px-4 sm:px-20 xl:px-32  relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

         <div className='text-center mb-6'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]'>Create amazing content <br /> with <span className='text-primary'>AI Tools</span>  </h1>
            <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'> Transform your content creation with our suite of premium AI tools. Write articles , Generate image and enhance your workflow. </p>
         </div>
         <div className='flex justify-center mt-6'>
            <button onClick={() => Navigate('/ai')} className='bg-primary  text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600  active:scale-95 transition duration-300 cursor-pointer '>Start Creating  </button>
            <button
               onClick={() => setOpen(true)}
               className="ml-4 bg-gray-200 text-primary px-6 py-3 rounded-lg font-medium active:scale-95 hover:bg-gray-300 transition duration-300 cursor-pointer"
            >
               Watch Demo!
            </button>
            <p className="text-gray-500 flex justify-center items-center">    2min</p>

            {open && (
               <div className="fixed inset-0 bg-slate-100 flex items-center justify-center">
                  <div className="relative w-200 h-112.5 bg-black">
                     <button
                        onClick={() => setOpen(false)}
                        className="absolute top-2 right-2 text-white text-xl"
                     >
                        
                     </button>

                     <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/2Pta29pxTbk"
                        title="Demo Video"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                     />
                  </div>
               </div>
            )}

         </div>
         <div className='flex items-center  gap-4 mt-8 mx-auto text-gray-500'>
            <img src={assets.user_group} alt='group image' className='h-8' /> Trusted by 10K+ Users Worldwide
         </div>
      </div>
   )
}

export default Hero
