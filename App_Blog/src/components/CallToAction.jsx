import { Button } from 'flowbite-react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row  justify-between items-center border border-teal-500 border-2 rounded-tl-3xl rounded-br-3xl p-3'>
        <div className='flex flex-1 justify-center flex-col items-center'>
            <div className='max-w-md font-semibold justify-center sm:text-3xl text-center flex '>
                Want to learn HTML, CSS and JavaScript by building fun and engaging projects?
            </div>
            <p className='text-center mt-3 text-sm text-gray-500'>Check our 100 js projects website and start building your own projects</p>
            <Button gradientDuoTone='purpleToPink'  type='button' className=' mx-3 rounded-tr-none rounded-bl-none mt-3 w-full' ><a href='#'>100 JS Projects Website</a></Button>
        </div>
        <div className='p-7'>
            <img src='https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-768x337.webp' alt='hello' className='sm:max-w-[500px] max-h-[350px] '/>
        </div>
    </div>
  )
}

export default CallToAction