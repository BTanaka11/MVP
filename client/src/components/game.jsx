import React from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';

const rotationAnimation0 = keyframes`
  100% {transform: rotate(0deg)}
`
const rotationAnimation1 = keyframes`
  100% {transform: rotate(270deg)}
`
const rotationAnimation2 = keyframes`
  100% {transform: rotate(180deg)}
`
const rotationAnimation3 = keyframes`
  100% {transform: rotate(90deg)}
`

const StyledImg = styled.img`
  object-fit: none;
  object-position: ${props=>props.poz};
  animation-fill-mode: both;
  animation-name: ${({rotation})=>{
    return {0:rotationAnimation0, 3:rotationAnimation3, 2:rotationAnimation2,1:rotationAnimation1}[rotation[0]]
  }};
  animation-duration: 1s;
  animation-iteration-count: 1;
  box-shadow: ${props=>props.glowUnsolved ? '0 0 5px red' : 'none'};
`;

//   transform: rotate(${({rotation})=>{
//     return {0:'0', 3:'90', 2:'180',1:'270'}[rotation[0]];
//   }}deg);

const StyledBoard = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props=>props.tileGap}px;
  width: ${props=>props.widthz}px;
  height: ${props=>props.heightz}px;
  align-content: center;
  margin: auto;
  padding-left: 20px;
  margin-top: 20px;
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

