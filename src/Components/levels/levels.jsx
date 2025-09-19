import React from 'react';
import './levels.css';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import { Carousel, Card } from 'antd';



function Levels() {
  const navigate = useNavigate();
  const navigate2 = useNavigate();
 

  const onLevel1 = () => {
    navigate('/level1');
  };
  const onLevel2 = () => {
    navigate2('/level2');
  };

 
  return (
    <>
      <div className="mainlevels">
        <Navbar/>
        <Carousel arrows infinite={false}>
          <div>
            <Card
              style={{
                height: '375px',
                width: '500px',
                color: 'red',
                lineHeight: '160px',
                textAlign: 'center',
                background: 'green',
                margin: 'auto',
                marginBlock: '40px',
                boxShadow: '0px 0px 8px 5px white',
                backgroundImage: 'url("/Stack-Dollar-Game/robbe1.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
              className="card"
              onClick={onLevel1}
            ></Card>
            <div className="h2div">
              <h2>Level-1</h2>
            </div>
          </div>

          <div>
            <Card
              style={{
                height: '375px',
                width: '500px',
                color: 'red',
                lineHeight: '160px',
                textAlign: 'center',
                background: 'green',
                margin: 'auto',
                marginBlock: '40px',
                boxShadow: '0px 0px 8px 5px white',
                backgroundImage: 'url("/Stack-Dollar-Game/robbe2.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
              className="card"
              onClick={onLevel2}
            ></Card>
            <div className="h2div">
              <h2>Level-2</h2>
            </div>
          </div>
          <div>
            <Card
              style={{
                height: '375px',
                width: '500px',
                color: 'red',
                lineHeight: '160px',
                textAlign: 'center',
                background: 'green',
                margin: 'auto',
                marginBlock: '40px',
                boxShadow: '0px 0px 8px 5px white',
                backgroundImage: 'url("/Stack-Dollar-Game/robb3.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
              className="card"
              onClick={onLevel2}
            ></Card>
            <div className="h2div">
              <h2>Level-3</h2>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Levels;
