import React from 'react'
import { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Diamond, GemIcon, Sparkle } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItems from '../component/CreationItems';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
const DashBoard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const getDashboardData = async () => {
    // Fetch dashboard data logic here
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      }
      else {
        toast.error(data.message || "Failed to fetch dashboard data.");
      }
    }
    catch (error) {
      toast.error(error.message || "An error occurred while fetching dashboard data.");
    }
    setLoading(false);
  }
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className='h-full overflow-y-scroll p-6 '>
      <div className='flex flex-wrap gap-8 justify-start '>
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
              <Protect plan='premium' fallback='Free'> Premium
              </Protect>
            </h2>
          </div>
          <div className='w-10 h-10 bg-linear-to-br from-[#ff61C5] to-[#9E53EE] rounded-lg flex justify-center items-center'>
            <GemIcon className='text-white w-5' />
          </div>
        </div>
      </div>
      {/* finish active plan code */}

      {
        loading ? (
          <div className="flex justify-center items-center h-3/4">
            <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4  mt-8">
            <p className="mt-4 mb-5">Recent Creations</p>

            {creations.length === 0 ? (
              <p className="text-gray-500 text-center mt-10 ">
                You have not created anything yet.
              </p>
            ) : (
              creations.map(item => (
                <CreationItems key={item.id} item={item} />
              ))
            )}
          </div>
        )
      }


    </div >

  )
}

export default DashBoard;
