import { useState } from 'react';
import Entrance from './Entrance/Entrance';

type Place = 'entrance' | 'danceFloor';

const MainContent: React.FC = () => {
  const [current, setCurrent] = useState<Place>('entrance');
  const content = [current].flatMap((place) => {
    if (place === 'danceFloor') {
      return 'ダンスフロア';
    }
    return (
      <Entrance
        enterDanceFloor={() => {
          setCurrent('danceFloor');
        }}
      />
    );
  });
  return <div className='h-screen w-screen'>{content}</div>;
};

export default MainContent;
