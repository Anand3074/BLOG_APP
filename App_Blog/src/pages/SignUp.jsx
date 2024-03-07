import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInFailure, signInSuccess } from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'
const SignUp = () => {
    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})  
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.username || !formData.email || !formData.password){
            return dispatch(signInFailure('Please Fill out All fields'));
        }
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success === false){
               return dispatch(signInFailure(data.message))
            }
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/sign-in')
            }
        } catch (error) {
           dispatch(signInFailure(error.message))
        }
    }
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex gap-8 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center' id='container'>
            <div className='flex-1' id='left'>
            <Link to='/' className=' 
             text-4xl font-bold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>WeConnect</span>
            BLOG
            </Link >
            <p className='text-sm mt-5'>
            This is a demo project you can sign up a using your email and password or with Google Accout.
            </p>
            </div>
            <div className='flex-1' id='right'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <Label value="Your username"/>
                        <TextInput 
                        onChange={handleChange}
                        type="text"
                        placeholder="Username"
                        id="username"/>
                    </div>
                    <div>
                        <Label value="Your Email"/>
                        <TextInput 
                        onChange={handleChange}
                        type="email"

                        placeholder="weworkcompany@gmail.com"
                        id="email"/>
                    </div>
                    <div>
                        <Label value="Your password"/>
                        <TextInput 
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        id="password"/>
                    </div>
                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {
                            loading ? (
                                <>
                                <Spinner size='sm'/> 
                                <span className='pl-3'>Loading...</span>
                                </>
                                
                            ) : 'Sign Up'       
                        }
                    </Button>
                </form>
                <div className=' flex gap-2 text-sm mt-5'>
                    <span>
                        Have an account?

                    </span>
                    <Link to='/sign-in' className='text-blue-500'>
                        Sign In 
                    </Link>
                </div>
                {
                    errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {
                                errorMessage
                            }
                        </Alert>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default SignUp