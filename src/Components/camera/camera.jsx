import React from 'react';
import './camera.css';

function Camera(props) {
  return (
    <div
      style={{
        width: props.value.radius * 2,
        height: props.value.radius * 2,
        top: props.value.y,
        left: props.value.x,
        borderRadius: '50%',
        position: 'absolute',
        zIndex: '3',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fontSize:props.value.size
      }}
      className="cameraCircle"
    >
      <i
        className="fa-solid fa-video fa-beat-fade fa-2xl"
        style={{ color: props.value.color }}
      ></i>
    </div>
  );
}

export default Camera;
