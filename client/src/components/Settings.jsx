import React from 'react';
import axios from 'axios';
import {Game} from './game.jsx';

export const SettingsModal = ({image_categories, setMode})=> {
  const name = React.useRef('');
  const tileCount = React.useRef('');
  const [img_category, setimg_category] = React.useState(image_categories[0].name);
  const [single_image, setSingle_image] = React.useState(null);
  const [mode2, setMode2] = React.useState('modal2');

  const formValidator = (e)=> {
    e.preventDefault();
    if (name.current.value === '') {
      alert('Name is required!')
    } else {
      axios({
        method: 'get',
        url: '/shutterstock_image',
        params: {img_category: img_category}
      })
      .then((val)=> {
        setSingle_image(val.data);
        setMode2('game');
      })
      .catch((err)=> {console.log(err)})
    }
  }

  if (mode2 === 'modal2') {
    return <form id="gamesettings" onSubmit={formValidator}>

      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" ref={name} placeholder="Enter your name..."></input>

      {/* <label htmlFor="difficulty">Choose a difficulty:</label>
      <select onChange={(e)=>{setDifficulty(e.target.value)}} name="difficulty" id="difficulty">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select> */}

      <label htmlFor="tile">How many tiles?</label>
      <input type="number" name="tile" id="tile" ref={tileCount} placeholder="Enter tile count (higher is harder)..."></input>

      <label htmlFor="category">Choose an image category</label>
      <select onChange={(e)=>{setimg_category(e.target.value)}} name="category" id="category">
        {image_categories.map((item,index)=> {
          return <option key={index} value={item.name}>{item.name}</option>
        })}
      </select>

      <div className="buttoncontainer"><input className="playbutton" type="submit" value="Play"></input></div>
    </form>
  } else {
    return <Game single_image={single_image} img_category={img_category} tileCount={tileCount.current.value} setMode={setMode} name={name.current.value}></Game>
  }

}

const example_imageData = {
  id: '2112280592',
  aspect: 1.5014,
  assets: {
    preview: {
      height: 299,
      url: 'https://image.shutterstock.com/display_pic_with_logo/301539971/2112280592/stock-photo-portrait-of-gorgeous-happy-middle-aged-mature-cheerful-asian-woman-senior-older-s-lady-pampering-2112280592.jpg',
      width: 450
    },
    small_thumb: {
      height: 0,
      url: 'https://thumb9.shutterstock.com/thumb_small/301539971/2112280592/stock-photo-portrait-of-gorgeous-happy-middle-aged-mature-cheerful-asian-woman-senior-older-s-lady-pampering-2112280592.jpg',
      width: 0
    },
    large_thumb: {
      height: 0,
      url: 'https://thumb9.shutterstock.com/thumb_large/301539971/2112280592/stock-photo-portrait-of-gorgeous-happy-middle-aged-mature-cheerful-asian-woman-senior-older-s-lady-pampering-2112280592.jpg',
      width: 0
    },
    huge_thumb: {
      height: 260,
      url: 'https://image.shutterstock.com/image-photo/portrait-gorgeous-happy-middle-aged-260nw-2112280592.jpg',
      width: 391
    },
    preview_1000: {
      url: 'https://ak.picdn.net/shutterstock/photos/2112280592/watermark_1000/223ca7790ff5d3ef7d19c18efb62885f/preview_1000-2112280592.jpg',
      width: 1000,
      height: 666
    },
    preview_1500: {
      url: 'https://image.shutterstock.com/z/stock-photo-portrait-of-gorgeous-happy-middle-aged-mature-cheerful-asian-woman-senior-older-s-lady-pampering-2112280592.jpg',
      width: 1500,
      height: 999
    }
  },
  contributor: { id: '301539971' },
  description: 'Portrait of gorgeous happy middle aged mature cheerful asian woman, senior older 50s lady pampering her face eyes closed isolated on white. Ads of lifting anti wrinkle skin care, spa. Copy space.',
  image_type: 'photo',
  has_model_release: true,
  media_type: 'image'
}