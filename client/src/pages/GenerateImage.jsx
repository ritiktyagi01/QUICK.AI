import { Image, ImageDownIcon, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const GenerateImage = () => {
  const [ratio, setRatio] = useState('1:1');
  const [inputText, setInputText] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [publish, setPublish] = useState(false);
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
              <Sparkles className=' w-6 text-[#00AD45]' />
              <h1 className='text-xl font-semibold'>AI Image Generator</h1>
            </div>

            {/* Input Text */}
            <p className='font-semibold mt-4'>
              Describe your image idea:
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Describe the image in detail: subject, background, lighting, mood..."
              className="w-full mt-2 p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Aspect Ratio */}
            <p className="font-semibold mt-4">Aspect Ratio:</p>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
            >
              <option value="1:1">Square (1:1)</option>
              <option value="16:9">Landscape (16:9)</option>
              <option value="9:16">Portrait (9:16)</option>
              <option value="4:5">Instagram (4:5)</option>
            </select>


            {/* Style */}
            <p className='font-semibold mt-4'>Style:
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-wrap' >
                <option value="realistic">Realistic</option>
                <option value="ghibli style">Ghibli Style</option>
                <option value="anime style">Anime Style</option>
                <option value="cartoon style">Cartoon Style</option>
                <option value="portait style">Portait Style</option>
                <option value="3d">3D Render</option>
                <option value="pixel">Pixel Art</option>
              </select>
            </p>

            {/* Publish Option */}
            <div className='mt-6  flex items-center gap-2'>
              <label className='relative cursor-pointer'>
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(e) => setPublish(e.target.checked)}
                  className='sr-only peer'
                />
                <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-sm'>Make this image Public</p>
            </div>


            {/* Submit Button */}
            <button type='submit' className='mt-6 w-full bg-linear-to-l from-[#00AD45] to-[#04FF50] text-white p-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer'>
              <ImageDownIcon className='inline w-5 mr-2' />
              Generate Image
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-104 max-h-158'>

            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#00AD45]' />
              <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>

            <div className='flex-1 flex justify-center items-center '>
              <div className='text-sm flex flex-col items-center gap-2 text-gray-500'>
                <Image className=' w-9 h-6' />
                <p> Enter a topic and click on "Generate image" to get started</p>
              </div>
            </div>

          </div>
          { /* right col end */}

        </div>
      </div>
    </>
  )
}

export default GenerateImage
