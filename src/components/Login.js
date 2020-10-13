import React, { useState } from 'react';

import { connect } from 'react-redux';
import { handleLoginReq } from '../redux/actions';

import logo from '../logo.png';
import './Login.scss';

const Login = (props) => {
  const [email, setEmail, ] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='loginWrapper'>
      <div className='inner'>
      <div className='subInnerTop'></div>
      <div className='subInnerBottom'></div>
      <div className='loginHeader'>
        <img src={logo} alt='Logo' />
        <h3>User Cloud</h3>
      </div>
      <h3>Sign in</h3>
      <form onSubmit={e => props.handleLoginReq(e, email, password)}>
        <div className='form-wrapper'>
          <div className='far fa-envelope'></div>
          <input type='email'
                 className='form-control' 
                 minLength='6'
                 maxLength='25' 
                 value={email} 
                 placeholder='Email'
                 onChange={e => setEmail(e.target.value)}>
          </input>
        </div>
        <div className='form-wrapper'>
          <div class="fa fa-lock"></div>
          <input type='password'
                 className='form-control'
                 minLength='6' 
                 maxLength='25' 
                 value={password} 
                 placeholder='Password'
                 onChange={e => setPassword(e.target.value)}></input>
        </div>
        <button type='submit'>Sign in</button>
      </form>
    </div>
  </div>
  );
};

const mapDispatchToProps = {
  handleLoginReq: (email, password) => handleLoginReq(email, password)
};

export default connect(null, mapDispatchToProps)(Login);
