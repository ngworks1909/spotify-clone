import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
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
        {!loading && (username !== '') && <div className="top-user display-flex align-center justify-between">
        <span className='color-white user-name-display'>{username.toLocaleUpperCase()}</span>
        <div className="menu-icon display-flex align-center">
        <IoMdArrowDropdown className='color-white cursor-pointer drop-icon' size={25}/>
        <div className="drop-down display-flex align-center gap-1 cursor-pointer" onClick={logout}>
           <BiLogOut className='color-white'/>
           <span className='color-white'>Logout</span>
        </div>
        </div>
        </div>}
        
    </div>
      
    </>
  )
}
