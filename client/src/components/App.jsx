import React from 'react';
import {Leaderboard} from './Leaderboard.jsx';
import {SettingsModal} from './Settings.jsx';
import axios from 'axios';

const App = ()=> {
  const [image_categories, setimage_categories] = React.useState(null);
  const [mode, setMode] = React.useState('home');

  React.useEffect(()=> {
    // setimage_categories(['holiday'])
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

let APIDATA_to_save_API_LIMIT = [
    {
        "id": "26",
        "name": "Abstract"
    },
    {
        "id": "1",
        "name": "Animals/Wildlife"
    },
    {
        "id": "11",
        "name": "The Arts"
    },
    {
        "id": "3",
        "name": "Backgrounds/Textures"
    },
    {
        "id": "27",
        "name": "Beauty/Fashion"
    },
    {
        "id": "2",
        "name": "Buildings/Landmarks"
    },
    {
        "id": "4",
        "name": "Business/Finance"
    },
    {
        "id": "5",
        "name": "Education"
    },
    {
        "id": "6",
        "name": "Food and Drink"
    },
    {
        "id": "7",
        "name": "Healthcare/Medical"
    },
    {
        "id": "8",
        "name": "Holidays"
    },
    {
        "id": "10",
        "name": "Industrial"
    },
    {
        "id": "21",
        "name": "Interiors"
    },
    {
        "id": "22",
        "name": "Miscellaneous"
    },
    {
        "id": "12",
        "name": "Nature"
    },
    {
        "id": "9",
        "name": "Objects"
    },
    {
        "id": "25",
        "name": "Parks/Outdoor"
    },
    {
        "id": "13",
        "name": "People"
    },
    {
        "id": "14",
        "name": "Religion"
    },
    {
        "id": "15",
        "name": "Science"
    },
    {
        "id": "17",
        "name": "Signs/Symbols"
    },
    {
        "id": "18",
        "name": "Sports/Recreation"
    },
    {
        "id": "16",
        "name": "Technology"
    },
    {
        "id": "0",
        "name": "Transportation"
    },
    {
        "id": "24",
        "name": "Vintage"
    }
  ]