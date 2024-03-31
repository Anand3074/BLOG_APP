import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl  mx-auto p-3 text-center">
        <div className="">
          <h1 className='text-3xl font-semibold my-7 text-center'>About WeConnect Blog</h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome WeConnect! We're passionate about fostering connections within the tech community. Our platform serves as a hub where tech enthusiasts come together to share ideas, insights, and experiences. 
            </p>
            <p>
            Whether you're a seasoned developer, a budding entrepreneur, or simply curious about the latest trends in technology, WeConnect offers a space for meaningful interactions.
            </p>
            <p> Join us to collaborate, learn, and grow alongside like-minded individuals who share your passion for innovation and technology. Let's build a vibrant community together, one connection at a time.
          </p>      
          </div>
        </div>
      </div>
    </div>
  )
}

export default About