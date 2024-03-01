import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <ul>
            <Link>
                <li>Home</li>
            </Link >
            <Link to='/About'>
                <li>About</li>
            </Link>
                <Link to='/Dashboard'>
                <li>Dashboard</li>
            </Link>
        </ul>
    </div>
  )
}

export default Home