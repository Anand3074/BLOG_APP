import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter,BsDribbble, BsGithub } from "react-icons/bs";


const FooterCom = () => {
  return (
    <Footer container className='border border-t-8
    border-teal-500'>
    <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to='/' className='self-center whitesapce-nowrap 
             text-lg sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>WeConnect</span>
            BLOG
            </Link >
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 gap-6">
                <div className="">
                <Footer.Title title='About'/>
                    <Footer.Link href='https://www.100jsprojects.com'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Scientific Blog
                    </Footer.Link>
                    <Footer.Link href='/about'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Virtual MeetUps
                    </Footer.Link>
                    <Footer.Link href='#'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Innovation Talk's
                    </Footer.Link>
                </div>

                <div className="">
                <Footer.Title title='Follow Us'/>
                    <Footer.Link href='https://www.github.com/Anand3074'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Github 
                    </Footer.Link>
                    <Footer.Link href='/about'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Discord
                    </Footer.Link>
                    <Footer.Link href='/about'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        LinkedIn
                    </Footer.Link>
                </div>
                <div className="">
                <Footer.Title title='LEGAL'/>
                    <Footer.Link href='https://www.100jsprojects.com'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Privacy Policy 
                    </Footer.Link>
                    <Footer.Link href='/about'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Term's and Conditiion
                    </Footer.Link>
                    <Footer.Link href='#'
                    target='_blank'
                    rel='noopener noreferer' 
                    className='list-none'>
                        Partners
                    </Footer.Link>
                </div>         
            </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href='#' by="WeConnect's Blog" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:jsutify-center">
            <Footer.Icon href='' icon={BsFacebook}/>
            <Footer.Icon href='' icon={BsInstagram}/>
            <Footer.Icon href='' icon={BsTwitter}/>
            <Footer.Icon href='' icon={BsGithub}/>
            <Footer.Icon href='' icon={BsDribbble}/>

            </div>
        </div>
    </div>

    </Footer>
  )
}

export default FooterCom