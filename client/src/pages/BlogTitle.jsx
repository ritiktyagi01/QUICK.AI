import { Edit, Edit2, Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const BlogTitle = () => {
  const [titleLength, setTitleLength] = useState('short'); 
  const [tone, setTone] = useState('informative');
  const [inputText, setInputText] = useState('');
  function onSubmitHandler(e) {
    e.preventDefault();
    // Handle form submission logic here
  }
  return (
    <>
      <div className='h-auto overflow-y-scroll p-6'>
        <div className='mx-60 flex items-start flex-wrap gap-6 text-slate-600'>

          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full min-h-96 max-h-150 max-w-lg bg-white border border-gray-200 rounded-lg p-6'>
            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#8E37EB]' />
              <h1 className='text-xl font-semibold'>AI Title Generator</h1>
            </div>

            {/* Keyword */}
            <p className='font-semibold mt-4'>
              Keyword:
            </p>
            <input onChange={(e) => { setInputText(e.target.value) }} value={inputText}
              type="text" className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your keyword here'required />

            {/* Title Length */}
            <p className="font-semibold mt-4">Title Length:</p>
            <select
              value={titleLength}
              onChange={(e) => setTitleLength(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="short">Short (3–6 words)</option>
              <option value="medium">Medium (6–10 words)</option>
              <option value="long">Long (10–15 words)</option>
            </select>
            <br />

            {/* Writing Tone */}
            <p className='font-semibold mt-4'>Writing Tone:
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-wrap' >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
              </select>
            </p>

            {/* Submit Button */}
            <button type='submit' className='mt-6 w-full bg-linear-to-l from-[#226BFF] to-[#65ADFF] text-white p-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer'>
              <Hash className='inline w-5 mr-2' />
              Generate Title
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-96 max-h-150'>

            <div className='flex items-center gap-3'>
              <Hash className=' w-6 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Generated Title</h1>
            </div>

            <div className='flex-1 flex justify-center items-center '>
              <div className='text-sm ml-4 flex flex-col items-center gap-2 text-gray-500'>
                <Hash className=' w-9 h-6' />
                <p> Enter a topic and click on "Generate title" to get started</p>
              </div>
            </div>

          </div>
          { /* right col end */}

        </div>
      </div>
    </>
  )
}

export default BlogTitle
