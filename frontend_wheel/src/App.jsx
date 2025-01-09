import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket';
import React from 'react';
const SOCKET_URL = "https://tech.outernetglobal.com/testenv"
import useDeviceMotion from './hooks/useMotion'
import "./index.css"
import RacingWheel from './components/racing_wheel'
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';

const socket = io("https://tech.outernetglobal.com/testenv"); 
//const socket = io("http://localhost:5057"); 

function App() {
  const motion = useDeviceMotion();
  const [rotation, setRotation] = useState(0); // Wheel rotation angle
   const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")))
    } else {
      const newId = uuidv4();
      setUser(newId);
      localStorage.setItem("user", JSON.stringify(newId));
    }
   }, [])

  useEffect(() => {
    const { rotationRate} = motion;
    const { beta } = rotationRate;
    const maxBeta = 40; // Maximum typical beta value when tilted
    const minBeta = 5; // Minimum threshold to start rotation
    let angle = 0;

    if (Math.abs(beta) > minBeta) {
      // Scale and map beta to -45° to 45°
      angle = Math.max(-45, Math.min(45, (beta / maxBeta) * 45));
    }

    // Smooth rotation using weighted average
    setRotation((prevRotation) => prevRotation * 0.8 + angle * 0.2);
  }, [motion]);
  

useEffect(() => {
  if (!user) return
  const intervalId = setInterval(() => {
    console.log('motion data', motion, user);
    socket.emit('motion_data', motion, user);  
  }, 1000); 

  return () => {
    clearInterval(intervalId);
    socket.disconnect();
  };
}, [user]);


  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white">
      <RacingWheel rotation={rotation} />
    </div>
    </>
  )
}
export default App