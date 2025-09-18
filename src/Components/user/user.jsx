import React from 'react';
import './user.css';

function User(props) {
  return (
    <div
      style={{
        top: props.value.y,
        left: props.value.x,
        height: props.value.user_Circle,
        width: props.value.user_Circle,
        backgroundImage: 'url("/Stack-Dollar-Game/user.png")',
        backgroundSize: 'cover',
        borderRadius: '50%',
        position: 'absolute',
        zIndex: '3',
      }}
      className="userIcon"
    ></div>
  );
}

export default User;
