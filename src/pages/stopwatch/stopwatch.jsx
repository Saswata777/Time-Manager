import React from 'react'
import './stopwatch.css'
import stopWatchImage from './stopwatch.png'


import { VscDebugStart } from "react-icons/vsc";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { LuTimerReset } from "react-icons/lu";

import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';



import mouseClick from '../sounds/mouse-click.mp3';
import ring from '../sounds/ring.mp3';
import saveChange from '../sounds/saveChange.mp3';



const StopWatch = () => {
    
    const[minutes, setMinutes] = useState(0);
    const[seconds, setSeconds] = useState(0);
    const[cSeconds, setCSeconds] = useState(0);
    const[isRunning, setisRunning] = useState(false);
    
    useEffect(()=>{
     let stopWatch;
     
     if(isRunning){
            stopWatch = setInterval(()=>{
                if(cSeconds<100){
                    setCSeconds((prevCSeconds)=> prevCSeconds+1);
                }
                else{
                    if(seconds<60){
                        setSeconds((prevSeconds)=> prevSeconds+1);
                        setCSeconds(0);
                    }
                    else{
                        if(minutes<60){
                            setMinutes((prevMinutes)=> prevMinutes+1);
                            setSeconds(0);
                            setCSeconds(0);
                        }
                        else{
                            clearInterval(stopWatch);
                            setisRunning(false);
                            alert("Max Range is 60");
                        }
                    }
                }
            },10)
     }
    
     return ()=>{
        clearInterval(stopWatch);
     }
    
    
    }, [isRunning, cSeconds, seconds, minutes])
    
    
    
    const handelStart = ()=>{
        setisRunning(true);
        const audio = new Audio(mouseClick);
        audio.play();
    }
    
    const handelPause = ()=>{
        setisRunning(false);
        const audio = new Audio(mouseClick);
        audio.play();
    }
    
    const handelRestart = ()=>{
        const audio = new Audio(mouseClick);
        audio.play();
        setisRunning(false);
        setCSeconds(0);
        setSeconds(0);
        setMinutes(0);
    }




  return (
            <>
                <div className='stopWatchBG'>
                        <div className="stopWatch_container">
                                <img src={stopWatchImage} alt="" />

                                <div className="stopWatchTimigDisplay">{`${minutes.toString().padStart(2, '0')}:${seconds .toString() .padStart(2, '0')}:${cSeconds.toString() .padStart(2, '0')}`}</div>
                                <div className="sratPauseResets">
                                    <div className='start' onClick={handelStart}> <VscDebugStart className='startIcon'/> </div>
                                    <div className='pause' onClick={handelPause}> <AiOutlinePauseCircle  className='pauseIcon'/></div>
                                    <div className='reset' onClick={handelRestart}> <LuTimerReset  className='resetIcon'/></div>
                                </div>
                        </div>
                </div>
                

            </>
  )
}

export default StopWatch