import React from 'react'
import { useSelector } from 'react-redux'
import {Button, TextInput} from 'flowbite-react'



function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-bold text-3xl'>Profile</h1>
    <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md'>
         <img src={currentUser.profilePicture} alt="user"
         className='rounded-full w-full h-full border-8 border-[lightgray]' />
        </div>
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