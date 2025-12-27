import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
const Price = () => {
  return (
    <>
 <div className='px-4 sm:px-20 xl:px-32 my-24'>
        <div className='text-center mt-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold mb-3'>Choose Your Plan</h1>
          <p className='text-gray-500 '>Start for free and Scale up as you grow. Find the perfect plan for your content creation needs.</p>
        </div>
        <div className='mt-14 max-sm:mx-8'>
             <PricingTable />
        </div>

      </div>
      

      
    </>
  )
}

export default Price
