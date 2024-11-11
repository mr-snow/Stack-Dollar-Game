import React from 'react';

function Wall(props) {
  return (
    <div
      style={{
        top: props.value.y,
        left: props.value.x,
        width:props.value.width,
        height:props.value.height,
        backgroundImage:`url(${props.value.image})`,
        backgroundRepeat:'repeat',
        backgroundSize:`${props.value.size}px`,
        position:'absolute',
        zIndex:props.value.zIndex,
        padding:'1px',
        boxShadow:'4px 4px 6px 2px black'
      }}
    ></div>
  );
}

export default Wall;
