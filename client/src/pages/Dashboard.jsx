import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashboardComp from '../components/DashboardComp';

function Dashboard() {
  const location= useLocation(); //to get the current location of the path /dashboard/....
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
  return (
    <>
      <div className='min-h-screen flex flex-col md:flex-row'>
        <div  className='md:w-56'>
          {/*Sidebar */}
          <DashSidebar/>
         </div>

          {/*Profile */}
        {tab === "profile" && <DashProfile /> }

         {/*post */}
         {tab === "posts" && <DashPosts /> }

          {/*users */}
          {tab === "users" && <DashUsers /> }

           {/*comments */}
           {tab === "comments" && <DashComment /> }

           {/*Dashboard Component */}
           {tab === "dash" && <DashboardComp /> }
      </div>
    </>
    
  )
}

export default Dashboard