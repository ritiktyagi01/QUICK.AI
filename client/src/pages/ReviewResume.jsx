import { FileText, Package, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const ReviewResume = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const MAX_FILE_SIZE =   50 * 1024 * 1024 // 50 MB

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
    <>
      <div className='h-auto overflow-y-scroll p-6'>
        <div className='mx-60 flex items-start flex-wrap gap-6 text-slate-600'>

          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full min-h-fit max-h-150 max-w-lg bg-white border border-gray-200 rounded-lg p-6'>
            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#00DA83]' />
              <h1 className='text-xl font-semibold'>Resume Review</h1>
            </div>

           {/* Upload Resume */}
          <p className='font-semibold mt-4'>Upload Resume:</p>

          <input
            type="file"
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className='w-full mt-2 p-2 text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />

          <p className='text-sm text-gray-500 mt-2'>
            Supported formats: PDF, DOC, DOCX. Max size: 50MB.
          </p>

          {error && (
            <p className='text-sm text-red-500 mt-2'>{error}</p>
          )}

            {/* Submit Button */}
            <button type='submit' className='mt-6 w-full bg-linear-to-l from-[#00DA83] to-[#009BB3] text-white p-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer'>
              <FileText className='inline w-5 mr-2' />
              Review Resume
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-104 max-h-150'>

            <div className='flex items-center gap-3'>
              <FileText className=' w-6 text-[#00DA83]' />
              <h1 className='text-xl font-semibold'>Analysis Result</h1>
            </div>

            <div className='flex-1 flex justify-center items-center '>
              <div className='text-sm ml-4 flex flex-col items-center gap-2 text-gray-500'>
                <FileText className=' w-9 h-6' />
                <p> Upload a resume and click on "Review Resume" to get started</p>
              </div>
            </div>

          </div>
          { /* right col end */}

        </div>
      </div>
    </>
  )
}

export default ReviewResume
