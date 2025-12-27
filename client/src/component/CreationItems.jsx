import React, { useState } from 'react'
import Markdown from 'react-markdown';


const CreationItems = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        // Single creation item container
        <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl bg-white rounded-lg  cursor-pointer shadow-md border border-gray-300'>
            <div className='flex justify-between items-center gap-4'>
                <div>
                    <h2 className=''>{item.prompt}</h2>
                    <p className='text-gray-500 text-sm'>{item.type}- {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <button className='text-sm bg-[#EFF6FF] cursor-progress border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-lg mt-1'>{item.type}</button>
            </div>
            {/* // Expandable content */}
            {
                expanded && <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                    {
                        item.type === 'image' ? (
                            <div>
                                <img src={item.content} alt='creation' className='max-w-md mt-3 w-full  rounded-lg' />
                            </div>) : (
                            <div className='mt-3 overflow-y-scroll h-full text-sm text-slate-700'>
                                <p className='reset-tw'>
                                    <Markdown>{item.content}</Markdown></p>
                            </div>
                        )
                    }
                </div>

            }

        </div>
    )
}

export default CreationItems
