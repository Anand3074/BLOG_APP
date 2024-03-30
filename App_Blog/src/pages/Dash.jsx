import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar.jsx'
import DashProfile from '../components/DashProfile.jsx'
import DashPost from '../components/DashPost.jsx'
import DashUsers from '../components/DashUsers.jsx'
import DashComments from '../components/DashComments.jsx'
import DashWidget from '../components/DashWidget.jsx'

const Dash = () => {
  const location= useLocation();
  const [tab, setTab] =useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl)
    }
  },[location.search])
  return (
<div className="min-h-screen flex flex-col md:flex-row">
  <div className='md:w-56'>
  <DashSidebar/>
    </div>

    {tab === 'profile' && (<div className='w-auto flex flex-1'><DashProfile/></div>)}
    {tab === 'posts' && (<div className='w-auto flex flex-1'><DashPost/></div>)}
    {tab === 'users' && (<div className='w-auto flex flex-1'><DashUsers/></div>)}
    {tab === 'comments' && (<div className='w-auto flex flex-1'><DashComments/></div>)}
    {tab === 'dash' && (<div className='w-auto flex flex-1'><DashWidget/></div>)}
    
</div>  )
}

export default Dash