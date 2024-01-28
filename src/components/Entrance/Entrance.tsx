import { useState } from 'react';
import ClosedEntrance from './ClosedEntrance';
import OpenedEntrance from './OpenedEntrance';

type Props = {
  enterDanceFloor: () => void;
};

const Entrance: React.FC<Props> = ({ enterDanceFloor }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      {isOpen ? (
        <OpenedEntrance enterDanceFloor={enterDanceFloor} />
      ) : (
        <ClosedEntrance open={() => setIsOpen(true)} />
      )}
    </div>
  );
};

export default Entrance;
