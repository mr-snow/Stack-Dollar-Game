import React from 'react';
import './navbar.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import userLogo from '../../assets/levels/user.png';

function Navbar() {
  const homenavigate = useNavigate();
  const back = useNavigate();

  const goHome = () => {
    homenavigate('/');
  };
  const goBack = () => {
    back(-1);
  };
  return (
    <>
      <nav>
        <img src="/Stack-Dollar-Game/user.png" alt="" />
        <h2>Sack Dollar</h2>
        <i className="fa-solid fa-sack-dollar fa-shake"></i>
        <div className="btns">
          <Button ghost onClick={goHome}>
            Home
          </Button>
          <Button ghost onClick={goBack}>
            Back
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
