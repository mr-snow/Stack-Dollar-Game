import React from 'react';

function Tile(props) {
  return (
    <div
      className="tile"
      style={{
        backgroundImage:`url(${props.value.image})`,
        width: props.value.width,
        height: props.value.height,
        top: props.value.top,
        left: props.value.left,
        position: 'absolute',
        zIndex: props.value.zIndex,
        backgroundRepeat:'repeat',
        backgroundSize:'200px'
      }}
    ></div>
  );
}

export default Tile;
