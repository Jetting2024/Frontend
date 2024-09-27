import React from 'react';
import Navbar from '../components/Navbar';
import TimePicker from '../components/timeSetModal/TimePicker';

const HomePage: React.FC = () => {
  return (
    <div className=' w-full h-full'>
      <TimePicker />
      {/* <Navbar /> */}
    </div>
  );
};

export default HomePage;
