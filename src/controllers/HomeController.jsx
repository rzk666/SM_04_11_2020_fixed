import React, { useEffect, useState } from 'react';

const HomeController = (props) => {
  const [state, setState] = useState({
    test: 1,
  });
  // Add relevant state
  // Add relevent useEffects
  // Add callbacks
  // Get view component
  const callbacks = {
    foo: () => console.log('test'),
  };
  const { View } = props;
  return (
    <View
      {...props}
      {...state}
      {...callbacks}
    />
  );
};

export default HomeController;
