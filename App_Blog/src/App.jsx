import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dash.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Header from './components/Header.jsx'
import FooterCom from './components/Footer.jsx'
import Projects from './pages/Projects.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Projects' element={<Projects/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
    <FooterCom/>
   </BrowserRouter>
  )
}

export default App