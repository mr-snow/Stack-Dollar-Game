import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import './level1.css';
import User from '../user/user';
import Owner from '../owner/owner';
import Wall from '../wall/wall';
import Camera from '../camera/camera';
import Cash from '../cash/cash';
import Tile from '../Tile/Tile';
import Gamehead from '../Gamehead/Gamehead';
import Entry from '../Entry/Entry';
import Exit from '../Exit/Exit';
import Carpet from '../Carpet/Carpet';
import HomeItems from '../HomeItems/HomeItems';
import wallImage from '../../assets/level1/floor3.jpg';
import mainTileImage from '../../assets/level1/floor6.jpg';
import coin3 from '../../assets/level1/coin3.png';
import carpet1 from '../../assets/level1/carpet1.0.png';
import flower1 from '../../assets/level1/flower1.png';
import flower2 from '../../assets/level1/flower2.png';
import bed1 from '../../assets/level1/bed1.png';
import sofa1 from '../../assets/level1/sofa1.png';
import sofa2 from '../../assets/level1/sofa2.png';
import table3 from '../../assets/level1/table3.png';
import table2 from '../../assets/level1/table2.png';
import table1 from '../../assets/level1/table1.png';
import box1 from '../../assets/level1/box1.png';

const boxSize = 500;
const userCircle = 40;

const coinSize = 20;

const step = 10;
const maxTimes = 45;
const ownerSpeed = 3;
const ownerSpeed2 = 5;
const wallSize = 100;

