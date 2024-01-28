'use client';

import type { NextPage } from 'next';
import MainContent from '../src/components/MainContent';
const Home: NextPage = () => {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <main className='flex-grow'>
          <div className='h-full flex justify-between items-center'>
            <MainContent />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
