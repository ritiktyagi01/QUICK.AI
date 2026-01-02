import React, { useState } from 'react'
import { Sparkles, Eraser, Scissors } from 'lucide-react'

const RemoveObject = () => {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

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

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!file) {
      setError('Please upload a valid image')
      return
    }

    // Submit logic (API call will go here)
    console.log('Uploaded file:', file)
  }

  return (
    <div className='h-auto overflow-y-scroll p-6'>
      <div className='mx-60 flex items-start flex-wrap gap-6 text-slate-600'>

        {/* Left column */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-lg bg-white border border-gray-200 rounded-lg p-6'
        >
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#3C81F6]' />
            <h1 className='text-xl font-semibold'>Object Removal</h1>
          </div>

          {/* Upload Image */}
          <p className='font-semibold mt-4'>Upload Image:</p>

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className='w-full mt-2 p-2 text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <p className='text-sm text-gray-500 mt-2'>
            Supported formats: JPG, PNG. Max size: 5MB.
          </p>

          {error && (
            <p className='text-sm text-blue-500 mt-2'>{error}</p>
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
              className="w-full mt-2 p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className='text-sm text-gray-500 mt-2'> Please be specific about the object you want to remove.</p>

          {/* Submit Button */}
          <button
            type='submit'
            className='mt-6 w-full bg-linear-to-r from-[#3C81F6] to-[#9234EA] text-white p-2 rounded-md hover:bg-blue-700 transition cursor-pointer'
          >
            <Scissors className='inline w-5 mr-2' />
            Remove Object
          </button>
        </form>

        {/* Right column */}
        <div className='bg-white flex flex-col border border-gray-200 rounded-lg p-6 flex-1 min-w-75 min-h-96 max-w-lg max-h-150'>

          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#3C81F6]' />
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>

          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-2 text-gray-500'>
              <Scissors className='w-9 h-6' />
              <p>Upload an image and describe what to remove</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RemoveObject
