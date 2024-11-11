import React from 'react';
import './Carpet.css';

function Carpet(props) {
  return (
    <>
      <div
        className="carpet"
        style={{
          backgroundImage: `url(${props.value.image})`,
          width: props.value.width,
          height: props.value.height,
          top: props.value.top,
          left: props.value.left,
          position: 'absolute',
          zIndex: props.value.zIndex,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></div>
    </>
  );
}

export default Carpet;
