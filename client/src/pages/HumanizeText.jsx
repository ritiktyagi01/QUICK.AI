import { Sparkles, FileText, Edit2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const HumanizeText = () => {
  const [inputText, setInputText] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) {
      setError("Please enter text to humanize");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/humanize-text",
        { text: inputText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Failed to humanize text");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait and try again.");
      } else {
        toast.error("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex p-6 items-start overflow-y-scroll flex-wrap gap-6 text-slate-600">

      {/* Left panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-6"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Humanize AI Text</h1>
        </div>

        <p className="font-semibold mt-4">Paste AI-generated text:</p>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={8}
          placeholder="Paste AI-generated content here..."
          className="w-full mt-2 p-3 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full bg-linear-to-l from-[#00DA83] to-[#009BB3] text-white p-2 rounded-md
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"}`}
        >
          {loading ? ( <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Humanizing...
                </span>
              ):(  <>
                  <Edit2 className="inline w-5 mr-2" />
                  Humanize Text
                </>)}
        </button>
      </form>

      {/* Right panel */}
      <div className="bg-white flex flex-col border border-gray-200 rounded-lg p-6 flex-1 max-w-lg min-h-75">

        <div className="flex items-center gap-3">
          <Edit2 className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Humanized Output</h1>
        </div>

        {!content && !loading && (
          <div className="flex-1 flex justify-center items-center text-gray-500 text-sm">
            Humanized text will appear here
          </div>
        )}

        {loading && (
          <div className="flex-1 flex justify-center items-center text-gray-500">
            Processing...
          </div>
        )}

        {content && (
          <div className="mt-4 overflow-y-scroll max-h-100 pr-2">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanizeText;


// import { Edit, Edit2,  Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios';
// import { useAuth } from '@clerk/clerk-react';
// import { toast } from 'react-hot-toast';
// import Markdown from 'react-markdown';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const HumanizeText = () => {
//   const [file, setFile] = useState('')
//   const [error, setError] = useState('')
//   const [Loading, setLoading] = useState(false);
//   const [content, setContent] = useState('');
//   const { getToken } = useAuth();

//   const MAX_FILE_SIZE =   5 * 1024 * 1024 // 5 MB

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]

//     if (!selectedFile) return

//     if (selectedFile.size > MAX_FILE_SIZE) {
//       setError('File size must be less than 5 MB')
//       e.target.value = '' // clear input
//       setFile(null)
//       return
//     }

//     setError('')
//     setFile(selectedFile)
//   }
// const onSubmitHandler = async (e) => {
//   e.preventDefault();

//   if (!file) {
//     setError("Please upload a valid resume file");
//     return;
//   }

//   if (Loading) return; // hard stop

//   try {
//     setLoading(true);
//     setError("");

//     const token = await getToken();
//     const formData = new FormData();
//     formData.append("resume", file);

//     const { data } = await axios.post(
//       "/api/ai/humanize-text",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     );

//     if (data.success) {
//       setContent(data.content);
//     } else {
//       toast.error(data.message || "Failed to Generate Text");
//     }
//   } catch (error) {
//     if (error.response?.status === 429) {
//       toast.error("Too many requests. Please wait and try again.");
//     } else {
//       toast.error("Server error. Please try again.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <>
//         <div className='h-full flex p-6 items-start overflow-y-scroll flex-wrap gap-6 text-slate-600'>

//           {/* left col */}

//           <form onSubmit={onSubmitHandler} className='w-full min-h-96 max-h-150 max-w-lg bg-white border border-gray-200 rounded-lg p-6'>
//             <div className='flex items-center gap-3'>
//               <Sparkles className=' w-6 text-[#00DA83]' />
//               <h1 className='text-xl font-semibold'>Humanize Text</h1>
//             </div>

//            {/* Upload Resume */}
//           <p className='font-semibold mt-4'>Add Your AI Text</p>

//           <textarea
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               rows={4}
//               placeholder="Describe the image in detail: subject, background, lighting, mood..."
//               className="w-full mt-2 p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//             <p className='text-sm text-gray-500 mt-2'></p>


//           {error && (
//             <p className='text-sm text-red-500 mt-2'>{error}</p>
//           )}

//             {/* Submit Button */}
//             <button
//               disabled={Loading}
//               type="submit"
//               className={`mt-6 w-full bg-linear-to-l  from-[#00DA83] to-[#009BB3] text-white p-2 rounded-md transition-colors
//                ${Loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600 cursor-pointer"}`}>

//               {Loading ? (
//                 <span className="inline-flex items-center gap-2">
//                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   Generating...
//                 </span>
//               ) : (
//                 <>
//                   <Edit2 className="inline w-5 mr-2" />
//                   Generate Humanize Text
//                 </>
//               )}
//             </button>
//           </form>

//           {/*left col end */}

//           { /* right col */}
//           <div className='bg-white  flex flex-col border border-gray-200 rounded-lg p-6 flex-1 w-full min-w-75 max-w-lg min-h-104 max-h-150'>

//             <div className='flex items-center gap-3'>
//               <Edit className=' w-6 text-[#00DA83]' />
//               <h1 className='text-xl font-semibold'>Analysis Result</h1>
//             </div>

//             {Loading &&
//               (<div className='flex-1 flex justify-center items-center '>
//                 <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
//                   <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <p>Generating your review, please wait...</p>
//                 </div>
//               </div>)
//             }


//             {!content ? (<div className='flex-1 flex justify-center items-center '>
//               <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
//                 <FileText className=' w-9 h-6' />
//                 <p> Enter a topic and click on "Generate Humanize Text" to get started</p>
//               </div>
//             </div>) : (
//               <div className='mt-4 overflow-y-scroll max-h-128 pr-2'>
//                 <div className='reset-tw'>
//                   <Markdown>
//                     {content}
//                   </Markdown>
//                 </div>
//               </div>
//             )}
//             { /* right col end */}

//           </div>
//         </div>

//     </>
//   )
// }

// export default HumanizeText;




