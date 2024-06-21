import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Button, TextInput, Alert, Modal} from 'flowbite-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';
import { updateStart, updateFailure, updateSuccess,
  deleteUserFailure, deleteUserStart, deleteUserSuccess
 } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {HiOutlineExclamationCircle} from "react-icons/hi";

function DashProfile() {
    const {currentUser, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    //storing the image file we will get after selection
    const [imageFile, setImageFile] = useState(null); 
    //this state will hold the temporary URL generated to change the image in profile
    const [imageFileUrl, setImageFileUrl] = useState(null);
    
    //Ref for the file
    const filePickerRef = useRef();

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    // const [imageFileUploading, setImageFileUploading] = useState(false);



     const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
     const [updateUserError, setUpdateUserError] = useState(null);
     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({}); //state to store the form data

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
                 setFormData({ ...formData, profilePicture: downloadURL });
            //   setImageFileUploading(false);
            });
          }
        );
      };
    //  console.log(imageFileUploadProgress);
    
    //handleChange fucntionality
    const handleChange =(e)=>{
      setFormData({...formData, [e.target.id]: e.target.value});
    }
   
    //handleSubmit functionality
    const handleSubmit= async(e)=>{
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);

      if(Object.keys(formData).length ===0){
        setUpdateUserError("No chamges Made");
        return ;
      }
      dispatch(updateStart());
      try {
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method: "PUT",
          headers: {
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify(formData),
        })
        const data = await res.json();
        if(!res.ok){
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
        }
        else{
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully")
        }
      } catch (error) {
         dispatch(updateFailure(error.message))
      }
    }

    //hamdleDeleteUser functionality
    const handleDeleteUser = async ()=>{
      setShowModal(false);
      
        try {
          dispatch(deleteUserStart())
          const res= await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          });
          const data= await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(error.message));
          }
          else{
            dispatch(deleteUserSuccess(data));
          }
        } catch (error) {
           dispatch(deleteUserFailure(error.message));
        }
    }

    //useEffect to upload an image whenever there is an image available in the state
    useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
      }, [imageFile]);

    return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-bold text-3xl'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

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
        onChange={handleChange}
        />
        <TextInput 
        type='text'
        id='email'
        defaultValue={currentUser.email}
        onChange={handleChange}
        />
        <TextInput 
        type='text'
        id='Password'
        placeholder='#Change password'
        onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
            Update
        </Button>
     </form>

       <div className='text-red-500 flex justify-between mt-5'>
         <span onClick={()=>setShowModal(true)} className='curser-pointer'>Delete Account</span>
         <span className='curser-pointer'>SignOut</span>
       </div>
       {updateUserSuccess && (
          <Alert color='success'>{updateUserSuccess}</Alert>
        )}
        {updateUserError && (
          <Alert color='failure'>{updateUserError}</Alert>
        )}
        {error && (
          <Alert color='failure'>{error}</Alert>
        )}

        <Modal 
        show={showModal} 
        onClose={()=>setShowModal(false)} 
        popup 
        size='md'
        >
         <Modal.Header />
           <Modal.Body>
              <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
              </div>
           </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashProfile