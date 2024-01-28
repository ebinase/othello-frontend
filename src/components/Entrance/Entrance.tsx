import { useState } from 'react';
import ClosedEntrance from './ClosedEntrance';

const Entrance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      {isOpen
        ? "Open"
        : <ClosedEntrance open={() => setIsOpen(true)} />
      }
    </div>
  );
};

export default Entrance;
