import React from 'react';
import './home.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


function Home() {
  const forward = useNavigate();

  const goForward = () => {
    forward('/levels');
  };
  return (
    <>
      <div className="homepage">
        <Navbar />
        <div className="image"></div>
        <div className="bottom">
          <Button
            type="primary"
            size="large"
            icon={<i className="fa-solid fa-user-secret fa-lg"></i>}
          >
            User
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={goForward}
            icon={<i className="fa-solid fa-angles-right fa-fade fa-lg"></i>}
          >
            Go
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
