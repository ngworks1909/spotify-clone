import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import logo from '../assets/sploginlogo.png';
import '../css/Login.css';
import Field from '../handlers/Field';
import { Host } from '../states/Host';
import { UserState } from '../states/UserState';


export default function Login() {
  const setUser = useSetRecoilState(UserState);
  const user = useRecoilValue(UserState);
  const host = useRecoilValue(Host);
  
  const navigate = useNavigate();
  
  
  useEffect(() => {
    window.scrollTo(0,0);
    setUser({});
  },[setUser]);

  const handleLogin = async(user) =>{
    const {email, password} = user;
    const response = await fetch(`https://${host}/api/auth/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                },
              body: JSON.stringify({email, password}),
    });
      const json = await response.json();
      if(json.success){
        const {authToken} = json;
        localStorage.setItem('token', authToken);
        navigate("/");
      }
      else{
        // console.log(json.error);
        toast.error(json.error);
      }
  }

  return (
    <>
    <div className='login display-flex justify-center align-center flex-column'>
      <Link to={'/'}><input type="image" className='login-logo' src={logo} alt="" /></Link>
      <div className="log-main">
      <div className="login-icons display-flex flex-column align-center gap-10">
           <Link to='/' className="btn facebook btn-primary decoration-none display-flex align-center justify-center color-white">CONTINUE WITH FACEBOOK</Link>
           <Link to='/' className="btn apple btn-dark decoration-none display-flex align-center justify-center color-white">CONTINUE WITH APPLE</Link>
           <Link to='/' className="btn bt google btn-light decoration-none display-flex align-center justify-center">CONTINUE WITH GOOGLE</Link>
           <Link to='/' className="btn bt mobile btn-light decoration-none display-flex align-center justify-center">CONTINUE WITH MOBILE NUMBER</Link>
       </div>
       <div className="break display-flex align-center justify-center">
         <span className='span-or'>OR</span>
       </div>
       <div className="login-items display-flex flex-column">
           <div className="user-fields display-flex flex-column gap-1">
           <Field title={'Email address or username'} error={'Please enter your Spotify username or email address.'} placeholder={'Email address or username'} type={'email'} doc={'email'} id={1} />
           <Field title={'Password'} error={'Enter a valid password.'} placeholder={'Password'} type={'password'} doc={'password'} id={2} />
           </div>
           <div className="forgot">
           <Link to="/login" className='forgot-password decoration-none'>Forgot your password?</Link>
           </div>
           <div className="remme display-flex justify-between">
            <div className="remember display-flex align-center gap-05">
            <input type="checkbox" name="Remember Me" id="rememberme"/>
            <span className='rem-span'>Remember Me</span>
            </div>
            <button className='log-submit decoration-none color-black cursor-pointer' onClick={(e)=>{
              e.preventDefault();
              handleLogin(user);
            }} >Login</button>
           </div>
           <div className="dont-have-acc display-flex flex-column gap-10">
           <span className='dont-text'>Don't have an account?</span>
           <Link to='/signup' className="btn bt mobile btn-light decoration-none display-flex align-center justify-center">SIGNUP FOR SPOTIFY</Link>
           </div>
       </div>
      </div>
    </div>
    <ToastContainer theme='dark'/>
    </>
  )
}
