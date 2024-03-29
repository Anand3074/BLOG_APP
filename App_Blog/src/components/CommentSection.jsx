import {  Alert, Button, Modal, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
const CommentSection = ({postId}) => {
  const[comment, setComment] = useState('');
  const[userComments, setUserComments] = useState([])
  const[commentError, setCommentError] = useState('');
  const {currentUser} = useSelector(state => state.user)
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const navigate = useNavigate();
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
        body:JSON.stringify({
          content: comment , 
          postId, 
          userId: currentUser._id}),
      });
      const data = await res.json();
      if(res.ok){
        setComment('');
        setCommentError(null);
        setUserComments([data, ...userComments])
      }      
    } catch (error) {
      setCommentError(error.message)
    }
  }

  useEffect(()=>{
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`)
        if(res.ok){
          const data = await res.json();
          setUserComments(data)
        }
        if(!res.ok){
          console.log('Hello')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComments();
  },[postId])

  const handleLike = async (commentId) =>{
    try {
      if(!currentUser){
        navigate('/sign-in')
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`,
      {
        method:'PUT', 
      });
      if(res.ok){
        const data = await res.json();
        setUserComments(userComments.map((comment) => comment._id === commentId ? {
          ...comment,
          likes: data.likes,
          numberOfLikes: data.likes.length,
        } : comment
        ))}
    } catch (error) {
      console.log(error.message)
    }
  }
  console

  const handleEdit = async (comment, editedContent) =>{
    setUserComments(userComments.map((c) => 
      c._id === comment._id ? {...c, content: editedContent} : c
    ))
  }
const handleDelete = async (commentId) => {

  setShowModal(false)
  try {
    if(!currentUser){
      navigate('/sign-in');
      return;
    }
    console.log("try to delete")
    const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
      method: 'DELETE'
    });
    if(res.ok){
      const data = await res.json();
      setUserComments(userComments.filter((c)=> c._id !== commentId))
    }
    console.log(userComments)

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      <>
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
        {userComments.length === 0 ? (<p className='text-sm my-5'>No Comments yet</p>) 
        : (<>
        <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{userComments.length}</p>
            </div>
          </div>
          {userComments.map((c2) =>
            <Comment 
              key={c2._id} 
              onLike={handleLike} 
              comment={c2} 
              onEdit={handleEdit} 
              onDelete={(commentId)=> {
                setShowModal(true)
                setCommentToDelete(commentId)
              
              }}>
            </Comment>
          )}
        </>
          
        )}
        <Modal show={showModal} onClose={() => {setShowModal(false)}} popup size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200
                        mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500'>
                            Are you sure you want to delete your Comment?
                        </h3>
                        <div className=' flex gap-4 justify-center'>
                            <Button color='failure' onClick={()=>handleDelete(commentToDelete)}>
                                    Yes, Im Sure
                            </Button>
                            <Button color='gray' className='' onClick={()=>setShowModal(false)}>
                               No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
        </>
        </div>
  )
}

export default CommentSection