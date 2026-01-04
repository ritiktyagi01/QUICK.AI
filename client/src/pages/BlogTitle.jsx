import { Edit, Edit2, Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const [titleLength, setTitleLength] = useState('short');
  const [category, setcategory] = useState('General');
  const [inputText, setInputText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      setLoading(true);
      const token = await getToken();
      const prompt = `Generate a ${titleLength} blog title on the keyword "${inputText}" with a ${category} category.`;
      const { data } = await axios.post('/api/ai/generate-blog-title', {
        prompt: prompt,
        length: titleLength.length,
        category: category
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        setContent(data.content);
      }
      else {
        toast.error(data.message || "Failed to generate title.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while generating the title.");
    }
    setLoading(false);
  }



  return (
    <>
      <div className='h-auto overflow-y-scroll p-6'>
        <div className='mx-60 flex items-start flex-wrap gap-6 text-slate-600'>

          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full min-h-96 max-h-150 max-w-lg bg-white border border-gray-200 rounded-lg p-6'>
            <div className='flex items-center gap-3'>
              <Sparkles className=' w-6 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>AI Title Generator</h1>
            </div>

            {/* Keyword */}
            <p className='font-semibold mt-4'>
              Keyword:
            </p>
            <input onChange={(e) => { setInputText(e.target.value) }} value={inputText}
              type="text" className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your keyword here' required />

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

            {/* Writing category */}
            <p className='font-semibold mt-4'>Writing category:
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
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
            <button
              disabled={Loading}
              type="submit"
              className={`mt-6 w-full bg-linear-to-l from-[#226BFF] to-[#65ADFF] text-white p-2 rounded-md transition-colors
               ${Loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"}`}>
            
            
              {Loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating...
                </span>
              ) : (
                <>
                  <Edit className="inline w-5 mr-2" />
                  Generate Title
                </>
              )}
            </button>
          </form>
          {/*left col end */}

          { /* right col */}
          <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-96 max-h-150'>

            <div className='flex items-center gap-3'>
              <Hash className=' w-6 text-[#4A7AFF]' />
              <h1 className='text-xl font-semibold'>Generated Title</h1>
            </div>

           {!Loading && content &&
                         <div className='mt-4 overflow-y-scroll max-h-128 pr-2'>
                           <p className='whitespace-pre-line text-gray-700'>{content}</p>
                         </div>
                       }
                       {Loading ?
                         (<div className='flex-1 flex justify-center items-center '>
                           <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                             <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             <p>Generating your article, please wait...</p>
                           </div>
                         </div>) : (<div className='flex-1 flex justify-center items-center '>
                           <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                             <Edit className=' w-9 h-6' />
                             <p> Enter a topic and click on "Generate article" to get started</p>
                           </div>
                         </div>)
                       }
           
           
                       {!content ? null : (
                         <div className='mt-4 overflow-y-scroll max-h-128 pr-2'>
                           <div className='reset-tw'>
                             <Markdown>
                               {content}
                             </Markdown>
                           </div>
                         </div>
                       )}
          { /* right col end */}

        </div>
      </div>
      </div>
    </>
  )
}

export default BlogTitle;
