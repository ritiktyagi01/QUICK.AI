import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creations, setCreations] = React.useState([])
  const { user } = useUser()
  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }
  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])
  return (
    <>
      <div className=' ml-60 flex-1 flex flex-col h-full gap-4 p-6 '>
        Creations
        <div className=' bg-white w-full h-full  rounded-xl overflow-y-scroll'>
          {creations.map((creation, index) => (
            <div key={index} className=' relative group inline-block pl-3 pt-3 w-101 sm:max-w1/2 lg:max-w-1/2  border-b border-gray-200'>
              <img className='w-full h-auto object-cover rounded-lg' src={creation.content} alt={creation.title} />
              <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-linear-to-b from-transparent to-black/80 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600':'text-white'}`} />
                </div>
                </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Community
