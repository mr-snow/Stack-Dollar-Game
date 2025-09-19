import React from 'react';
import './owner.css';

function Owner(props) {
  return (
    <div
      style={{
        height: props.value.radius * 2,
        width: props.value.radius * 2,
        borderRadius: '50%',
        position: 'absolute',
        top: props.value.top,
        left: props.value.left,
        zIndex: '3',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fontSize: props.value.size,
      }}
      className="ownerdiv"
    >
      <i
        className="fa-solid fa-user-secret fa-beat-fade fa-2xl"
        style={{ color: props.value.color }}
      ></i>
    </div>
  );
}

export default Owner;
