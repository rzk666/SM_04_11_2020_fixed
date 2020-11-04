import React, { useEffect, useState } from 'react';

const HomeController = (props) => {
  const { fetchUsers } = props;
  useEffect(() => {
    fetchUsers();
  }, []);
  const [state, setState] = useState({
    selectedDepartments: [],
  });
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
