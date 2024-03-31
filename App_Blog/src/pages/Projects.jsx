import React from 'react'
import CallToAction from '../components/CallToAction.jsx'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-4xl mx-auto flex flex-col justify-center items-center gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>
        Projects
      </h1>
      <p className='text-md text-gray-500'>
        Build fun and engaging projects while learning HTML, CSS and JavaScript!
      </p>
      <CallToAction />
    </div>
  )
}

export default Projects