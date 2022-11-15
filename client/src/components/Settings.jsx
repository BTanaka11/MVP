import React from 'react';
import axios from 'axios';
import {Game} from './game.jsx';

export const SettingsModal = ({image_categories, setMode})=> {

  const [difficulty, setDifficulty] = React.useState('Easy');
  const name = React.useRef('');
  const [img_category, setimg_category] = React.useState(image_categories[0]);
  const [img_url, setImage_Url] = React.useState('');
  const [mode2, setMode2] = React.useState('modal2');

  const formValidator = ()=> {
    e.preventDefault();
    if (name.current != '') {
      alert('Name is required!')
    } else {
      axios({
        method: 'get',
        url: 'https://api.shutterstock.com/v2/images/search',
        headers: {Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`},
        params: {category: img_category}
      })
      .then((val)=> {
        let randomIndex = Math.floor(Math.random()*val.data.data.length)
        setImage_Url(val.data.data[randomIndex].assets.preview_1000.url);
        setMode2('game');
      })
      .catch((err)=> {console.log(err)})

    }
  }

  if (mode2 === 'modal2') {
    return <form id="gamesettings" onSubmit={formValidator}>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" ref={name} placeholder="Enter your name..."></input>
      <label htmlFor="difficulty">Choose a difficulty:</label>
      <select onChange={(e)=>{setDifficulty(e.target.value)}} name="difficulty" id="difficulty">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label htmlFor="category">Choose an image category:</label>
      <select onChange={(e)=>{setimg_category(e.target.value)}} name="category" id="category">
        {image_categories.map((item,index)=> {
          return <option key={index} value={item.name}>{item.name}</option>
        })}
      </select>

      <input type="submit">Start Game!</input>
    </form>
  } else {
    return <Game img_url={img_url} difficulty={difficulty}></Game>
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