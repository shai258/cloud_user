const LOGIN_URL = 'https://cors-anywhere.herokuapp.com/https://reqres.in/api/login';
const USERS_URL = 'https://api.backendless.com/525C6ECF-BE35-D74F-FFC7-777E0FA29F00/3777A415-DFD8-4240-B51A-DCE496757AB7/data/cyberhat_users';
const CONFIG_URL = 'https://api.backendless.com/525C6ECF-BE35-D74F-FFC7-777E0FA29F00/3777A415-DFD8-4240-B51A-DCE496757AB7/data/cyberhat_config/7C908D2B-DA78-4C9B-8BFF-36647A42E86D';

export const handleGetUsers = () => dispatch =>
getUsers().then(response => {
  dispatch({
    type: 'GET_USERS',
    users: response,
  });
});

export const handleGetRoles = () => dispatch =>
getRoles().then(response => {
  const roles = JSON.parse(response.Enums).role;
  dispatch({
    type: 'GET_ROLES',
    roles,
  });
});

export const handleLoginReq = (email, password) => dispatch => 
    loginReq(email, password).then((response) => {
    document.cookie = `token=${response.token};`;
    window.location.reload(false);
  });

export const handleDeleteRequest = id => dispatch =>
  deleteRequest(id).then(() => dispatch(handleGetUsers()));

export const handleAddNewUser = newUser => dispatch =>
  addNewUser(newUser).then(() => dispatch(handleGetUsers()));

export const loginReq = async(e, email, password) => {
  e.preventDefault();

  const requestBody = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  };

  let response = null;

  await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(requestBody)}
  )
    .then(response => response.json())
    .then(data => response = data)
    .catch(error => console.log('Error:', error))

    return response
};

export const deleteRequest = async id => {
  let response = null;

  await fetch(`${USERS_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => response=data)
    .catch(error => console.log('Error:', error))
  
  return response;
};

export const addNewUser = async newUser => {
  let response = null;

  await fetch(USERS_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(data => response = data)
    .catch(error => console.log('Error:', error))
  
    return response;
};

export const getUsers = async() => {
  let response = null;

  await fetch(USERS_URL)
    .then(response => response.json())
    .then(data => response=data)
    .catch(error => console.log('Error:', error))

  return response;
};

export const getRoles = async() => {
  let response = null;
  
  await fetch(CONFIG_URL)
    .then(response => response.json())
    .then(data => response=data)
    .catch(error => console.log('Error:', error))

return response;
};
