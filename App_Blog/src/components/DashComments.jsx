import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {Button, Modal, Table} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {FaTimes, FaCheck} from 'react-icons/fa'

const DashComments = () => {
  const {currentUser} = useSelector(state => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(()=> {
    const fetchComments = async () => {
      try {
        const res =await fetch(`/api/comment/getComments`);
        
        const data = await res.json();
        if(res.ok){
          setComments(data.comments)
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      }   catch (error) {
        console.log(error.message)
      }
    };
    if(currentUser.isAdmin){
      fetchComments();
    }
  },[currentUser._id, currentUser.isAdmin])
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try { 
      const res = await fetch(`/api/comment/getComments?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setcomments((prev) => [...prev, ...data.comments]);
          if(data.comments.length < 9){
            setShowMore(false)
          }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, 
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if(res.ok){
      setComments((prev) => prev.filter((Comment) => Comment._id !== commentIdToDelete) )
      setShowModal(false);
    }  
    else{
      console.log(data.message)
      
    }
      } catch (error) {
      console.log(error.message)

    }
  }

    return (
    <div className='table-auto overflow-x-scroll md:mx-1 md:w-auto flex flex-col flex-1 p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  '>
      {currentUser.isAdmin && comments.length > 0 ?
      (<>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Comment Content</Table.HeadCell>
          <Table.HeadCell>Number of Likes</Table.HeadCell>
          <Table.HeadCell>PostId</Table.HeadCell>
          <Table.HeadCell>AdUserIdin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {comments.map((comment, index)=>(
          <Table.Body className='divude-y' key={index}>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                {new Date(comment.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                  {comment.content}
              </Table.Cell>
              <Table.Cell>
              {comment.numberOfLikes}
              </Table.Cell>
              <Table.Cell>
                {comment.postId}
              </Table.Cell>
              <Table.Cell>
                {comment.userId}
              </Table.Cell>
              <Table.Cell>
              <span className='font-medium text-red-500  hover:underline' onClick={() => {
                  setShowModal(true);
                  setCommentIdToDelete(comment._id);
                
                }
                }>Delete</span> 
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {showMore ? (<button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
Show more
      </button>) : <button className='w-full text-teal-500 self-center text-sm py-7'>
        Show Less</button>}
      </>) :
    (<p>
      You have no Comments</p>)} 
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200
                        mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500'>
                            Are you sure you want to delete this Comment?
                        </h3>
                        <div className=' flex gap-4 justify-center'>
                            <Button color='failure' onClick={handleDeleteComment}>
                                    Yes, Im Sure
                            </Button>
                            <Button color='gray' className='' onClick={()=>setShowModal(false)}>
                               No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashComments