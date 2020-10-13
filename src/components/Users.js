import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { handleGetUsers } from '../redux/actions';

import UserCard from './UserCard';

import './Users.scss';

const Users = (props) => {
  const [searchWord, setSearchWord] = useState('');
  
  useEffect(() => {
    props.handleGetUsers();
  }, [props.token]);

  const filterUsers = (user) => {
    if (!searchWord) return true;
    const fullName = user.FirstName + ' ' + user.LastName;
    return fullName.toLowerCase().includes(searchWord.toLowerCase());
  };

  return (
    <div className='usersContainer'>
      <div className='usersHeader'>
        <h2>Organization Users</h2>
      </div>
      <div className='rightBar'>
        <div className='searchBarContainer'>
          <input type='text' value={searchWord} placeholder='Search for a user' onChange={e => setSearchWord(e.target.value)}></input>
          <div className='search'>
            <div className='subBtnTop'></div>
            <div className='subBtnRight'></div>
            <div className='subBtnBottom'></div>
            <div className='subBtnLeft'></div>
          </div>
        </div>
        <div className='addBtnContainer'>
          <div className='addBtn' onClick={()=>props.updateShowAddUserForm(true)}>
            <div className='subBtnTop'></div>
            <div className='subBtnRight'></div>
            <div className='subBtnBottom'></div>
            <div className='subBtnLeft'></div>
          </div>
        </div>
      </div>
      <div className='cardsContainer'>
        {props.users.length && props.users.filter(user => filterUsers(user)).map((user, i) => <UserCard key={i} user={user} />)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.reducer.users,
  token: state.reducer.token
});

const mapDispatchToProps = {
  handleGetUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
