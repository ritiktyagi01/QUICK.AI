/*import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const Aitools = () => {
  const Navigate = useNavigate()
  const{user}= useUser();
  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
     <div className='text-center'>
       <h2 className='text-2xl sm:text-3xl font-bold mb-3'>Powerful AI tools</h2>
      <p className='text-gray-600'>Everything you need to create, enhance, and optimize your content with cutting-edge AI Technology </p>  </div>


      <div className='flex flex-wrap mt-10 justify-center'>
        {
          AiToolsData.map((tool,index)=>(
           <div key={index} className=' shadow-lg max-w-xs bg-[#FDFDFE] border border-gray-100 hover:-translate-y-1.25 translate-all-duration-300 cursor-pointer rounded-lg p-8 m-4 w-64'onClick={()=>user && Navigate(tool.path)} >
            <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl mb-4' style={ {background:`linear-gradient(to bottom, ${tool.bg.from} , ${tool.bg.to} )`}}/>
          
            <h3 className='text-lg font-semibold mb-2'>{tool.title}</h3>
            <p className='text-gray-600 text-sm'>{tool.description}</p>


      </div>
        ))
        }

   </div>



    </div>
  )
}

export default Aitools */




import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import Testimonial from './Testimonial'
import Price from './Price'

const Aitools = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  const handleNavigation = (path) => {
    if (!user) {
      openSignIn()
      return
    }
    navigate(path)
  }

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-14'>
      <div className='text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-3 text-black'>
          Powerful AI Tools
        </h1>
        <p className='text-gray-600'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className='flex flex-wrap mt-10 justify-center'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(tool.path)}
            className='shadow-lg max-w-xs bg-[#FDFDFE] border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-lg p-8 m-4 w-64'
          >
            <tool.Icon
              className='w-12 h-12 p-3 text-white rounded-xl mb-4'
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
              }}
            />

            <h3 className='text-lg font-semibold mb-2'>{tool.title}</h3>
            <p className='text-gray-600 text-sm'>{tool.description}</p>
          </div>
        ))}<br></br>
      </div>




      <div className='px-4 sm:px-20 xl:px-32 my-24'>
        <div className='text-center mt-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold mb-3'>Loved by Creators</h1>
          <p className='text-gray-500 '>Don't take just our word for it. Here are some testimonials from our users.</p>
        </div>
      </div>
      
     
    </div>
  )
}

export default Aitools

