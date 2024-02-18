import React, { useEffect } from 'react'
import logo from '../assets/sploginlogo.png'
import '../css/Register.css'
import { Link , useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Field from '../handlers/Field'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UserState } from '../states/UserState'
import { Host } from '../states/Host';

export default function Register() {
  const setUser = useSetRecoilState(UserState);
  const user = useRecoilValue(UserState);
  const host = useRecoilValue(Host);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0,0);
    setUser({});
  },[setUser]);
  const handleRegister = async(user) =>{
    const {email, password, username} = user;
    const response = await fetch(`http://${host}:3001/api/auth/createUser`, {
        method: "POST",
        headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify({username, email, password}),
        });
        const json = await response.json();
        if(json.success){
          const {authToken} = json;
          localStorage.setItem('token', authToken);
          navigate("/");
        }
        else{
          toast.error(json.error);
        }
  }
  return (
    <>
    <div className='register display-flex align-center flex-column gap-2 justify-center'>
      <Link to={'/'}><input type="image" className='reg-logo' src={logo} alt="" /></Link>
      <div className="reg-text display-flex flex-column align-center justify-center">
        <span className='sign-text'>Signup for free to start</span>
        <span className='sign-text m-1'>listening.</span>
      </div>
      <div className="reg-icons display-flex flex-column align-center gap-10">
           <Link to='/' className="btn facebook btn-primary decoration-none display-flex align-center justify-center color-white">CONTINUE WITH FACEBOOK</Link>
           <Link to='/' className="btn bt google btn-light decoration-none display-flex align-center justify-center">CONTINUE WITH GOOGLE</Link>
       </div>
       <div className="break display-flex align-center justify-center">
         <span className='span-or spnr'>or</span>
       </div>
       <div className="user-fields display-flex flex-column gap-1">
           <Field title={"What's your email?"} error={'You need to enter your email.'} type={'email'} doc={'email'} placeholder={'Enter your email'} id={3} />
           <Field title={'Confirm your email'} error={'You need to confirm your email.'} type={'conf-email'} doc={'email'} placeholder={'Enter your email again'} id={4} />
           <Field title={'Create your password'} error={'You need to enter a password.'} type={'password'} doc={'password'} placeholder={'Create your password'} id={5} />
           <Field title={"What should we call you?"} error={'Enter a name for your profile.'} type={'username'} doc={'text'} placeholder={'Enter a profile name'} id={6} />
        </div>
        <button className='reg-submit decoration-none color-black cursor-pointer' onClick={(e)=>{
          e.preventDefault();
          handleRegister(user);
        }} >Sign up</button>
        <span>Having an account?<Link to={'/login'} className='sign-log-link'>Login</Link></span>
    </div>
    <ToastContainer theme='dark'/>
    </>
  )
}
