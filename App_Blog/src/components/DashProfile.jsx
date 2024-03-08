import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [fileUploadProg, setFileUploadProg] = useState(null)
    const [fileUploadError, setFileUploadError] = useState(null)
    
    const filePickeRef = useRef()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
    if(file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file))
    }   }
useEffect(()=>{
    if(imageFile){
        uploadImage();
    }
},[imageFile])   
const uploadImage = async () =>{
    // rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if 
//       request.reserve.size < 2*1024*1024 &&
//       request.reserve.contentType.matches('image/.*')
//     }
//   }
// }
setFileUploadError(null)
const storage = getStorage(app);
const fileName = new Date().getTime() +  imageFile.name;
const storageRef = ref(storage,fileName);
const uploadTask = uploadBytesResumable(storageRef, imageFile);
uploadTask.on(
    'state_changed',
    (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setFileUploadProg(progress.toFixed(0));
    },
    (error) => {
        setFileUploadError('Could not Upload Image(File must be less than 2MB)')
        setFileUploadProg(null)
        setImageFile(null)
        setImageFileUrl(null)
    },
    () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
        })
    }
)}
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input  type='file' accept='image/*' onChange={handleImageChange} ref={filePickeRef} hidden/>
            <div onClick={()=> filePickeRef.current.click()}
             className='relative h-32 w-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full'>
                {fileUploadProg && (
                    <CircularProgressbar value={fileUploadProg || 0} text={`${fileUploadProg}%`} 
                    strokeWidth={5}
                    styles={{
                        root:{
                            width:'100%',
                            height: '100%',
                            position:'absolute',
                            top:0,
                            left:0,
                        },
                        path:{
                            stroke:`rgba(62, 152,199, ${fileUploadProg/100})`
                        },
                    }}/>
                )}
            <img src={ imageFileUrl || currentUser.profilePicture}  className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${fileUploadProg && fileUploadProg < 100 &&  'opacity-30' }`}/>
            </div>
            {fileUploadError &&  
            <Alert color='failure'>
                {fileUploadError}
            </Alert>}
           
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='text' id='password' placeholder='*******password' disabled/>
          <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile