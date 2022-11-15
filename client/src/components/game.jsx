import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  object-fit: none;
  object-position: ${props=>props.poz};
  transform: rotate(${({rotation})=>{
    return {0:'0', 3:'90', 2:'180',1:'270'}[rotation[0]];
  }}deg);
`;

const StyledBoard = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props=>props.tileGap}px;
  width: ${props=>props.widthz}px;
  height: ${props=>props.heightz}px;
  align-content: center;
`;

const OptimalImageSplitting = (width, height, tileCount)=> {
  let maxArea=-Infinity;
  let maxConfig={}
  for (let x = 1; x <= tileCount; x ++) {
    let rowCount = x;
    if (tileCount % rowCount === 0) {
      let colCount = tileCount / rowCount;
      let sideLength = Math.min(height/rowCount, width/colCount);
      let area = sideLength * sideLength * tileCount
      if (area >= maxArea) {
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
  let resultsMatrix =[];
  let randomRotate = {
    1: [0,1,2,3],
    2: [3,0,1,2],
    3: [2,3,0,1],
    4: [1,2,3,0]
  };

  const getRandomRotation = () => {
    return randomRotate[Math.ceil(Math.random()*4)];
  };

  for (let i = 1; i <= splitData.rows; i ++) {
    resultsMatrix.push([]);
    for (let k = 1; k <= splitData.cols; k ++) {
      let cssHelper = `left -${(k-1)*splitData.side}px top -${(i-1)*splitData.side}px`;
      resultsMatrix[i-1].push({cssHelper: cssHelper,matrixLoc: [i-1, k-1],rotation:getRandomRotation()});
    }
  }

  return resultsMatrix;
}

export const Game = ({single_image, difficulty, tileCount})=> {
  console.log('gamed!')
  let splitData = OptimalImageSplitting(single_image.width, single_image.height, tileCount);

  const tileGap = 10;

  const [piecesSolved, setpiecesSolved] = React.useState(0);
  const [matrix, setMatrix] = React.useState(convertSplitDataToObjectPosition(splitData));

  let splitData2=[];
  for (let i = 0; i < matrix.length; i ++) {
    for (let k=0; k < matrix[i].length; k++) {
      splitData2.push(matrix[i][k]);
    }
  };

  return (<StyledBoard tileGap={tileGap} widthz={splitData.cols * splitData.side + tileGap*(splitData.cols + 1)} heightz={splitData.rows * splitData.side + tileGap*(splitData.rows + 1)}>
    {splitData2.map((item,index)=> {
      return <Tile item={item} key={index} url={single_image.url} side={splitData.side}></Tile>
    })}
  </StyledBoard>)
}

export const Tile = ({item,url,side})=> {

  return <StyledImg poz={item.cssHelper} rotation={item.rotation} src={url} width={side} height={side}></StyledImg>
}
