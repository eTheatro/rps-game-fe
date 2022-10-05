import { useEffect } from 'react';
import './App.css';
import { Hands } from './components/Hands';
import { Joystick } from './components/Joystick';
import Swal from 'sweetalert2'


import { FrameBox } from './components/FrameBox';
import { Life } from './components/Life';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { init } from "./state/playerSlice";

function App() {

  const player = useSelector((state) => state.player?.player1)
  const dispatch = useDispatch()

  useEffect(() => {
  }, [player])

  if (player.score == 0) {
    Swal.fire({
      title: 'You lose !',
      showConfirmButton: false,

      text: 'GAME OVER'
    }).then(() => {
      dispatch(init());
    });
  }



  return (
    <>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Life />
      </div>
      <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
        <Hands />
        <div style={{ display: 'flex', marginTop: '30vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
          <FrameBox width={500} height={100} />
          <div style={{ zIndex: 999, }}>
            <Joystick />
          </div>
        </div>
      </div >
    </>
  );
}

export default App;