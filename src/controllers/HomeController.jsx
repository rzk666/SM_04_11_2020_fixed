import React, { useEffect, useState } from 'react';
// Common
import { MAX_USERS } from '../common/app-const';

const HomeController = (props) => {
  const {
    hideDepartment,
    fetchUsers,
    fetchUsersByDepartment,
    hideUnselectedUsers,
    hideUserTasks,
    fetchUserTasks,
    users,
  } = props;
  const { data } = users;

  // State
  const [state, setState] = useState({
    selectedDepartments: [],
    indeterminateDepartments: [],
    filterByEmployee: false,
  });

  // ----- useEffects ----- //

  // React to filterByEmployee changes
  useEffect(() => {
    const { filterByEmployee } = state;
    if (!filterByEmployee) {
      hideUnselectedUsers();
    } else if (MAX_USERS > data.length) {
      // We'll only fetch relevant chuncks of users and only when needed.
      // We'll also fetch the users without having the server actually populating
      // the tasks to make this request as cheap as possible
      const reqParams = {
        firstIndex: data.length,
        endIndex: MAX_USERS - data.length,
        orderBy: 'department',
        withTasks: false,
      };
      fetchUsers({ ...reqParams });
    }
  }, [state.filterByEmployee]);

  // ----- Callbacks ----- //

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

  const handleUserSelection = (isSelected, id, departmentId) => {
    const { indeterminateDepartments, selectedDepartments } = state;
    // This means we clicked on a selected user, so we need to hide it.
    if (isSelected) {
      hideUserTasks(id);
    } else {
      fetchUserTasks(id);
    }
    // Once an employee is selected, change its relevant department to indeteminated
    setState({
      ...state,
      indeterminateDepartments: [...indeterminateDepartments, departmentId],
      selectedDepartments: [...selectedDepartments].filter((department) => departmentId !== department),
    });
  };
  
  const callbacks = {
    toggleDepartment: (id) => toggleDepartment(id),
    toggleFilterByEmployee: () => toggleFilterByEmployee(),
    handleUserSelection: (isSelected, id, departmentId) => handleUserSelection(isSelected, id, departmentId),
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