function Level1() {
  const walls = [
    { x: 5, y: 20, width: 5, height: boxSize * 0.8 },
    { x: 5, y: 20, width: boxSize * 0.04, height: 5 },
    { x: 70, y: 20, width: boxSize * 0.83, height: 5 },
    { x: 480, y: 20, width: 5, height: boxSize * 0.82 },
    { x: 100, y: 425, width: boxSize * 0.75, height: 5 },
    { x: 5, y: 425, width: boxSize * 0.1, height: 5 },
    { x: 5, y: 350, width: boxSize * 0.1, height: 5 },
    { x: 100, y: 350, width: boxSize * 0.2, height: 5 },
    { x: 5, y: 200, width: boxSize * 0.4, height: 5 },
    { x: 200, y: 300, width: 5, height: boxSize * 0.11 },
    { x: 200, y: 200, width: 5, height: boxSize * 0.11 },

    { x: 200, y: 120, width: 5, height: boxSize * 0.15 },

    { x: 200, y: 120, width: boxSize * 0.05, height: 5 },

    { x: 280, y: 120, width: boxSize * 0.1, height: 5 },

    { x: 330, y: 20, width: 5, height: boxSize * 0.25 },

    { x: 330, y: 220, width: 5, height: boxSize * 0.1 },
    { x: 330, y: 320, width: 5, height: boxSize * 0.1 },
    { x: 340, y: 320, width: boxSize * 0.27, height: 5 },
    { x: 340, y: 220, width: boxSize * 0.27, height: 5 },
    { x: 80, y: 28, width: 5, height: boxSize * 0.15 },
  ];

  const initialCashItems = [
    {
      id: 1,
      x: 100,
      y: 40,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 30,
      zIndex: 10,
      color: 'black',
    },
    {
      id: 2,
      x: 450,
      y: 40,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 10,
      zIndex: 10,
      color: 'black',
    },

    {
      id: 3,
      x: 450,
      y: 340,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 10,
      zIndex: 10,
      color: 'black',
    },
    {
      id: 4,
      x: 450,
      y: 240,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 10,
      zIndex: 10,
      color: 'black',
    },
    {
      id: 5,
      x: 30,
      y: 220,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 10,
      zIndex: 10,
      color: 'black',
    },
    {
      id: 6,
      x: 300,
      y: 40,
      width: coinSize,
      height: coinSize,
      image: coin3,
      point: 30,
      zIndex: 10,
      color: 'black',
    },
  ];

  const totalPoint = initialCashItems.reduce(
    (acc, item) => acc + item.point,
    0
  );

  const [userPosition, setUserPosition] = useState({ top: 450, left: 200 }); //user1
  const [ownerPosition, setOwnerPosition] = useState({
    top: 10,
    left: 60,
    radius: 35,
    color: 'red',
    size: '10px',
  });

  const [ownerPosition2, setOwnerPosition2] = useState({
    top: 300,
    left: 300,
    radius: 40,
    color: 'green',
    size: '10px',
  });

  const [cameraPosition, setCameraPosition] = useState({
    top: 118,
    left: 280,
    radius: 30,
    color: 'red',
    size: '10px',
  });
  const [cameraPosition2, setCameraPosition2] = useState({
    top: 75,
    left: 50,
    radius: 40,
    color: 'red',
    size: '10px',
  });
  const [direction, setDirection] = useState(0);
  const [direction2, setDirection2] = useState(0);
  const [cashItems, setCashItems] = useState(initialCashItems);
  const [cashPoints, setCashPoints] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);

  const [timer, setTimer] = useState(1800);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [gameOver, setGameOver] = useState(false);

  const entryArea = { x: 58, y: 382, width: 43, height: 43 };

  const exitArea = { x: 28, y: -24, width: 43, height: 43 };

  const isCollidingWithWall = newPosition => {
    return walls.some(wall => {
      return (
        newPosition.left < wall.x + wall.width &&
        newPosition.left + userCircle > wall.x &&
        newPosition.top < wall.y + wall.height &&
        newPosition.top + userCircle > wall.y
      );
    });
  };

  const isCollidingWithOwner = position => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const ownerCenterX = ownerPosition.left + ownerPosition.radius;
    const ownerCenterY = ownerPosition.top + ownerPosition.radius;

    const dx = userCenterX - ownerCenterX;
    const dy = userCenterY - ownerCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + ownerPosition.radius;
  };

  const isCollidingWithOwner2 = position => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const ownerCenterX = ownerPosition2.left + ownerPosition2.radius;
    const ownerCenterY = ownerPosition2.top + ownerPosition2.radius;

    const dx = userCenterX - ownerCenterX;
    const dy = userCenterY - ownerCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + ownerPosition2.radius;
  };

  const isCollidingWithCamera = position => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const cameraCenterX = cameraPosition.left + cameraPosition.radius;
    const cameraCenterY = cameraPosition.top + cameraPosition.radius;

    const dx = userCenterX - cameraCenterX;
    const dy = userCenterY - cameraCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + cameraPosition.radius;
  };

  const isCollidingWithCamera2 = position => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const cameraCenterX = cameraPosition2.left + cameraPosition2.radius;
    const cameraCenterY = cameraPosition2.top + cameraPosition2.radius;

    const dx = userCenterX - cameraCenterX;
    const dy = userCenterY - cameraCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + cameraPosition2.radius;
  };

  const isCollidingWithCash = (position, cash) => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const cashCenterX = cash.x + cash.width / 2;
    const cashCenterY = cash.y + cash.height / 2;
    const dx = userCenterX - cashCenterX;
    const dy = userCenterY - cashCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + cash.width / 2;
  };

  const isUserEntry = (position, entry) => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const entryCenterX = entry.x + entry.width / 2;
    const entryCenterY = entry.y + entry.height / 2;
    const dx = userCenterX - entryCenterX;
    const dy = userCenterY - entryCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + entry.width / 2;
  };

  const isUserExit = (position, exit) => {
    const userCenterX = position.left + userCircle / 2;
    const userCenterY = position.top + userCircle / 2;
    const entryCenterX = exit.x + exit.width / 2;
    const entryCenterY = exit.y + exit.height / 2;
    const dx = userCenterX - entryCenterX;
    const dy = userCenterY - entryCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= userCircle / 2 + exit.width / 2;
  };

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setGameOver(true);
  };

  useEffect(() => {
    let timerInterval;
    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive, timer]);

  useEffect(() => {
    if (isUserEntry(userPosition, entryArea)) {
      if (!isTimerActive) {
        startTimer();
      }
    }
    if (isUserExit(userPosition, exitArea)) {
      stopTimer();
    }
  }, [userPosition]);

  useEffect(() => {
    let timeout;
    if (isCollidingWithOwner(userPosition)) {
      timeout = setTimeout(() => {
        stopTimer();
      }, 10);
    }
    if (isCollidingWithOwner2(userPosition)) {
      timeout = setTimeout(() => {
        stopTimer();
      }, 10);
    }
    if (isCollidingWithCamera(userPosition)) {
      timeout = setTimeout(() => {
        stopTimer();
      }, 10);
    }
    if (isCollidingWithCamera2(userPosition)) {
      timeout = setTimeout(() => {
        stopTimer();
      }, 10);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [userPosition, ownerPosition, ownerPosition2]);

  useEffect(() => {
    function handlKeydown(even) {
      setUserPosition(prevPos => {
        let newTop = prevPos.top;
        let newLeft = prevPos.left;
        switch (even.key) {
          case 'ArrowUp':
            newTop = Math.max(prevPos.top - step, 0);

            break;
          case 'ArrowDown':
            newTop = Math.min(prevPos.top + step, boxSize - userCircle);
            break;
          case 'ArrowLeft':
            newLeft = Math.max(prevPos.left - step, 0);
            break;
          case 'ArrowRight':
            newLeft = Math.min(prevPos.left + step, boxSize - userCircle);
            break;
          default:
            break;
        }

        const newPosition = { top: newTop, left: newLeft };
        if (!isCollidingWithWall(newPosition)) {
          return newPosition;
        }
        return prevPos;
      });
    }
    window.addEventListener('keydown', handlKeydown);

    return () => {
      window.removeEventListener('keydown', handlKeydown);
    };
  }, [
    isCollidingWithCamera,
    isCollidingWithOwner,
    isCollidingWithOwner2,
    isCollidingWithCamera2,
    isCollidingWithWall,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOwnerPosition(prevPos => {
        let newTop = prevPos.top;
        let newLeft = prevPos.left;

        switch (direction) {
          case 0:
            newLeft += ownerSpeed;
            if (newLeft >= 250) {
              newLeft = 250;
              setDirection(1);
            }
            break;
          case 1:
            newTop += ownerSpeed;
            if (newTop >= 80) {
              newTop = 80;
              setDirection(2);
            }
            break;
          case 2:
            newLeft -= ownerSpeed;
            if (newLeft <= 60) {
              newLeft = 60;
              setDirection(3);
            }
            break;
          case 3: //up
            newTop -= ownerSpeed;
            if (newTop <= 10) {
              newTop = 10;
              setDirection(0);
            }
            break;
          default:
            break;
        }

        return {
          top: newTop,
          left: newLeft,
          radius: prevPos.radius,
          color: prevPos.color,
          size: prevPos.size,
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOwnerPosition2(prevPos => {
        let newTop = prevPos.top;
        let newLeft = prevPos.left;

        switch (direction2) {
          case 0:
            newLeft += ownerSpeed2;
            if (newLeft >= 240) {
              newLeft = 240;
              setDirection2(1);
            }
            break;
          case 1:
            newTop += ownerSpeed2;
            if (newTop >= 350) {
              newTop = 350;
              setDirection2(2);
            }
            break;
          case 2:
            newLeft -= ownerSpeed2;
            if (newLeft <= 40) {
              newLeft = 40;
              setDirection2(3);
            }
            break;
          case 3:
            newTop -= ownerSpeed2;
            if (newTop <= 240) {
              newTop = 240;
              setDirection2(0);
            }
            break;
          default:
            break;
        }

        return {
          top: newTop,
          left: newLeft,
          radius: prevPos.radius,
          color: prevPos.color,
          size: prevPos.size,
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction2]);

  useEffect(() => {
    cashItems.forEach(cash => {
      if (isCollidingWithCash(userPosition, cash)) {
        setCashItems(prevCashItems =>
          prevCashItems.filter(item => item.id != cash.id)
        );
        setCashPoints(prevPoints => {
          const newPoints = prevPoints + cash.point;
          setCurrentPoint((newPoints / totalPoint) * 100);
          return newPoints;
        });
      }
    });
  }, [userPosition, cashItems]);

  useEffect(() => {
    setFormattedTime(format(new Date(timer * 1000), 'mm:ss'));
  }, [timer]);

  return (
    <>
      <div className="mainpage">
        <Gamehead
          value={{
            percentage: currentPoint,
            point: cashPoints,
            time: timer,
            formattedTime: formattedTime,
            gameOver: gameOver,
            maxTime: maxTimes,
            maxPoint: totalPoint,
          }}
        />

        <div
          className="gamebox"
          style={{
            width: boxSize,
            height: boxSize,
            position: 'relative',
            zIndex: '1',
          }}
        >
          <User
            value={{
              user_Circle: userCircle,
              x: userPosition.left,
              y: userPosition.top,
            }}
          />
          <Owner
            value={{
              radius: ownerPosition.radius,
              top: ownerPosition.top,
              left: ownerPosition.left,
              color: ownerPosition.color,
              size: ownerPosition.size,
            }}
          />
          <Owner
            value={{
              radius: ownerPosition2.radius,
              top: ownerPosition2.top,
              left: ownerPosition2.left,
              color: ownerPosition2.color,
              size: ownerPosition2.size,
            }}
          />

          <Camera
            value={{
              x: cameraPosition.left,
              y: cameraPosition.top,
              radius: cameraPosition.radius,
              color: cameraPosition.color,
              size: cameraPosition.size,
            }}
          />
          <Camera
            value={{
              x: cameraPosition2.left,
              y: cameraPosition2.top,
              radius: cameraPosition2.radius,
              color: cameraPosition2.color,
              size: cameraPosition2.size,
            }}
          />

          <Wall
            value={{
              x: 5,
              y: 20,
              width: '5px',
              height: '82%',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 5,
              y: 20,
              width: '4%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 70,
              y: 20,
              width: '83%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 480,
              y: 20,
              width: '5px',
              height: '82%',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 100,
              y: 425,
              width: '77%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 5,
            }}
          />
          <Wall
            value={{
              x: 5,
              y: 425,
              width: '10%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          {/* inside the box below */}

          <Wall
            value={{
              x: 5,
              y: 350,
              width: '10%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 100,
              y: 350,
              width: '20%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 5,
              y: 200,
              width: '40%',
              height: '5px',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 200,
              y: 300,
              width: '5px',
              height: '11%',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 200,
              y: 200,
              width: '5px',
              height: '11%',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 200,
              y: 120,
              width: '5px',
              height: '15%',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 200,
              y: 120,
              width: '5%',
              height: '5px',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 280,
              y: 120,
              width: '10%',
              height: '5px',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 330,
              y: 20,
              width: '5px',
              height: '25%',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 330,
              y: 220,
              width: '5px',
              height: '10%',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 330,
              y: 320,
              width: '5px',
              height: '10%',
              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 340,
              y: 320,
              width: '27%',
              height: '5px',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />
          <Wall
            value={{
              x: 340,
              y: 220,
              width: '27%',
              height: '5px',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          <Wall
            value={{
              x: 80,
              y: 28,
              width: '5px',
              height: '15%',

              image: wallImage,
              size: wallSize,
              zIndex: 4,
            }}
          />

          {cashItems.map(cash => (
            <Cash
              key={cash.id}
              value={{
                x: cash.x,
                y: cash.y,
                width: cash.width,
                height: cash.height,
                image: cash.image,
                point: cash.point,
                zIndex: cash.zIndex,
                color: cash.color,
              }}
            />
          ))}

          <Tile
            value={{
              top: 25,
              left: 17,
              zIndex: 2,
              image: mainTileImage,
              width: '470px',
              height: '410px',
            }}
          />
          <Entry
            value={{
              width: '43px',
              height: '43px',
              top: 382,
              left: 58,
              zIndex: 3,
            }}
          />

          <Exit
            value={{
              width: '43px',
              height: '43px',
              top: -24,
              left: 28,
              zIndex: 2,
            }}
          />
          <HomeItems
            value={{
              top: 375,
              left: 58,
              zIndex: 2,
              image: carpet1,
              width: '80px',
              height: '62px',
              rotate: 0,
            }}
          />

          <HomeItems
            value={{
              top: 20,
              left: 28,
              zIndex: 2,
              image: carpet1,
              width: '80px',
              height: '62px',
            }}
          />

          <HomeItems
            value={{
              top: 220,
              left: 220,
              zIndex: 2,
              image: carpet1,
              width: '290px',
              height: '150px',
              opacity: 0.7,
            }}
          />

          <HomeItems
            value={{
              top: 410,
              left: 82,
              zIndex: 1,
              image: flower1,
              width: '80px',
              height: '80px',
            }}
          />
          <HomeItems
            value={{
              top: 400,
              left: 8,
              zIndex: 1,
              image: flower1,
              width: '80px',
              height: '80px',
            }}
          />

          <HomeItems
            value={{
              top: 410,
              left: 8,
              zIndex: 1,
              image: flower1,
              width: '80px',
              height: '80px',
            }}
          />

          <HomeItems
            value={{
              top: -24,
              left: 60,
              zIndex: 1,
              image: flower1,
              width: '80px',
              height: '80px',
            }}
          />
          <HomeItems
            value={{
              top: -21,
              left: -4,
              zIndex: 1,
              image: flower1,
              width: '80px',
              height: '80px',
            }}
          />

          <HomeItems
            value={{
              top: 20,
              left: 330,
              zIndex: 2,
              image: bed1,
              width: '80px',
              height: '80px',
            }}
          />
          <HomeItems
            value={{
              top: 210,
              left: 328,
              zIndex: 3,
              image: bed1,
              width: '80px',
              height: '80px',
              rotate: 270,
            }}
          />

          <HomeItems
            value={{
              top: 44,
              left: 150,
              zIndex: 2,
              image: table1,
              width: '100px',
              height: '100px',
              rotate: 90,
              mode: 'multiply',
            }}
          />

          <HomeItems
            value={{
              top: 172,
              left: 105,
              zIndex: 2,
              image: sofa1,
              width: '100px',
              height: '100px',
              rotate: 0,
            }}
          />

          <HomeItems
            value={{
              top: 240,
              left: -18,
              zIndex: 2,
              image: sofa1,
              width: '100px',
              height: '100px',
              rotate: 270,
            }}
          />

          <HomeItems
            value={{
              top: 282,
              left: 105,
              zIndex: 2,
              image: sofa1,
              width: '100px',
              height: '100px',
              rotate: 180,
            }}
          />

          <HomeItems
            value={{
              top: 20,
              left: 420,
              zIndex: 2,
              image: table3,
              width: '90px',
              height: '90px',
              rotate: 90,
            }}
          />

          <HomeItems
            value={{
              top: 220,
              left: 420,
              zIndex: 2,
              image: table3,
              width: '90px',
              height: '90px',
              rotate: 90,
            }}
          />

          <HomeItems
            value={{
              top: 25,
              left: 85,
              zIndex: 2,
              image: table2,
              width: '60px',
              height: '60px',
              rotate: 90,
            }}
          />

          <HomeItems
            value={{
              top: 30,
              left: 290,
              zIndex: 2,
              image: box1,
              width: '40px',
              height: '40px',
              rotate: 90,
            }}
          />

          <HomeItems
            value={{
              top: 260,
              left: 350,
              zIndex: 2,
              image: sofa2,
              width: '250px',
              height: '190px',
              rotate: 0,
            }}
          />

          <HomeItems
            value={{
              top: -20,
              left: 110,
              zIndex: 1,
              image: flower2,
              width: '80px',
              height: '250px',
              rotate: 0,
            }}
          />
          <div className="gardenDiv3"></div>
          <div className="gardenDiv2"></div>
        </div>
      </div>
    </>
  );
}

export default Level1;
