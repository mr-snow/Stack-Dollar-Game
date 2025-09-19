import React, { useEffect } from 'react';
import { Card, Progress, Button, Modal, Spin } from 'antd';
import { useState } from 'react';

import './Gamehead.css';
import { useNavigate } from 'react-router-dom';

function Gamehead(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState(0);

  const next = useNavigate();

  // const showLoading = () => {
  //   setOpen(true);
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // };

  const onNext = () => {
    next(-1);
  };
  const onHome = () => {
    next('/');
  };

  const onRestart = () => {
    console.log('restarted');
    setOpen(false);
    setLoading(false);
    next('/levels/level1');
  };
  const calculatePerform = (maxTime, playerTime, maxPoint, playerPoint) => {
    playerTime = playerTime - 1800;
    const timeFactor = (maxTime - playerTime) / maxTime;
    const pointFactor = playerPoint / maxPoint;
    const performance = (timeFactor + pointFactor) / 2;
    const per = Math.min(performance, 1) * 100;
    console.log(maxTime, playerTime, maxPoint, playerPoint);

    return Math.round(per * 10) / 10;
  };

  useEffect(() => {
    if (props.value.gameOver) {
      setOpen(true);
      setLoading(true);

      setPerformance(
        calculatePerform(
          props.value.maxTime,
          props.value.time,
          props.value.maxPoint,
          props.value.point
        )
      );

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [props.value.gameOver]);

  return (
    <>
      <div className="gameMainHead">
        <Card className="gameHeadLeft">
          <div className="gameLevel">
            <div>
              <h1>Level &nbsp;1</h1>
            </div>

            <div>
              <i
                className="fa-solid fa-angles-left fa-xl fa-beat"
                style={{ color: '#74C0FC' }}
                onClick={onNext}
              ></i>
            </div>
          </div>
        </Card>

        <Card className="gameHeadRight">
          <div className="cashPoint">
            <i className="fa-solid fa-sack-dollar fa-bounce fa-2xl"></i>
            <Progress
              type="circle"
              percent={props.value.percentage}
              className="progress"
              size={35}
              strokeWidth={10}
              format={percent => (
                <span style={{ color: 'white' }}>{props.value.point}</span>
              )}
            />

            <div className="timediv">
              <i
                className="fa-solid fa-hourglass-end fa-spin fa-spin-reverse fa-2xl"
                style={{ color: 'gold' }}
              ></i>
              <p>{props.value.formattedTime}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="modalMainBox">
        <Modal
          className="modalBox"
          title={<h2 style={{ color: 'red' }}>Game Over</h2>}
          footer={
            <div className="modelFooter">
              <i
                className="fa-regular fa-face-smile-beam fa-bounce fa-2xl"
                style={{ color: 'green' }}
              ></i>
              <p>Nice play ,Try once more</p>

              <i
                className="fa-solid fa-trophy fa-flip fa-2xl"
                style={{ color: 'gold' }}
              ></i>
            </div>
          }
          open={open}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <div className="modelBoxInner">
              <div className="gameOverDesc">
                <div>
                  <i className="fa-solid fa-stopwatch fa-sm"></i>{' '}
                  <b>Player Time</b> &nbsp;:&nbsp;
                  {props.value.formattedTime}
                </div>

                <div>
                  <i className="fa-solid fa-sack-dollar fa-sm"></i>{' '}
                  <b>Collected Cash</b> &nbsp;:&nbsp;
                  {props.value.point}
                </div>

                <div>
                  <i className="fa-solid fa-star fa-sm"></i>{' '}
                  <b>Player collected </b> &nbsp;:&nbsp;
                  {props.value.percentage}%
                </div>

                <div>
                  <i className="fa-solid fa-bars-progress fa-sm"></i>{' '}
                  <b>Player Performance </b> &nbsp;:&nbsp;
                  {performance}%&nbsp;
                  <div className="performanceName">
                    {performance > 90
                      ? 'Master'
                      : performance > 80
                      ? 'excellent'
                      : performance > 60
                      ? 'goodplay'
                      : performance > 50
                      ? 'average'
                      : performance > 30
                      ? 'normal'
                      : performance > 10
                      ? 'bad'
                      : performance < 0
                      ? 'lost'
                      : 'Game Live'}
                  </div>
                </div>
              </div>

              <div className="gameOverBtns">
                <Button
                  onClick={onHome}
                  color="danger"
                  variant="solid"
                  style={{ height: '40px', width: '100px' }}
                  icon={<i className="fa-solid fa-home fa-lg"></i>}
                >
                  Home
                </Button>

                <Button
                  type="primary"
                  onClick={onRestart}
                  style={{ height: '40px', width: '100px' }}
                  icon={
                    <i className="fa-solid fa-arrow-rotate-right fa-spin fa-lg"></i>
                  }
                >
                  Restart
                </Button>

                <Button
                  type="primary"
                  onClick={onNext}
                  style={{
                    backgroundColor: 'green',
                    height: '40px',
                    width: '100px',
                  }}
                  icon={
                    <i className="fa-solid fa-right-long fa-beat fa-lg"></i>
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default Gamehead;
