import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  object-fit: none;
  object-position: ${props=>props.poz};
  transform: rotate(${({rotation})=>{
    return {0:'0', 3:'90', 2:'180',1:'270'}[rotation[0]];
  }}deg);
  color: #111;
  background: yellow;
  box-shadow: 0 0 5px yellow;
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

let randomRotate = {
  1: [0,1,2,3],
  2: [3,0,1,2],
  3: [2,3,0,1],
  4: [1,2,3,0]
};

const convertSplitDataToObjectPosition = (splitData) => {
  let resultsMatrix =[];

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
// SCORE = 300 / completiontime * tilecount - errorRateReduction. if hintcount used divide by 2.
export const Game = ({single_image, difficulty, tileCount})=> {
  let splitData = OptimalImageSplitting(single_image.width, single_image.height, tileCount);

  const [tileGap, setTileGap] = React.useState(10);
  const [timer, setTimer] = React.useState(0);
  const [hintAvailable, sethintAvailable] = React.useState(true);
  const [matrix, setMatrix] = React.useState(convertSplitDataToObjectPosition(splitData));

  React.useEffect(() => {
    const interval = setInterval(() => {setTimer(timer + 1)}, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  let splitData2=[];
  for (let i = 0; i < matrix.length; i ++) {
    for (let k=0; k < matrix[i].length; k++) {
      splitData2.push(matrix[i][k]);
    }
  };

  const adjustMatrix = (matrixLoc) => {
    let newMatrix = [];
    let countSolved = 0;
    for (let i = 0; i < matrix.length; i ++) {
      newMatrix.push([]);
      for (let k = 0; k < matrix[i].length; k ++) {
        if (matrix[i][k].rotation === randomRotate[1]) {
          countSolved++;
        }
        newMatrix[i].push({cssHelper: matrix[i][k].cssHelper, matrixLoc: [i, k],rotation:matrix[i][k].rotation});
      }
    }
    if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[1]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[2]
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[2]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[3]
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[3]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[4]
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[4]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[1]
      countSolved++;
    }
    setMatrix(newMatrix);
    if (countSolved === Number(tileCount)) {
      setTileGap(0);
    }
  };

  return (
  <div>

    {tileGap === 0 ? <div className="gameoverlay">Solved in {timer} seconds!</div> : <div className="gameoverlay">Time ellapsed: {timer} seconds</div>}
    <StyledBoard tileGap={tileGap} widthz={splitData.cols * splitData.side + tileGap*(splitData.cols + 1)} heightz={splitData.rows * splitData.side + tileGap*(splitData.rows + 1)}>
      {splitData2.map((item,index)=> {
        return <Tile item={item} key={index} url={single_image.url} side={splitData.side} adjustMatrix={adjustMatrix}></Tile>
      })}
    </StyledBoard>
    {hintAvailable ? <button>Hint</button> : <div></div>}
  </div>
  )
}

export const Tile = ({item,url,side,adjustMatrix})=> {
  return <StyledImg poz={item.cssHelper} rotation={item.rotation} src={url} width={side} height={side} onClick={()=>adjustMatrix(item.matrixLoc)}></StyledImg>
}
