import { Image, ImageDownIcon, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

const GenerateImage = () => {
  const [ratio, setRatio] = useState('1:1');
  const [inputText, setInputText] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [publish, setPublish] = useState(false);
   const [Loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

const onSubmitHandler = async(e)=>{
    e.preventDefault();
    // Handle form submission logic here
    try {
      setLoading(true);
      const token = await getToken();
      const prompt = `Generate an image with a ${ratio} aspect ratio in ${style} style based on the following description: "${inputText}".`;
      const {data} = await axios.post('/api/ai/generate-image', {
        prompt,
        ratio: ratio,
        style: style,
        publish: publish
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to generate image.");
      }

    } catch (error) {
      toast.error(error.message || "An error occurred while generating the image.");
    }
    finally {
    setLoading(false);
  }
  }
  return (
    <>
       <div className='h-full flex p-6 items-start overflow-y-scroll flex-wrap gap-6 text-slate-600'>
        
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
              placeholder="Describe the image you want to generate...eg.A futuristic cityscape at sunset"
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
            <button
              disabled={Loading}
              type="submit"
              className={`mt-6 w-full bg-linear-to-l from-[#00AD45] to-[#03642a] text-white p-2 rounded-md transition-colors
             ${Loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700 cursor-pointer"}`}>


              {Loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating...
                </span>
              ) : (
                <>
                  <Image className="inline w-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-104 max-h-158'>

            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#00AD45]' />
              <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>

            {Loading &&
              (<div className='flex-1 flex justify-center items-center '>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                  <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Generating your image, please wait...</p>
                </div>
              </div>)
            }


            {!content ? (<div className='flex-1 flex justify-center items-center '>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                <ImageDownIcon className=' w-9 h-6' />
                <p> Enter a topic and click on "Generate Image" to get started</p>
              </div>
            </div>) : (
               <img src ={content} alt="Processed" className="mt-3 w-full h-full" />
            )}
          { /* right col end */}
          </div>
        </div>
   
    </>
  )
}

export default GenerateImage
