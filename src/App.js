import React, { useState } from 'react';

import Login from './components/Login';
import Users from './components/Users';
import AddUser from './components/AddUser';
import SideBar from './components/SideBar';
import Header from './components/Header';

import './App.scss';

const App = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const updateShowAddUserForm = showAddUserForm => {
    setShowAddUserForm(showAddUserForm);
  }

  const tokenExist = document.cookie.split(';').some((item) => item.trim().startsWith('token=')) ? true : false;

  return (
    <div className='App'>
      {!tokenExist && <Login /> }
      {tokenExist && !showAddUserForm && <Header />}
      {tokenExist && !showAddUserForm && <SideBar />}
      {tokenExist && !showAddUserForm && <Users updateShowAddUserForm={updateShowAddUserForm} />}
      {showAddUserForm && <AddUser updateShowAddUserForm={updateShowAddUserForm} />}
    </div>
  );
};

export default App;
