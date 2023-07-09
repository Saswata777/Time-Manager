import './App.css';
import { HashRouter , Routes, Route,  NavLink } from 'react-router-dom'


// Pages
import Pomodoro from './pages/pomodoro/pomodoro';
import Timer from './pages/timer/timer';
import StopWatch from './pages/stopwatch/stopwatch';

import { CgSandClock } from "react-icons/cg";


// components
// import Pomo from './Components/pomo/pomo';
// import ShortBreak from './Components/short-break/shortBreak';
// import LongBreak from './Components/long-break/longBreak';





function App() {

  const NavBGcolorChanger = (m)=>{
      let navbarcomp =  document.querySelector('nav');

      if(m ==="Pomodoro"){
        navbarcomp.style.backgroundColor = '#ee6c4d';
      }
      else if(m ==="Timer"){
        navbarcomp.style.backgroundColor = '#38a3a5';
      }
      else if(m ==="StopWatch"){
        navbarcomp.style.backgroundColor = '#22577a';
      }
  }


  return (
    <div className="App">
          <HashRouter>
              <nav>

                      <div> <CgSandClock/>Time Manager</div>

                      <div className="navLinks">
                                <NavLink className="Pomodoro" to='/' onClick={()=>NavBGcolorChanger('Pomodoro')}>Pomodoro</NavLink>
                                <NavLink className="Timer" to='/timer' onClick={()=>NavBGcolorChanger('Timer')}>Timer</NavLink>
                                <NavLink className="StopWatch" to='/stopwatch' onClick={()=>NavBGcolorChanger('StopWatch')}>Stop Watch</NavLink>
                      </div>
                      
              </nav>


              <Routes>
                <Route path='/' element={<Pomodoro/>} />
                <Route path='/timer' element={<Timer/>}/>
                <Route path='/stopwatch' element={<StopWatch/>}/>                
              </Routes>
          </HashRouter>
    </div>
  );
}

export default App;
