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
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UPdatePost from './pages/UPdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import ScrollToTop from './components/scrollToTop.jsx'
import Search from './pages/Search.jsx'

const App = () => {
  return (
   <BrowserRouter>
   <ScrollToTop/>
   <Header/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Projects' element={<Projects/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
        <Route path='/search' element={<Search/>}/>
        
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:postId' element={<UPdatePost/>}/>
          </Route>
        </Routes>
    <FooterCom/>
   </BrowserRouter>
  )
}

export default App