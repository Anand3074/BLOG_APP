import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase.js'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import {  useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'

const UPdatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const[imageUploadError, setImageUploadError] = useState(null);
    const[formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null)
    const navigate = useNavigate();
    const {postId} = useParams();
    const {currentUser} = useSelector(state=> state.user)
    useEffect(()=>{
        try {
                const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message)
                    return
                }
                if(res.ok){
                    setPublishError(null)
                    setFormData(data.posts[0]);
                }
            }
            fetchPost();
        }
            catch (error) {
            console.log(error.message)
        }
    },
    [postId])
    const handleUploadImage = () => {
        console.log('hello')
        try {
            if(!file){
                setImageUploadError('Please Select an Image')
                return}
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));      
            },
            (error) => {
                setImageUploadError('Image upload Failed');
                setImageUploadProgress(null);
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);
                    setImageUploadError(null);
                    setFormData({...formData , image:downloadURL});
                    console.log(formData)
                })
            }
                )
        } catch (error) {
            setImageUploadError('Image Upload Error');
            console.log('Image Error')
            setImageUploadProgress(null)
        }

    }
const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
        const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(!res.ok){
            setPublishError(data.message);
            console.log('hello')
            return
        }
        if(res.ok){
            setPublishError(null);
            navigate(`/post/${data.slug}`)
        }
    } catch (error) {
        setPublishError('Something went Wrong')
    }
}    
    
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen"> 
        <h1 className="text-center text-3xl my-7 font-semibold"> Update Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput onChange={(e)=> setFormData({...formData, title: e.target.value})} 
                type='text' placeholder='Title' required id='title' className='flex-1' value={formData.title} />
                <Select onChange={(e)=>setFormData({...formData, category: e.target.value})} value={formData.category} >
                    <option value='uncategorised'>Select a category
                    </option>
                    <option value='javascript'>JavaScript</option>
                    <option value='reactjs'>reactjs</option>
                    <option value='nextJs'>JavaScript</option>
                </Select>
            </div>
            <div className="flex gap-4 items-centered justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept='images/*' onChange={(e) => setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' disabled={imageUploadProgress} outline onClick={handleUploadImage}>
                    {imageUploadProgress? <div className="w-16 h-16">
                        <CircularProgressbar value={imageUploadProgress}
                         text={`${imageUploadProgress || 0}%`}/>
                    </div>: 'Upload image'}
                </Button>
            </div>
        {imageUploadError && (
        <Alert color='failure'>
            <span>
                {imageUploadError}
            </span>
        </Alert>) }
        {publishError && (
        <Alert color='failure'>
            <span>
                {publishError}
            </span>
        </Alert>) }
        {formData && formData.image && (<div className="w-full h-full flex justify-center">
            <img src={formData.image} alt="upload" className="w-72  h-75 object-cover object-top "/>
            </div> )}
            <ReactQuill onChange={(value)=>setFormData({...formData, content: value})} value={formData.content} theme='snow' placeholder='Write Something...' className="h-72 mb-12" required />
            <Button className="mb-24" type='submit' gradientDuoTone='purpleToPink'>
                Update Post
            </Button>
        </form>
    </div>  )
}

export default UPdatePost