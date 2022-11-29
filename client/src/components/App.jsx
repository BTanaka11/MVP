import React from 'react';
import {Leaderboard} from './Leaderboard.jsx';
import {SettingsModal} from './Settings.jsx';
import axios from 'axios';

const App = ()=> {
  const [image_categories, setimage_categories] = React.useState(null);
  const [mode, setMode] = React.useState('home');

  React.useEffect(()=> {
    axios({
      method: 'get',
      url: '/shutterstock_image_categories'
    })
    .then((val)=>{
      setimage_categories(val.data);
    })
    .catch((err)=> {console.log(err)})
  }, []);

  if (image_categories === null) {
    return <div>Loading...</div>
  } else {
    if (mode === 'home') {
      return <React.Fragment>
          <div className="buttoncontainer">
            <div className="rotatingLeft"></div>
            <div className="rotatingRight"></div>
            <div className="rotatingLeft"></div>
            <button className="playbutton" onClick={()=> {setMode('modal')}}>Play</button>
            <div className="rotatingLeft"></div>
            <div className="rotatingRight"></div>
            <div className="rotatingLeft"></div>
        </div>
          <Leaderboard></Leaderboard>
      </React.Fragment>
    } else if (mode === 'modal') {
      return <SettingsModal image_categories={image_categories} setMode={setMode}></SettingsModal>
    }
  }
}

export default App;