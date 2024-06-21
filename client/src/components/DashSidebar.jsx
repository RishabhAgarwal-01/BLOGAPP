import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight,HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie,} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function DashSidebar() {
    const location= useLocation(); //to get the current location of the path /dashboard/....
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);  //getting the currentUser data
  const [tab, setTab] = useState(''); //state to store the tab params in the location path 
  useEffect(()=>{
    //First step to get the parameters passed in the URL like /dashbord?tab=profile
    const urlParams = new URLSearchParams(location.search); //using the URLSeachParams constructor of the javascipt to get the params from the location
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl); 
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]); //render the useEffect whenever change in the location

  //signout
  const handleSignout = async()=>{
    try {
      const res= await fetch(`/api/user/signout`, {
        method: "POST",
      }); 
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
         dispatch(signoutSuccess());
      }
    } catch (error) {
       console.log(error.message)
    }
  }

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
             onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar