import { useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client';
import { UserContext } from '../context/userContext';
import { useSocket } from '../context/socketContext';

const generateJSON = (userId, controlType, action, data) => {
  return {
    userId,
    timestamp: new Date().toISOString(),
    name: "default",
    controlType,
    action,
    data,
  };
};

function Button(){
      const {user} = useContext(UserContext);
      const socket = useSocket()
      
    function handleClick() {
        console.log('Button clicked')
        const JSON = generateJSON(user, "button", "click", null)
        socket.emit('controls_data', JSON); 
      }

    return (
        <>
       <button
       onClick={() => handleClick()}
       className="w-16 h-16 bg-blue-500 hover:bg-green-500 rounded-full transition-colors duration-200"
    >
      Button
    </button>
        </>
    )
}

export default Button;