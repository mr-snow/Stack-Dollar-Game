import React from 'react';
import './Entry.css'

function Entry(props) {
  return (
    <>
      <div className='entryDiv'
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
          className="fa-solid fa-circle-arrow-up fa-fade fa-xl entryicon" 
          style={{ width: '100%', height: '100%' }}
        ></i>
        </div>
        
      </div>
    </>
  );
}

export default Entry;
