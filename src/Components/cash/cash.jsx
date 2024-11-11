import React from 'react';
import './cash.css';

function Cash(props) {
  return (
    <div
      style={{
        top: props.value.y,
        left: props.value.x,
        width: props.value.width,
        height: props.value.height,
        zIndex: props.value.zIndex - 7,
        color: props.value.color,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: '50%',
      }}
    >
      <img
        src={props.value.image}
        alt=""
        style={{
          objectFit: 'fill',
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '50%',
          backgroundPosition: 'center',
          boxShadow: '0px 0px 2px 2px gold',
        
        }}
      />
      <div style={{ position: 'absolute',fontSize:'10px', fontWeight:'600' ,  mixBlendMode: 'dark', }}>{props.value.point}</div>
    </div>
  );
}

export default Cash;
