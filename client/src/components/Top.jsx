import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { HiMenuAlt2 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import '../css/Top.css';
import { Host } from '../states/Host';
import { MobileState } from '../states/MobileState';

export default function Top() {
  const userName = localStorage.getItem('username'); 
  const [username, setUserName]= useState(userName?userName:'');
  const [loading, setLoading] = useState(true);
  const setMobile = useSetRecoilState(MobileState);
  const host = useRecoilValue(Host);
  const fetchUser = async(authToken) => {
    const response = await fetch(`https://${host}/api/auth/fetchUser`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token": authToken,
                }
    });
    const json = await response.json();
    console.log(json);
    const {user} = json;
    if(json.success){
      setUserName(user.username);
      localStorage.setItem('username', user.username);
    }
    setLoading(false);
  }
  useEffect(()=>{
    const authToken = localStorage.getItem('token');
    if(authToken){
      fetchUser(username==='' && authToken);
    }
    else{
      setLoading(false);
    }
    // eslint-disable-next-line
  },[]);

  const logout = () =>{
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUserName('')
  }
  return (
    <>
    <div className="top display-flex align-center justify-between">
      <div className="mobile-display">
        <HiMenuAlt2 size={20} className='color-white cursor-pointer' onClick={(e) => {
          e.preventDefault();
          setMobile(true);
        }} />
      </div>
       
      {loading && <div className="display-flex flex-column">
       <div className="skeleton skeleton-text"></div>
       </div>}

        {!loading && (username === '') &&
         <div className='topWrapper display-flex gap-10 align-center'>
        <Link to="/signup" className='decoration-none font-16 sign-button'>Signup</Link>
        <Link to="/login" className='decoration-none log-button font-16'>Login</Link>
        </div>
        }
        {!loading && (username !== '') && 
        <div className="menu-list display-flex align-center">
           <div className='display-flex align-center justify-center menu-icon-button'>
           <div className="top-user display-flex align-center justify-center cursor-pointer">
                <span className='user-name-display'>{username[0].toLocaleUpperCase()}</span>
           </div>
               <div className="box display-flex flex-column">
                    <button className='display-flex align-center cursor-pointer gap-1'>
                        <CgProfile className='hidden-icon'/>
                        <span>Profile</span>
                    </button>
                    <button className='display-flex align-center gap-1 cursor-pointer' onClick={logout}>
                        <BiLogOut className='hidden-icon'/>
                        <span>Logout</span>
                    </button>
               </div>
           </div>
        </div>
        }
        
    </div>
      
    </>
  )
}
