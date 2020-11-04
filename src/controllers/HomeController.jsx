import React, { useEffect, useState } from 'react';
// Custom Hooks
import usePrevious from '../hooks/usePrevioues';

const HomeController = (props) => {
  const { hideDepartment, fetchUsers, fetchUsersByDepartment } = props;
  // State
  const [state, setState] = useState({
    selectedDepartments: [],
    filterByEmployee: false,
  });
  // const prevState = usePrevious(state) || state;

  const toggleFilterByEmployee = () => {
    const { filterByEmployee } = state;
    setState({ ...state, filterByEmployee: !filterByEmployee });
  };

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
    toggleFilterByEmployee: () => toggleFilterByEmployee(),
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
