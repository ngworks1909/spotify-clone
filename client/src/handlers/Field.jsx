import React, { useState } from 'react'
import '../css/Field.css'
import { MdError } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserState } from '../states/UserState';

export default function Username({id, title, error, placeholder, type, doc}) {
  const setUser = useSetRecoilState(UserState);
  const user = useRecoilValue(UserState);
  const [err, setErr] = useState(false);
  const handleInput = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setUser(prevUser => ({...prevUser, [type]:val}));
    if(val.length === 0){
      setErr(true);
    }
    else if(err){
      setErr(false);
    }
  }
  return (
    <div className='field-form display-flex flex-column gap-5'>
       <div className="user-label display-flex flex-column gap-5">
        <label htmlFor={`username-${id}`} className='label-name'>{title}</label>
        <input type={doc} name="username" id={`username-${id}`} className={`log-user-input input-field ${err && 'input-error'}`} value={user.type} onChange={handleInput} placeholder={placeholder} autoComplete='true' required />
        <div className={`error display-flex align-center gap-5 ${!err && 'd-none'}`}>
          <MdError color='#d31225' className='error-icon'/>
          <span className='error-text'>{error}</span>
       </div>
       </div>
    </div>
  )
}
