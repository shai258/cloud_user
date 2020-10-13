import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { handleGetRoles, handleAddNewUser } from '../redux/actions';

import './AddUser.scss';

const AddUser = (props) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Email, setEmail] = useState('');
  const [Adress, setAdress] = useState('');
  const [Role, setRole] = useState('');
  const [Photo, setPhoto] = useState('');

  useEffect(() => {
    props.handleGetRoles();
  }, [props.token]);

  const fileValidation = (fileInput) => {       
    const filePath = fileInput.value; 
  
    // Allowing file type 
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
      
    if (!allowedExtensions.exec(filePath)) { 
        alert('Invalid file type'); 
        fileInput.value = ''; 
        return false; 
    }  
    else { 
      //Convert file to Base64 string and set to state    
      if (FileReader && fileInput.files && fileInput.files.length) {
  
        let file = fileInput.files[0];
        let reader = new FileReader();
        try {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPhoto(reader.result);
          }; 
        } catch (err) {
          console.log('Error: ' + err.stack);
        }
      }
    }
  }; 

  const handleAddUser = e => {
    e.preventDefault();

    let newUser = {
      "ID": new Date().getUTCMilliseconds(),
      "FirstName": FirstName,
      "LastName": LastName,
      "Email": Email,
      "Address": Adress,
      "Photo": Photo,
      "Role": Role,
      "BirthDate": Birthday
    };

    props.handleAddNewUser(newUser);
    props.updateShowAddUserForm(false);
  };

  return (
    <div className='wrapper'>
      <div className='inner'>
        <div className='subInnerTop'></div>
        <div className='subInnerBottom'></div>
        <div className='closeBtn' onClick={() => props.updateShowAddUserForm(false)}>
          <div className='subBtnTop'></div>
          <div className='subBtnRight'></div>
          <div className='subBtnBottom'></div>
          <div className='subBtnLeft'></div>
        </div>
        <form onSubmit={e => handleAddUser(e)}>
          <h3>Add New User</h3>
          <div className='form-group'>
            <div className='form-wrapper'>
              <label htmlFor='firstName'>First Name</label>
              <input type='text'
                     id='firstName'
                     value={FirstName}
                     className='form-control' 
                     maxLength='25'
                     onChange={e => setFirstName(e.target.value)}
                     required>
              </input>
            </div>
            <div className='form-wrapper'>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text'
                     id='lastName'
                     value={LastName}
                     className='form-control' 
                     maxLength='25'
                     onChange={e => setLastName(e.target.value)}
                     required>
              </input>
            </div>
          </div>
          <div className='form-wrapper'>
            <label htmlFor='email'>Email</label>
            <input type='email'
                   id='email'
                   value={Email}
                   className='form-control'
                   onChange={e => setEmail(e.target.value)}
                   required>
            </input>
          </div>
          <div className='form-wrapper'>
            <label htmlFor='address'>Address</label>
            <input type='text'
                   id='address'
                   value={Adress}
                   className='form-control'
                   maxLength='250'
                   onChange={e => setAdress(e.target.value)}
                   required>
            </input>
          </div>
          <div className='form-wrapper'>
            <label htmlFor='date'>Birth Date</label>
            <input type='date'
                   id='date' 
                   value={Birthday}
                   className='form-control'
                   onChange={e => setBirthday(e.target.value)}
                   required>
            </input>
          </div>
          <div className='form-wrapper'>
            <label htmlFor='photo'>Photo</label>
            <input type='file'
                   id='photo' 
                   className='form-control' 
                   onChange={e => fileValidation(e.target)}
                   required>
            </input>
          </div>
          <div className='form-wrapper'>
            <label htmlFor='role'>Role</label>
            <select className='form-control' id='role' value={Role} onChange={e => setRole(e.target.value)}>
              <option value='' >select</option>
              {props.roles.length && props.roles.map((v, i) => <option key={i} value={v}>{v}</option>)}
            </select>
          </div>
          <button type='submit'>ADD</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.reducer.token,
  roles: state.reducer.roles
});

const mapDispatchToProps = {
  handleGetRoles,
  handleAddNewUser: newUser => handleAddNewUser(newUser)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
