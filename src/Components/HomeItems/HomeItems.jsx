import React from 'react';

function HomeItems(props) {
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
          mixBlendMode: props.value.mode || 'normal',
          transform: `rotate(${props.value.rotate}deg)` || 0,
          opacity: props.value.opacity,
          
        }}
      ></div>
    </>
  );
}

export default HomeItems;
