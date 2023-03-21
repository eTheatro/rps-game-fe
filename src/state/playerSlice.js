import { createSlice } from '@reduxjs/toolkit';
import PaperImage from "../assets/paper.png";
import RockImage from "../assets/rock.png";
import ScissorImage from "../assets/scissor.png";



function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const initialState = {
  player1: { type: 'player1', score: 100, hand: 'Rock' },
  cpu: { type: 'cpu', score: 100, hand: 'Rock' },
  uuid: uuidv4()
}

export const playerSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    play: (state, action) => {
      state.player1 = { ...state.player1, ...action.payload?.player1 };
      state.cpu = playCPU(state.cpu);
      state.uuid = uuidv4();
    },
    hitPlayer1: (state, action) => {
      if (state.player1.score > 100 && action.payload < 0) {
        state.player1.score = 90;
      }
      else if (state.player1.score >= 10)
        state.player1.score -= 10;
    },
    init: (state) => {
      state = { ...state, ...initialState };
    }
  },
})


const playCPU = (cpu) => {
  let items = [{ image: PaperImage, hand: 'Paper' }, { image: RockImage, hand: 'Rock' }, { image: ScissorImage, hand: 'Scissor' }];
  const shuffledArray = items.sort((a, b) => 0.5 - Math.random());
  return { ...cpu, ...shuffledArray[0] };
}



export const { play, hitPlayer1, hitCPU, init } = playerSlice.actions

export default playerSlice.reducer