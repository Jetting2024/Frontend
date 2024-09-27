import React from 'react';
import Navbar from '../components/Navbar';
import TimePicker from '../components/modals/TimePicker';

const HomePage: React.FC = () => {
  return (
    <div className=' w-full h-full'>
      <TimePicker />
      {/* <Navbar /> */}
    </div>
  );
};

export default HomePage;
