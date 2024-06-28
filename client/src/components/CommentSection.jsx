import { Textarea, Button} from 'flowbite-react';
import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


function CommentSection({postId}) {
    const {currentUser} = useSelector((state)=>state.user);
    const [comment, setComment] = useState('');
    

    //handleSubmit
    const handleSubmit = async(e)=>{

    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ?
        (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>signed in as:</p>
                <img 
                className='h-5 w-5 object-cover rounded-full'
                src={currentUser.profilePicture} alt='' />
                <Link to={'/dashboard?tab=profile'} className='text-cyan-600 hover:underline'>
                   @{currentUser.username}
                </Link>
            </div>
        ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
               You must be signed in to Comment.
               <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                 Sign In
               </Link>
            </div>
        )
        }
        {currentUser &&(
            <form className='border border-teal-500 rounded-md p-3'
            onSubmit={handleSubmit}
            >
                <Textarea 
                placeholder='Add a comment ...'
                rows='3'
                maxLength= '200'
                onChange={(e)=> setComment(e.target.value)}
                value= {comment}
                />
                <div className='flex justify-between items-center mt-5'>
                  <p className='text-gray-500 text-xs'>
                    {200 - comment.length} characters remaining
                  </p>
                 <Button outline gradientDuoTone='greenToBlue' type='submit'>
                    Submit
                 </Button>
                </div>
            </form>
        )}
    </div>
  )
}

export default CommentSection