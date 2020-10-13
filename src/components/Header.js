import React from 'react';

import logo from '../logo.png';

import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt='Logo' />
      <h3>User Cloud</h3>
    </div>
  );
};

export default Header;
