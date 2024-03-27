import {  Alert, Button, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const CommentSection = ({postId}) => {
  const[comment, setComment] = useState('');
  const[commentError, setCommentError] = useState('');
  const {currentUser} = useSelector(state => state.user)
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if(comment.length>200){
      return
    }
    if(comment.length === 0){
      setCommentError("The Comment Field is empty")
      return
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',      },
        body:JSON.stringify({content: comment , postId, userId: currentUser._id}),
      });
      const data = await res.json();
      if(res.ok){
        setComment('')
        setCommentError(null)
      }      
    } catch (error) {
      setCommentError(error.message)
    }
    
   
  }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? 
        (
        <div className='flex items-center gap-1 my-5 text-gary-500 m-5'>
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt='user' className='w-5 h-5 object-cover rounded-full'/>
            <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>@{currentUser.username}</Link>
        </div>) :
        (
            <div className="flex text-sm text-teal-500 my-5 gap-3">
              You must be signed in to comment
              <Link to='/sign-in' className='text-md text-blue-600 hover:underline'>
              Sign In</Link>
            </div>
        )}
        {currentUser && (
          <>
          <form onSubmit={handleCommentSubmit} className='border border-teal-500 rounded-md p-3'>
            <Textarea placeholder='Add a Comment...' rows='3' maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
              <Button gradientDuoTone='purpleToPink' type='submit'>Submit</Button>
            </div>
          </form>

          {commentError && <Alert color='failure' className='mt-5'>
          {commentError}
  </Alert> } 
          </>
          
        )}
        </div>
  )
}

export default CommentSection