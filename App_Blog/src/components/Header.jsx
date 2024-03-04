import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button , Navbar, TextInput} from 'flowbite-react';
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname;
  return (
    <div>
        <Navbar className='border-b-2' >
            <Link to='/' className='self-center whitesapce-nowrap 
             text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>WeConnect</span>
            BLOG
            </Link >
            {/* <Link>
                <li>Home</li>
            </Link >
            <Link to='/About'>
                <li>About</li>
            </Link>
                <Link to='/Dashboard'>
                <li>Dashboard</li>
            </Link> */}
            <form>
                <TextInput  
                type='text'
                placeholder='Search...'
                rightIcon={IoSearchOutline}
                className='hidden lg:inline'
                />
            </form>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 lg:hidden ' color='gray' pill>
                    <IoSearchOutline/>
                </Button> 
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon/>
                </Button>
                <Link to='/signup'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle/>
            </div>
          
            <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'} >
                    <Link to='/'>
                        Home
                    </Link>
            </Navbar.Link>
            
            <Navbar.Link active={path === "/About"} as={'div'} >
                    <Link to='/About'>
                        About
                    </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/Projects"} as={'div'} >
                    <Link to='/Projects'>
                        Projects
                    </Link>
            </Navbar.Link>
            </Navbar.Collapse>
            

        </Navbar >
    </div>
  )
}

export default Header