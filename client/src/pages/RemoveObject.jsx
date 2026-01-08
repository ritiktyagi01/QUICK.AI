import React, { useState } from 'react'
import { Sparkles, Eraser, Scissors } from 'lucide-react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveObject = () => {
  const [file, setFile] = useState('')
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('')

  const [Loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5 MB')
      e.target.value = '' // clear input
      setFile(null)
      return
    }

    setError('')
    setFile(selectedFile)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(Object.split('').length >1){
        toast.error("Please provide only one object name to be removed.");
        setLoading(false);
        return;
      }
      const token = await getToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('inputText', inputText);
      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        setContent(data.content);
      }
      else {
        toast.error(data.message || "Failed to process image.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while processing the image.");
    }
    finally {
      setLoading(false);
    }
    if (!file) {
      setError('Please upload a valid image')
      // Submit logic (API call will go here)
      return console.log('Uploaded file:', file)
    }

  }
  return (
    <>    
        <div className='h-full flex p-6 items-start overflow-y-scroll flex-wrap gap-6 text-slate-600'>


          {/* Left column */}
          <form
            onSubmit={onSubmitHandler}
            className='w-full max-w-lg bg-white border border-gray-200 rounded-lg p-6'
          >
            <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#9234EA]' />
              <h1 className='text-xl font-semibold'>Object Removal</h1>
            </div>

            {/* Upload Image */}
            <p className='font-semibold mt-4'>Upload Image:</p>

            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className='w-full mt-2 p-2 text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              required
            />

            <p className='text-sm text-gray-500 mt-2'>
              Supported formats: JPG, PNG. Max size: 5MB.
            </p>

            {error && (
              <p className='text-sm text-purple-500 mt-2'>{error}</p>
            )}

            {/* Input Text */}
            <p className='font-semibold mt-4'>
              Describe your image idea:
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Describe the image in detail: subject, background, lighting, mood..."
              className="w-full mt-2 p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <p className='text-sm text-gray-500 mt-2'> Please be specific about the object you want to remove.</p>

            {/* Submit Button */}
            <button
              disabled={Loading}
              type="submit"
              className={`mt-6 w-full bg-linear-to-l from-[#3C81F6] to-[#9234EA] text-white p-2 rounded-md transition-colors
              ${Loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700 cursor-pointer"}`}>
              {Loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating...
                </span>
              ) : (
                <>
                  <Eraser className="inline w-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </form>

          {/* Right column */}
          <div className='bg-white flex flex-col border border-gray-200 rounded-lg p-6 flex-1 min-w-75 min-h-96 max-w-lg max-h-150'>

            <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#3C81F6]' />
              <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>

            {!Loading && !content &&
             ( <div className='mt-4 overflow-y-scroll max-h-128 pr-2'>
                <p className='whitespace-pre-line text-gray-700'>{content}</p>
              </div>)
            }
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
                  <Eraser className=' w-9 h-6' />
                  <p> Upload an image and click on "Remove Object" to get started</p>
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

export default RemoveObject
