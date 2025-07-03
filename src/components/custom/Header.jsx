import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Header() {
  // onClick={() => (window.location.href = '/create-trip')
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);
   
    const GetUserProfile = (tokenInfo) => {
      axios
        .get('https://www.googleapis.com/oauth2/v1/userinfo', {
          params: {
            access_token: tokenInfo?.access_token,
          },
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((resp) => {
          console.log("hello veere",resp.data); // Usually, resp.data contains the user info
          localStorage.setItem('user', JSON.stringify(resp.data));
          setOpenDailog(false);
          // window.location.reload();
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err);
        });
    };

    const login = useGoogleLogin({
      onSuccess: (codeResp) => {
        console.log('Login Success:', codeResp);  // optional
        GetUserProfile(codeResp); // <-- Call the function to get profile data
      },
      onError: (error) => {
        console.error('Login Error:', error);
        
      },
      
    });
    
  return (
    <>
        <div className=' flex justify-between  p-3 shadow-sm'>
            <div className=' flex items-center gap-[5px] '>
                <img className=' w-[25px] xl:w-[40px] ' src='/logo.svg' />
                <h1 className=' font-bold text-[18px] xl:text-2xl' >PlanifyAI</h1>
            </div>
           
            {
                user?
                 <div className=' flex gap-[20px] ' >
                <Link to="/create-trip" className=' xl:p-2 xl:text-[15px] border rounded-2xl items-center flex text-[13px] p-1 cursor-pointer hover:bg-gray-200  '>+ Create Trip</Link>
                <Link to='/my-trips' >
                 <div className=' cursor-pointer border text-[13px]  p-2 xl:text-[15px] rounded-2xl hover:bg-gray-200  ' >My Trips</div>
                </Link>
                 <Popover>
                  <PopoverTrigger><img className=' rounded-[100%] size-[40px] cursor-pointer ' src={user.picture} alt='' /> </PopoverTrigger>
                 <PopoverContent>
                  <h2 onClick={() => {
                      googleLogout();
                      localStorage.clear()
                      window.location.reload()
                      window.location.href='/'
                    }} className=' cursor-pointer ' >Logout
                    </h2>
                 </PopoverContent>
              </Popover> 
                 </div>
                 : <button onClick={() =>setOpenDailog(true)}  className=' font-serif bg-black text-white cursor-pointer p-2  rounded-xl '>Sign In</button>
            }
          
        </div>
        <Dialog open={openDailog}>
                     
                     <DialogContent>
                         <DialogHeader>
                               <DialogDescription>
                                 <div className='flex gap-[5px]'>
                                   <img className='h-[35px] ' src='/logo.svg'/>
                                   <p className='  font-bold text-black text-[25px]'>PlanifyAI</p>
                                 </div>
                                 <div className=' pt-[25px] ' >
                                   <p className=' font-bold text-[17px] '>Sign In With Google</p>
                                   <p>Sign in to the App with Google authentication securely</p>
                                 </div>
                                 <div className='pt-[18px]' >
                                   <Button onClick={login}  className='w-full cursor-pointer text-[16px] flex gap-[12px]' ><FcGoogle className=' size-[25px] ' /> Sign In With Google</Button>
                                 </div>
                               </DialogDescription>
                         </DialogHeader>
                     </DialogContent>
               </Dialog>  
    </>
  )
}  

export default Header