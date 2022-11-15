import React from 'react';
import {Game} from './game.jsx';

export const SettingsModal = ({image_categories, setMode})=> {

  console.log(image_categories);
  const [difficulty, setDifficulty] = React.useState('Easy');
  const name = React.useRef('');
  const [img_url, setImage_Url] = React.useState('');
  const [mode2, setMode2] = React.useState('modal2');

  if (mode2 === 'modal2') {
    return <form>
      <input type="text" ref={name} placeholder="Enter your name..."></input>
      <label for="difficulty">Choose a difficulty:</label>
      <select onChange={(e)=>{console.log(e.target.value)}} name="difficulty" id="difficulty">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </form>
  } else {
    return <Game></Game>
  }

}