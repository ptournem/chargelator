import React from 'react';
import {setUser} from '../actions';
import {auth,provider} from '../firebase';
import{Image, Glyphicon } from 'react-bootstrap';

const UserConnection = ({user}) => {
  const login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      setUser(result.user);
    });
  };

  const logout = () => {
    auth.signOut()
        .then(() => {
          setUser(null);
        });
  };

  if(!user ){
    return   <Glyphicon glyph="user" onClick={login} />;
  }


  return (
    <div id="user-connection-logout" onClick={logout}>
    <Image circle src={user.photoURL} />
    <Glyphicon glyph="remove" />
    </div>
  );

}

export default UserConnection;
