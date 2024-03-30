import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const DashSidebar = () => {
    const location= useLocation();
    const {currentUser} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const [tab, setTab] =useState('')
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFormUrl = urlParams.get('tab')
      if(tabFormUrl){
        setTab(tabFormUrl)
      }
    },[location.search])
    const handleSignOut = async () =>{
      try {
          const res = await fetch('/api/user/signout', {
              method: 'POST',
          });
          const data = await res.json();
          if(!res.ok){
              console.log(data.message);
          }
          else{
              dispatch(signoutSuccess())
          }
      } catch (error){
  console.log('hello')
      }
  }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                    active={tab==='profile'} 
                    icon={HiUser} label={currentUser.isAdmin ? 'Admin' :'User'} labelColor='dark'
                    as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                {currentUser.isAdmin ? (<Link to='/dashboard?tab=posts'>
                    <Sidebar.Item 
                    active={tab==='post'} 
                    icon={HiDocumentText} 
                    as='div'>
                        Post
                    </Sidebar.Item>
                </Link>) : ''}
                {currentUser.isAdmin ? 
                (<Link to='/dashboard?tab=users'>
                    <Sidebar.Item 
                    active={tab==='users'} 
                    icon={HiOutlineUserGroup} 
                    as='div'>
                        Users
                    </Sidebar.Item>
                </Link>) : ''}
                {currentUser.isAdmin ? 
                (<Link to='/dashboard?tab=comments'>
                    <Sidebar.Item 
                    active={tab==='comments'} 
                    icon={HiAnnotation} 
                    as='div'>
                        Comments
                    </Sidebar.Item>
                </Link>) : ''}
                
                    <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight}className='cursor-pointer'  >
                        Sign Out
                    </Sidebar.Item>               
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar