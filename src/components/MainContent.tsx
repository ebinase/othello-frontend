import { useState } from 'react';
import Entrance from './Entrance/Entrance';

type Place = 'entrance' | 'danceFloor';

const MainContent: React.FC = () => {
  const [current, setCurrent] = useState<Place>("entrance");
  return (
    <div className='h-screen w-screen'>
      <div className='text-white absolute'>{current}</div>
      <Entrance enterDanceFloor={() => {setCurrent("danceFloor")}}/>
    </div>
  );
};

export default MainContent;
