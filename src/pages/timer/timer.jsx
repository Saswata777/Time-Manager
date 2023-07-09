import React, { useState, useEffect } from 'react';
import './timer.css';
import { VscDebugStart } from 'react-icons/vsc';
import { AiOutlinePauseCircle, AiFillSetting } from 'react-icons/ai';
import { LuTimerReset } from 'react-icons/lu';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import mouseClick from '../sounds/mouse-click.mp3';
import ring from '../sounds/ringtone.mp3';
import saveChange from '../sounds/saveChange.mp3';



const Timer = () => {
  const [show, setShow] = useState(false); // UseState regarding Modal  (imported from React Bootstrap)
  const handleShow = () => setShow(true);  // function Regarding Modal (imported from React Bootstrap)
  const handleClose = () => setShow(false); // function Regarding Modal (imported from React Bootstrap)
  
  
  
  
  const [minutes, setMinutes] = useState(0);  // Setting minutes for timer
  const [seconds, setSeconds] = useState(0); // Setting seconds for timer
  const [isRunning, setIsRunning] = useState(false); // setting state of timer 1.True(clock is running) 2. False (clock stop running) 
  
  // useState Regarding progress bar
  const [minuteData, setMinuteData] = useState(0);
  const [secondData, setSecondData] = useState(0);
  const [speed, setSpeed] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);



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



  useEffect(() => {
    let progressBar = document.querySelector('.circularProgress1');

    let progressEnd = 102;

    if (isRunning && progressValue <= progressEnd) {
      setProgressInterval(
        setInterval(() => {
          setProgressValue((prevProgressValue) => prevProgressValue + 1);
          progressBar.style.background = `conic-gradient(
            #1271ed ${progressValue * 3.6}deg, 
            #d0e3fb ${progressValue * 3.6}deg)`;

          if (progressValue === progressEnd) {
            clearInterval(progressInterval);
          }
        }, speed)
      );
    } else {
      clearInterval(progressInterval);
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [isRunning, speed, progressValue]);

  useEffect(() => {
    const calculatedSpeed = (60 * minuteData + secondData) * 17;
    setSpeed(calculatedSpeed);
  }, [minuteData, secondData]);



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
    const audio = new Audio(mouseClick);
    audio.play();
      setMinutes(0);
      setSeconds(0);
      setProgressValue(0);
      setIsRunning(false);
  };


//   console.log(totalSeconds);

  const handleSaveChanges = () => {
    // Handle saving the input values from the modal
    handleClose();
    setMinuteData(minutes) ;
    setSecondData(seconds);
    setProgressValue(0);
    
    const audio = new Audio(saveChange);
    audio.play();
    
  };

  return (
    <div className="timerBG">
      <div className="container1">
        <div className="settingBar">
          <Button className="settings" onClick={handleShow}>
            <AiFillSetting className="icon" />
          </Button>
          <Modal show={show} fullscreen="sm-down" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Setting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="inputSection">
                <div>
                  <span>Minutes:</span>
                  <input type="number" className="minuteInput" max={60} min={0} value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))} />
                </div>
                <div>
                  <span>Seconds: </span>
                  <input type="number" className="secondInput" max={59} min={0} value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value))} />
                </div>
              </div>
              <hr />
              <div className="saveChanges" onClick={handleSaveChanges}> Save Changes </div>
            </Modal.Body>
          </Modal>
        </div>

        <div className="circularProgress1">
          <div className="value1">
            {`${minutes.toString().padStart(2, '0')}:${seconds .toString() .padStart(2, '0')}`}
          </div>
        </div>


            {/* start button */}
        <div className="sratPauseReset">
          <div className="start" onClick={handleStart}>
            <VscDebugStart className="startIcon" />
          </div>
          {/* Pause Button */}
          <div className="pause" onClick={handlePause}>
            <AiOutlinePauseCircle className="pauseIcon" />
          </div>
          {/* Reset button */}
          <div className="reset" onClick={handleReset}>
            <LuTimerReset className="resetIcon" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Timer;




/*

{<Modal show={show} fullscreen="sm-down" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Time Manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Time Up.
            </Modal.Body>
          </Modal>
}
*/ 
