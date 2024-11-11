import React from 'react';
import { useNavigate } from 'react-router-dom';

function Level2() {
  const back = useNavigate();
  const goBack = () => {
    back(-1);
  };

  return (
    <>
      <p>this is level2..</p>
      <button onClick={goBack}>Back</button>
    </>
  );
}

export default Level2;
