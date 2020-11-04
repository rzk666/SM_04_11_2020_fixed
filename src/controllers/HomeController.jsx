import React, { useEffect, useState } from 'react';
// Custom Hooks
import usePrevious from '../hooks/usePrevioues';

const HomeController = (props) => {
  const { hideDepartment, fetchUsers, fetchUsersByDepartment } = props;
  // State
  const [state, setState] = useState({
    selectedDepartments: [],
    test: 1,
  });
  const prevState = usePrevious(state) || state;
  // Mount effect TEMP
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  // Handle Department Change
  // useEffect(() => {
  //   const { selectedDepartments } = state;
  //   // If we just added
  //   if ((selectedDepartments.length > prevState.selectedDepartments.length)) {
  //   } else {
  //     console.log('REMOVED');
  //   }
  // }, [state.selectedDepartments]);

  const toggleDepartment = (id) => {
    const { selectedDepartments } = state;
    const currentDepartment = selectedDepartments.find((x) => x === id);
    if (!currentDepartment) {
      fetchUsersByDepartment(id);
      setState({ ...state, selectedDepartments: [...selectedDepartments, id] });
    } else {
      hideDepartment(id);
      setState({ ...state, selectedDepartments: selectedDepartments.filter((x) => x !== id) });
    }
  };

  const callbacks = {
    toggleDepartment: (id) => toggleDepartment(id),
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
