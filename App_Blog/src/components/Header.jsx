import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button , Dropdown, Navbar, TextInput} from 'flowbite-react';
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice.js';
import { signoutSuccess } from '../redux/user/userSlice.js';
import { useEffect, useState } from 'react';

const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('')
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)
    const navigate = useNavigate();
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)


    }

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
            <form onSubmit={handleSubmit}>
                <TextInput  
                type='text'
                placeholder='Search...'
                rightIcon={IoSearchOutline}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </form>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 lg:hidden ' color='gray' pill>
                    <IoSearchOutline/>
                </Button> 
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaMoon/> : <FaSun className=''/>}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar
                     alt="user" img={currentUser.profilePicture} rounded className='object-cover object-top'/>}>
                        <Dropdown.Header>
                            <span className='block text-sm'>
                                @{currentUser.username}
                            </span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                           

                    </Dropdown>
                ) :
                (<Link to='/sign-up'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
                </Link>)}
                
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