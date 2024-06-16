import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Button, TextInput, Alert} from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';


function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);

    //storing the image file we will get after selection
    const [imageFile, setImageFile] = useState(null); 
    //this state will hold the temporary URL generated to change the image in profile
    const [imageFileUrl, setImageFileUrl] = useState(null);
    
    //Ref for the file
    const filePickerRef = useRef();

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    // const [imageFileUploading, setImageFileUploading] = useState(false);


    //
//     const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
//   const [updateUserError, setUpdateUserError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({});

    //handleImageChange called by image input to change the user profile image
    const handleImageChange = (e) => {
        const file = e.target.files[0]; //Get the first file selected by the user when the selection box opens

        if (file) {
          setImageFile(file); //storing the file
          setImageFileUrl(URL.createObjectURL(file)); //converting it into the temp url using the createObjectUrl method of URL class in javascript
        }
    };
    // console.log(imageFile, imageFileUrl);

    //upload image functionality
    const uploadImage = async () => {
        // service firebase.storage {
        //   match /b/{bucket}/o {
        //     match /{allPaths=**} {
        //       allow read;
        //       allow write: if
        //       request.resource.size < 2 * 1024 * 1024 &&
        //       request.resource.contentType.matches('image/.*')
        //     }
        //   }
        // }
        // setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name; //if user select the same file twice in the firebase database bucket it will have the same name and will give the error when handling the backend so made it unique
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          'state_changed',
         (snapshot) => {
        //     // const progress =
        //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
        //     // setImageFileUploadProgress(progress.toFixed(0));
        //     console.log
           },
          (error) => {
            setImageFileUploadError(
              'Could not upload image (File must be less than 2MB)'
            );
            // setImageFileUploadProgress(null);
            // setImageFile(null);
            // setImageFileUrl(null);
            // setImageFileUploading(false);
          },
          
          () => { //this callback fucntion of firebase is returing the url of saved image
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => { 
                 setImageFileUrl(downloadURL);
            //   setFormData({ ...formData, profilePicture: downloadURL });
            //   setImageFileUploading(false);
            });
          }
        );
      };
     console.log(imageFileUploadProgress);

    //useEffect to upload an image whenever there is an image available in the state
    useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
      }, [imageFile]);

    return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-bold text-3xl'>Profile</h1>
    <form className='flex flex-col gap-4'>

        <input type='file' accept='image/*' 
        onChange={handleImageChange} 
        ref={filePickerRef}/> {/*  ref will ensure that whenever the image div is click it automatically trigger the referenced input tag to choose the image*/}

        <div className='w-32 h-32 self-center cursor-pointer shadow-md' onClick={() => filePickerRef.current.click()} > {/* reference object is called on onclick*/}
         <img  
         src={imageFileUrl || currentUser.profilePicture} 
         alt="user"
         className='rounded-full w-full h-full border-8 border-[lightgray]' 
         />
        </div>

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput 
        type='text'
        id='username'
        defaultValue={currentUser.username}
        />
        <TextInput 
        type='text'
        id='email'
        defaultValue={currentUser.email}
        />
        <TextInput 
        type='text'
        id='Password'
        placeholder='#Change password'
        />
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
            Update
        </Button>
     </form>

       <div className='text-red-500 flex justify-between mt-5'>
         <span className='curser-pointer'>Delete Account</span>
         <span className='curser-pointer'>SignOut</span>
       </div>
    </div>
  )
}

export default DashProfile