import { useState, useEffect } from 'react';

const useDeviceMotion = () => {
  const [motionData, setMotionData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationIncludingGravity: { x: 0, y: 0, z: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 },
    interval: 0,
  });

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const {
        acceleration,
        accelerationIncludingGravity,
        rotationRate,
        interval,
      } = event;

      setMotionData({
        acceleration: {
          x: acceleration?.x ?? 0,
          y: acceleration?.y ?? 0,
          z: acceleration?.z ?? 0,
        },
        accelerationIncludingGravity: {
          x: accelerationIncludingGravity?.x ?? 0,
          y: accelerationIncludingGravity?.y ?? 0,
          z: accelerationIncludingGravity?.z ?? 0,
        },
        rotationRate: {
          alpha: rotationRate?.alpha ?? 0,
          beta: rotationRate?.beta ?? 0,
          gamma: rotationRate?.gamma ?? 0,
        },
        interval: interval ?? 0,
      });
    };

    window.addEventListener('devicemotion', handleDeviceMotion);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  return motionData;
};

export default useDeviceMotion;