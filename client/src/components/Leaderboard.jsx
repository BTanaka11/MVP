import React from 'react';
import axios from 'axios';

export const Leaderboard = ()=> {

  const [data, setData] = React.useState(null);

  React.useEffect(()=> {
    axios({
      method: 'get',
      url: '/leaderboard'
    })
    .then((val)=>{setData(val.data)})
    .catch((err)=> {console.log(err)})
  }, []);

  return (
    data === null ? <div>Loading...</div>
    :
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Date</th>
          <th>Image Category</th>
          <th>Tile Count</th>
          <th>Time (s)</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index)=> {
          return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.date}</td>
            <td>{item.image_category}</td>
            <td>{item.tile_count}</td>
            <td>{item.time_to_solve}</td>
            <td>{item.score}</td>
          </tr>)
        })}
      </tbody>
    </table>
  )
}