const convertSplitDataToObjectPosition = (splitData, dontRotate = false) => {
  let resultsMatrix =[];

  const getRandomRotation = () => {
    return randomRotate[Math.ceil(Math.random()*4)];
  };

  for (let i = 1; i <= splitData.rows; i ++) {
    resultsMatrix.push([]);
    for (let k = 1; k <= splitData.cols; k ++) {
      let cssHelper = `left -${(k-1)*splitData.side}px top -${(i-1)*splitData.side}px`;
      let randomRot = dontRotate? randomRotate[1] : getRandomRotation();
      resultsMatrix[i-1].push({cssHelper: cssHelper,matrixLoc: [i-1, k-1],rotation:randomRot, solvedTile: randomRot === randomRotate[1] ? true: false});
    }
  }

  return resultsMatrix;
}
// SCORE = 300 / completiontime * tilecount - errorRateReduction. if hintcount used divide by 2.
export const Game = ({single_image, img_category, tileCount, setMode, name})=> {
  let splitData = OptimalImageSplitting(single_image.width, single_image.height, tileCount);

  const [phase, setPhase] = React.useState('fullImage');
  const [tileGap, setTileGap] = React.useState(10);
  const [timer, setTimer] = React.useState(null);
  const [hintCount, sethintCount] = React.useState(0);
  const [matrix, setMatrix] = React.useState(convertSplitDataToObjectPosition(splitData, true));
  const [glowUnsolved, setglowUnsolved] = React.useState(false);

  const calculateScore = () => {
    return Math.floor(300 / timer * tileCount * (.5 ** hintCount));
  };

  React.useEffect(()=> {
    setTimeout(()=> {
      setPhase('croppedImage');
      setTimeout(()=> {
        setPhase('splitCroppedImage');
        setTimeout(()=> {
          setMatrix(convertSplitDataToObjectPosition(splitData));
          setPhase('play');
          setTimer(0);
        }, 1000);
      }, 1000);
    }, 1000);

  }, []);

  React.useEffect(() => {
    var interval;
    if (tileGap > 0 && phase === 'play') {
      interval = setInterval(() => {setTimer(timer + 1)}, 1000);
      return () => clearInterval(interval);
    } else {
      clearInterval(interval)
    }

  }, [timer, tileGap]);

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
        newMatrix[i].push({cssHelper: matrix[i][k].cssHelper, matrixLoc: [i, k],rotation:matrix[i][k].rotation, solvedTile: matrix[i][k].solvedTile});
      }
    }

    if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[1]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[2]
      newMatrix[matrixLoc[0]][matrixLoc[1]].solvedTile = false;
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[2]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[3];
      newMatrix[matrixLoc[0]][matrixLoc[1]].solvedTile = false;
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[3]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[4];
      newMatrix[matrixLoc[0]][matrixLoc[1]].solvedTile = false;
    } else if (newMatrix[matrixLoc[0]][matrixLoc[1]].rotation === randomRotate[4]) {
      newMatrix[matrixLoc[0]][matrixLoc[1]].rotation = randomRotate[1]
      newMatrix[matrixLoc[0]][matrixLoc[1]].solvedTile = true;
      countSolved++;
    }

    setMatrix(newMatrix);
    if (countSolved === Number(tileCount)) {
      setTileGap(0);

      axios({
        method:'post',
        url: '/leaderboard',
        data: {
          Username: name,
          Image_Category: img_category,
          Tile_Count: tileCount,
          Time_to_Solve: timer,
          Score: calculateScore()
        }
      })
      .catch((err)=> {alert('couldnt save to leaderboard')});

      setTimeout(()=>{setMode('home')}, 7000);
    }
  };

  const hintHandler = () => {
    setglowUnsolved(true);
    sethintCount(hintCount + 1);
    setTimeout(()=> {
      setglowUnsolved(false);
    }, 1000)
  };

  if (phase === 'fullImage') {
    return (
      <div>
        <div className="gameoverlay">3!</div>
        <div id="fullimage">
          <img src={single_image.url}></img>
        </div>
      </div>
    )
  } else if (phase ==='croppedImage') {
    return (
      <div>
        <div className="gameoverlay">2!</div>
        <StyledBoard tileGap={0} widthz={splitData.cols * splitData.side} heightz={splitData.rows * splitData.side}>
        {splitData2.map((item,index)=> {
          return <Tile item={item} key={index} url={single_image.url} side={splitData.side} adjustMatrix={adjustMatrix} glowUnsolved={glowUnsolved}></Tile>
        })}
      </StyledBoard>
      </div>
    )
  } else if (phase === 'splitCroppedImage') {
    return (
      <div>
        <div className="gameoverlay">1!</div>
        <StyledBoard tileGap={tileGap} widthz={splitData.cols * splitData.side + tileGap*(splitData.cols + 1)} heightz={splitData.rows * splitData.side + tileGap*(splitData.rows + 1)}>
        {splitData2.map((item,index)=> {
          return <Tile item={item} key={index} url={single_image.url} side={splitData.side} adjustMatrix={adjustMatrix} glowUnsolved={glowUnsolved}></Tile>
        })}
      </StyledBoard>
      </div>
    )
  } else if (phase === 'play') {

    return (
    <div>

      {tileGap === 0 ? <div className="gameoverlay">Solved in {timer} seconds! Your score is 300/{timer}s *{tileCount} tiles{hintCount > 0 ? ` with a halving Hint penalty applied ${hintCount} times` : ''} = {calculateScore()}</div> : <div className="gameoverlay">Time ellapsed: {timer} seconds     Hints used: {hintCount}     Current score: {calculateScore()}</div>}
      <StyledBoard tileGap={tileGap} widthz={splitData.cols * splitData.side + tileGap*(splitData.cols + 1)} heightz={splitData.rows * splitData.side + tileGap*(splitData.rows + 1)}>
        {splitData2.map((item,index)=> {
          return <Tile item={item} key={index} url={single_image.url} side={splitData.side} adjustMatrix={adjustMatrix} glowUnsolved={glowUnsolved}></Tile>
        })}
      </StyledBoard>
      <div className="buttoncontainer"><button className="playbutton" onClick={hintHandler}>Hint</button></div>

    </div>
    )
  }
}

export const Tile = ({item,url,side,adjustMatrix,glowUnsolved})=> {
  return <StyledImg poz={item.cssHelper} rotation={item.rotation} glowUnsolved={item.solvedTile===false && glowUnsolved === true? true : false} src={url} width={side} height={side} onClick={()=>adjustMatrix(item.matrixLoc)}></StyledImg>
}
