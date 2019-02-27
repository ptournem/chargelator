import React from 'react';
import{Image, Glyphicon } from 'react-bootstrap';

const UserConnection = ({user,onLogin,onLogout}) => {
  if(!user ){
    return   <Glyphicon glyph="user" onClick={onLogin} />;
  }


  return (
    <div id="user-connection-logout" onClick={onLogout}>
    <Image circle src={user.photoURL} />
    <Glyphicon glyph="remove" />
    </div>
  );

}

export default UserConnection;
