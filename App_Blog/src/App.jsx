import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dash.jsx'
import About from './pages/About.jsx'
const App = () => {
  return (
   <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Projects' element={<Dashboard/>}/>
        </Routes>
   </BrowserRouter>
  )
}

export default App