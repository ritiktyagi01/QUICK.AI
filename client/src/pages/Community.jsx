import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser()
  const [Loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {

      const token = await getToken();
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        setCreations(data.creations);
      }
      else {
        toast.error(data.message || "Failed to fetch creations.");
      }

    }
    catch (error) {
      toast.error(error.message || "An error occurred while fetching creations.");
      console.error("Error fetching creations:", error);
    }
    finally {
      setLoading(false);
    }
  }
  const imageLikeToggle = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post('/api/user/toggle-like-creations', { id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data.success) {
        toast.success(data.message || "Toggled like successfully.");
        await fetchCreations(); // Refresh the creations to reflect the updated like status
      }
      else {
        toast.error(data.message || "Failed to toggle like.");
      }

    } catch (error) {
      toast.error(error.message || "An error occurred while toggling like.");
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])
  return (
    <>
      <div className=' flex-1 flex flex-col h-full gap-4 p-6 '>
        <h1 className="text-xl font-bold">Your Creations</h1>
<div className=' bg-gray-300 w-full h-full  rounded-xl overflow-y-scroll'>
        {!Loading ? (
          <div>
            {
              creations.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center gap-4">
                  <img
                    src="/no-creation.png"
                    alt="No Creations"
                    className="w-40 h-7 object-contain"
                  />
                  <p className="text-gray-500">
                    No creations found in the community.
                  </p>
                </div>
              ) : (
                creations.map((creation, index) => (
                  <div
                    key={index}
                    className="relative group inline-block pl-3 pt-3 w-101 sm:max-w-1/2 lg:max-w-1/2 border-b border-gray-200"
                  >
                    <img
                      className="w-full h-auto object-cover rounded-lg"
                      src={creation.content}
                      alt={creation.title} />

                    <div className="absolute inset-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-linear-to-b from-transparent to-black/80 text-white rounded-lg">
                      <p className="text-sm hidden group-hover:block">
                        {creation.prompt} </p>

                      <div className="flex gap-1 items-center">
                        <p>{creation.likes.length}</p>
                        <Heart
                          onClick={() => imageLikeToggle(creation.id)}
                          className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id)
                            ? "fill-red-500 text-red-600" : "text-white"}`} />
                      </div>
                    </div>
                  </div>
                ))
              )
            }


          </div>
        ) : (
          <div className=' flex justify-center items-center h-full'>
            <span className="animate-spin rounded-full h-10 w-10 my-1 border-3 border-primary
      border-t-transparent"></span>
          </div>
        )
        }
        </div>
      </div>
    </>
  )

}


export default Community
