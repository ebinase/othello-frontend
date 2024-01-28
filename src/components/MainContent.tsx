import { useState } from 'react';
import DanceFloor from './DanceFloor/DanceFloor';
import Entrance from './Entrance/Entrance';

type Place = 'entrance' | 'danceFloor';

const MainContent: React.FC = () => {
  const [current, setCurrent] = useState<Place>('entrance');

  return (
    <div className='h-screen w-screen'>
      {current === 'danceFloor' ? (
        <DanceFloor
          exit={() => {
            setCurrent('entrance');
          }}
        />
      ) : (
        <Entrance
          enterDanceFloor={() => {
            setCurrent('danceFloor');
          }}
        />
      )}
    </div>
  );
};

export default MainContent;
