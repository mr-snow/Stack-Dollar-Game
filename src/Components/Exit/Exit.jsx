import React from 'react';
import './Exit.css'

function Exit(props) {
  return (
    <>
      <div
        className="exitDiv"
        style={{
          width: props.value.width,
          height: props.value.height,
          top: props.value.top,
          left: props.value.left,
          zIndex: props.value.zIndex,
        }}
      >
        <div>
          <i
            className="fa-solid fa-person-running fa-fade fa-xl  exitIcon"
            style={{ width: '100%', height: '100%' }}
          ></i>
        </div>
      </div>
    </>
  );
}

export default Exit;
