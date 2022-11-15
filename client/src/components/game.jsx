import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  object-fit: none;
  object-position: ${props=>props.poz};
`;

const OptimalImageSplitting = (width, height, tiles)=> {
  let maxArea=-Infinity;
  let maxConfig={}
  for (let x = 1; x <= tiles; x ++) {
    let rowCount = x;
    if (tiles % rowCount === 0) {
      let colCount = tiles / rowCount;
      let sideLength = Math.min(height/rowCount, width/colCount);
      let area = sideLength * sideLength * tiles
      if (area > maxArea) {
        maxArea = area;
        maxConfig.rows = rowCount;
        maxConfig.cols = colCount;
        maxConfig.side = sideLength
      }
    }
  }
  return maxConfig
}

const convertSplitDataToObjectPosition = (splitData) => {
  let results =[];
  for (let i = 1; i <= splitData.rows; i ++) {
    for (let k = 1; k <= splitData.cols; k ++) {
      results.push(`left -${(i-1)*splitData.side}px top -${(k-1)*splitData.side}px`)
    }
  }
  return results;
}

export const Game = ({single_image, difficulty})=> {
  let tileCount = 10;
  let splitData = OptimalImageSplitting(single_image.width, single_image.height, tiles);

  let splitData2 = convertSplitDataToObjectPosition(splitData);

  //take aspect ratio and

  return (<div>game!!
    {splitData2.map((item,index)=> {
      return <StyledImg poz={item} src={img_url} width={splitData.side} height={splitData.side}></StyledImg>
    })}
  </div>)
}

const Tile = () => {
  single_image
}

const fullImg = (img_url, fullImageRef) => {
  return <img ref={fullImageRef} src={img_url}></img>
}