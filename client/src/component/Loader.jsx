import React from 'react'

const Loader = () => {
  return (
    <>
     <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex items-center justify-center bg-slate-300">
      <div className=" h-11 w-11 border-3 animate-spin rounded-full  border-gray-500 border-t-black"></div>
    </div>
    </>
    
  )
}

export default Loader;