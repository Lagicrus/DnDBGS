import React from 'react';
import { getCurrentTab } from '../utils/utils';

const Beyond = () => {
  const onClick = async () => {
    if (await getCurrentTab()) {
      console.log('hello');
    }
  };

  return <button onClick={onClick}>Fill in form</button>;
};

export default Beyond;
