import React from 'react';

import './SideBar.scss';

const SideBar = () => {

  const deleteToken = () => {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;"; 
    window.location.reload(false);
  };

  return (
    <div className='sideBar'>
      <hr/>
      <i className="fas fa-sign-out-alt" onClick={deleteToken}></i>
    </div>
  );
};

export default SideBar;
