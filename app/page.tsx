'use client';

import type { NextPage } from 'next';
import MainContent from '../src/components/MainContent';
const Home: NextPage = () => {
  return (
    <>
      <main className='h-screen w-screen bg-black'>
        <div className='h-full w-full'>
          <MainContent />
        </div>
      </main>
    </>
  );
};

export default Home;
