import { combineReducers } from 'redux';

export const initialState = {
  showAddUserForm: false,
  token: '',
  users: [],
  roles: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {...state, users: action.users};
    case 'GET_ROLES':
      return {...state, roles: action.roles};
    default:
      return state;
  }
};

const reducers = combineReducers({
  reducer,
});

export default reducers;