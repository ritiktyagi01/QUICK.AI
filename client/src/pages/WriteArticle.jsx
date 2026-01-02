import { Edit, Edit3, Sparkle, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const WriteArticle = () => {
  const [selectedLength, setSelectedLength] = useState('medium');
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('informative');
  const onSubmitHandler = (e) => {
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
              <Sparkles className=' w-6 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Article Configuration</h1>
            </div>

            {/* Article Title */}
            <p className='font-semibold mt-4'>
              Article Title:
            </p>
            <input onChange={(e) => { setInputText(e.target.value) }} value={inputText}
              type="text" className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your article title here' required />

            {/* Article length */}
            <p className='font-semibold mt-4 '>
              Article Length:
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className='ml-2 mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-wrap'>
                <option value="short">Short (300-500 words)</option>
                <option value="medium">Medium (500-1000 words)</option>
                <option value="long">Long (1000+ words)</option>
              </select>
            </p>

            {/* Writing Tone */}
            <p className='font-semibold mt-4'>Writing Tone:
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-wrap' >
                <option value="informative">Informative</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="persuasive">Persuasive</option>
                <option value="technical">Technical</option>
              </select>
            </p>
            
            {/* Submit Button */}
            <button type='submit' className='mt-6 w-full bg-linear-to-l from-[#226BFF] to-[#65ADFF] text-white p-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer'>
              <Edit3 className='inline w-5 mr-2' />
              Generate Article
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-104 max-h-158'>

            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Generated Article</h1>
            </div>

            <div className='flex-1 flex justify-center items-center '>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                <Edit className=' w-9 h-6' />
                <p> Enter a topic and click on "Generate article" to get started</p>
              </div>
            </div>

          </div>
          { /* right col end */}

        </div>
      </div>
    </>
  )
}

export default WriteArticle
