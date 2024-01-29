import Image from 'next/image';

const ClosedEntrance: React.FC<{ open: () => void }> = ({ open }) => {
  return (
    <div className='h-full'>
      <Image
        alt='gate_closed'
        src='/gate_closed.png'
        width={693}
        height={498}
        className='w-full h-full'
        priority
        unoptimized
        onClick={open}
      />
    </div>
  );
};

export default ClosedEntrance;
