import React from 'react';

import { connect } from 'react-redux';
import { handleDeleteRequest } from '../redux/actions';

import './UserCard.scss';

const UserCard = (props) => {
  const { user } = props;
  const birthday = new Date(user.BirthDate).toLocaleDateString();

  return (
    <section className='userCard'>
      <div className='top'>				
        <img className='userImage' src={user.Photo} alt='Avatar'/>
      </div>
      <div className='nametroduction'>
        <div className='name'>{user.FirstName + ' ' + user.LastName}</div>
        <div className='role'>{user.Role}</div>
      </div>	
      <div className='contact'>
        <div className='personalData'>
          <p>ID:</p>
          <p>{user.ID}</p>
        </div>
        <div className='personalData'>
          <p>Birthday:</p>
          <p>{birthday}</p>
        </div>
        <div className='personalData'>
          <p>Address:</p>
          <p>{user.Address}</p>
        </div>
        <div className='bottom'>
          <div className='personalData'>
            <div onClick={() => window.open(user.Email)} className='far fa-envelope'></div>
            <p onClick={() => window.open(user.Email)}>{user.Email}</p>
          </div>
          <div className='deleteBtn'>
            <div className='far fa-trash-alt' id={user.objectId} onClick={e => props.handleDeleteRequest(e.target.id)}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  token: state.reducer.token
});

const mapDispatchToProps = {
  handleDeleteRequest: id => handleDeleteRequest(id)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
