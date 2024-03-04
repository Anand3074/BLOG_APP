import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dash.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import Header from './components/Header.jsx'
const App = () => {
  return (
   <BrowserRouter>
   <Header/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Projects' element={<Dashboard/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        </Routes>
   </BrowserRouter>
  )
}

export default App