import React from 'react'
import {Outlet} from 'react-router-dom'
import './pomodoro.css'

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { VscDebugStart } from 'react-icons/vsc';
import { AiOutlinePauseCircle, AiFillSetting } from 'react-icons/ai';
import { LuTimerReset } from 'react-icons/lu';


import mouseClick from '../sounds/mouse-click.mp3';
import ring from '../sounds/ringtone.mp3';
import saveChange from '../sounds/saveChange.mp3';





const Pomodoro = () => {

    // const [timigValue, setTimingValue] = useState("25:00");
    const[minutes, setMinutes] = useState(0);
    const[seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [pomovalue, setPomoValue] = useState(25);
    const [shortBreakValue, setShortBreakValue] = useState(5);
    const [longBreakValue, setLongBreakValue] = useState(15);
    const [activeComponent, setActiveComponents] = useState('pomo');



    useEffect(() => {

        let timer;
    
        if (isRunning) {
          timer = setInterval(() => {
    
            if (seconds > 0) {
              setSeconds((prevSeconds) => prevSeconds - 1);
            } 
            else {
                        if (minutes > 0) {
                            setMinutes((prevMinutes) => prevMinutes - 1);
                            setSeconds(59);
                        } else {
                            clearInterval(timer);
                            setIsRunning(false);
                            const audio = new Audio(ring);
                            audio.play();
                            
                            // set property to ringing 
                        }
            }
          }, 1000);
        }
    
        
        return () => { // Return of use Effect function
          clearInterval(timer);
        };
      }, [isRunning, minutes, seconds]);
    

      // Function to start the timer
  const handleStart = () => {
    setIsRunning(true);
    const audio = new Audio(mouseClick);
    audio.play();
  };


//   Function to pause the timer
  const handlePause = () => {
    setIsRunning(false);
    const audio = new Audio(mouseClick);
    audio.play();
  };


  // Function to Reset the timer
  const handleReset = () => {
      setMinutes(0);
      setSeconds(0);
      setIsRunning(false);
      const audio = new Audio(mouseClick);
    audio.play();
  };








    const timeHandeling = (components)=>{
        if(components=== 'pomo'){
            // setMinutes(25);
            setMinutes(pomovalue);
            setSeconds(0);
            setActiveComponents('pomo');
            
        }
        else if(components === 'sbreak')
        {
            // setMinutes(5);
            setMinutes(shortBreakValue);
            setSeconds(0);
            setActiveComponents('sbreak');
        }

        else if(components === 'lbreak')
        {
            // setMinutes(15);
            setMinutes(longBreakValue);
            setSeconds(0);
            setActiveComponents('lbreak');
        }
    }







    // Modal

    const values = [ 'sm-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
            setFullscreen(breakpoint);
            setShow(true);
    }



    



const handleRangeChangePomo = (event) => {
  setPomoValue(Math.floor(event.target.value));
};

// Modified handleRangeChangeSbreak function to set shortBreakValue correctly
const handleRangeChangeSbreak = (event) => {
  setShortBreakValue(Math.floor(event.target.value));
};

// Modified handleRangeChangeLbreak function to set longBreakValue correctly
const handleRangeChangeLbreak = (event) => {
  setLongBreakValue(Math.floor(event.target.value));
};


// Added handleSaveChange function to handle saving the changes made in the modal
const handleSaveChange = () => {

  if(activeComponent === 'pomo'){
    setMinutes(pomovalue);
  }
  else if(activeComponent === 'sbreak'){
    setMinutes(shortBreakValue);
  }
  else if(activeComponent === 'lbreak'){
    setMinutes(longBreakValue);
  }
  setShow(false);

  const audio = new Audio(saveChange);
    audio.play();

};


  
   
  return (
        <>
                <div className="pomodoroBG">
                    <div  className="pomodoro_container">
                                <>
                                            {values.map((v, idx) => (
                                                <Button key={idx} className="setting" onClick={() => handleShow(v) }> <AiFillSetting  className='setting_icon_pomodoro'/> </Button>
                                            ))}
                                            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Setting</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <label htmlFor="rangeInput">Pomodoro</label>
                                                    <br />
                                                    <input type="range" className="PomodoroInput" min={0} max={25} defaultValue={25} value={pomovalue} step={1/24} onChange={handleRangeChangePomo} />  <span>{pomovalue}  min</span>
                                                    <hr />

                                                    <label htmlFor="rangeInput">Short Break</label>
                                                    <br />
                                                    <input type="range" className="PomodoroInput" min={0} max={5} defaultValue={5} value={shortBreakValue} step={1/4} onChange={handleRangeChangeSbreak} />  <span>{shortBreakValue}  min</span>
                                                    <hr />

                                                    <label htmlFor="rangeInput">Long Break</label>
                                                    <br />
                                                    <input type="range" className="PomodoroInput" min={10} max={15} defaultValue={15} value={longBreakValue} step={1/4} onChange={handleRangeChangeLbreak} />  <span>{longBreakValue}  min</span>
                                                    <br />
                                                    <br />
                                                    <div className='save' onClick={handleSaveChange}>Save Change</div>

                                                </Modal.Body>
                                            </Modal>
                                </>



                                <div className="pomodoro_component">
                                        <div className={`pomo ${activeComponent === 'pomo' ? 'active' : ''}`} onClick={()=>timeHandeling('pomo')}> Pomo </div>
                                        <div className= {`sbreak ${activeComponent === 'sbreak' ? 'active' : ''}`} onClick={()=>timeHandeling('sbreak')}> Short Break </div>
                                        <div className= {`lbreak ${activeComponent === 'lbreak' ? 'active' : ''}`}  onClick={()=>timeHandeling('lbreak')}> Long Break </div>        
                                </div>
                                <div className="time_display">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
                        
                                <div className="sratPauseResetPomo">
                                            <div className="start" onClick={handleStart}>
                                                <VscDebugStart className="startIcon" />
                                            </div>
                                            {/* Pause Button */}
                                            <div className="pause"  onClick={handlePause}>
                                                <AiOutlinePauseCircle className="pauseIcon" />
                                            </div>
                                            {/* Reset button */}
                                            <div className="reset"  onClick={handleReset}>
                                                <LuTimerReset className="resetIcon" />
                                            </div>

                                </div>
                                

                    </div>
                
                </div>
                <Outlet/>
        </>
  )
}

export default Pomodoro



