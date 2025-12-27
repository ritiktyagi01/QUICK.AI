import React from 'react'
import { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Diamond, GemIcon, Sparkle } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItems from '../component/CreationItems';

const DashBoard = () => {
  const [creations, setCreations] = useState([]);
  const getDashboardData = async () => {
    // Fetch dashboard data logic here
    setCreations(dummyCreationData); // Update with fetched data
  }
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className='h-full overflow-y-scroll p-6 '>
      <div className='flex flex-wrap gap-8 justify-start mx-60'>
        {/* <today creation > */}
        <div className='flex justify-between items-center p-4 px-6 border border-gray-300 bg-white rounded-xl  shadow-md w-72 '>
          <div className='text-slate-600'>
            <p className="text-sm font-semibold">Today's Creation</p>
            <h2 className='text-lg font-semibold'> {creations.length}</h2>
          </div>
          <div className=''>
            <div className='w-10 h-10 bg-linear-to-br from-[#3588F2] to-[#0BB0D7] rounded-lg flex justify-center items-center'>
              <Sparkle className='text-white w-5' />
            </div>

          </div>
        </div>
        {/* finish creation code */}

        {/* <active plan> */}
        <div className='flex justify-between items-center p-4 px-6 border border-gray-300 bg-white rounded-xl  shadow-md w-72 '>
          <div className='text-slate-600'>
            <p className="text-sm font-semibold">Active Plan</p>
            <h2 className='text-lg font-semibold'>
              <Protect plan='premium' fallback='Free'> Premium Plan
              </Protect>
            </h2>
          </div>
          <div className='w-10 h-10 bg-linear-to-br from-[#ff61C5] to-[#9E53EE] rounded-lg flex justify-center items-center'>
            <GemIcon className='text-white w-5' />
          </div>
        </div>
        {/* finish active plan code */}
      </div>
      <div className='space-y-4 mx-60 mt-8'>
        <p className='mt-4 mb-5 '> Recent Creation </p>
        {
          creations.map((item) => <CreationItems key={item.id} item={item} />)
        }
      </div>
    </div>

  )
}

export default DashBoard;
