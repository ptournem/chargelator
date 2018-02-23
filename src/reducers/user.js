import {SET_USER} from '../actions';
import {fromJS} from 'immutable';

function getDefaultState(){
	const user = null;
	return fromJS({
    user
  });
}

const setUser = (state,action) => {
  const {payLoad} = action;
  const {user} = payLoad;
  return state.set('user',user);
}

const userReducer = (state = null,action) => {
  if(state === null){
    state = getDefaultState();
  }
  switch(action.type){
    case SET_USER: return setUser(state,action);
    default : return state;
  }
};

export default userReducer;
