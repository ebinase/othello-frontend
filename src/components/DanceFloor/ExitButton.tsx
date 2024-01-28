import Image from 'next/image';

const ExitButton: React.FC<{ action: () => void }> = ({ action }) => {
  return (
    <button className='rounded-full bg-white'>
      <Image
        src='/text_exit.png'
        alt='exit'
        width={50}
        height={50}
        className='m-3'
        onClick={action}
      />
    </button>
  );
};

export default ExitButton;
