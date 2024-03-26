import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {Button, Modal, Table} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {FaTimes, FaCheck} from 'react-icons/fa'

const DashUsers = () => {
  const {currentUser} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const res =await fetch(`/api/user/getusers`);
        
        const data = await res.json();
        if(res.ok){
          setUsers(data.users)
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      }   catch (error) {
        console.log(error.message)
      }
    };
    if(currentUser.isAdmin){
      fetchUsers();
    }
  },[currentUser._id, currentUser.isAdmin])
  const handleShowMore = async () => {
    const startIndex = users.length;
    try { 
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev, ...data.users]);
          if(data.users.length < 9){
            setShowMore(false)
          }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, 
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if(res.ok){
      setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete) )
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
      {currentUser.isAdmin && users.length > 0 ?
      (<>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {users.map((user, index)=>(
          <Table.Body className='divude-y' key={index}>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                {new Date(user.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className='w-10 rounded-full h-10 object-cover bg-gray-500'/>
              </Table.Cell>
              <Table.Cell>
             {user.username}
              </Table.Cell>
              <Table.Cell>
                  {user.email}
              </Table.Cell>
              <Table.Cell>
                {user.isAdmin ? (<FaCheck className='text-green-500 self-center'/>) :(<FaTimes className='text-red-700 self-center'/>) }
              </Table.Cell>
              <Table.Cell>
              <span className='font-medium text-red-500  hover:underline' onClick={() => {
                  setShowModal(true);
                  setUserIdToDelete(user._id);
                
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
      You have no Users</p>)} 
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200
                        mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500'>
                            Are you sure you want to delete this User?
                        </h3>
                        <div className=' flex gap-4 justify-center'>
                            <Button color='failure' onClick={handleDeleteUser}>
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

export default DashUsers