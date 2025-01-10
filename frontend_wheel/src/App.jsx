import React, { useState, useEffect } from 'react';
import RacingWheel from './components/racing_wheel';
import Joystick from './components/joystick';
import Button from './components/button';

const App = () => {
 

  return <>
<RacingWheel></RacingWheel> 
<Joystick></Joystick>
<Button></Button>
</>
};

export default App;