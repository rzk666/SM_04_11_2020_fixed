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
    selectedDepartments: [1, 14, 7],
    indeterminateDepartments: [1, 4, 10],
    filterByEmployee: false,
    count: 0,
  });

  // ----- useEffects ----- //

  useEffect(() => {
    console.log("IM RUNNING");
    const { count } = state;
    setInterval(() => setState({ ...state, count: count + 1 }), 1000);
  }, []);

  // React to filterByEmployee changes
  useEffect(() => {
    console.log("IM RUNNING");
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

  useEffect(() => {
    console.log("IM RUNNING");
    console.log(state.indeterminateDepartments);
    console.log(state.selectedDepartments);
  }, [state.selectedDepartments, state.indeterminateDepartments]);

  // ----- Callbacks ----- //

  const toggleFilterByEmployee = () => {
    console.log("IM RUNNING");
    const { filterByEmployee } = state;
    setState({ ...state, filterByEmployee: !filterByEmployee });
  };

  const toggleDepartment = (id) => {
    console.log("IM RUNNING");
    const { selectedDepartments, indeterminateDepartments } = state;
    const currentDepartment = selectedDepartments.find((x) => x === id);
    const isIndeterminated = indeterminateDepartments.find((x) => x === id);
    // This means the department was unselected or indeteminated
    if (!currentDepartment || isIndeterminated) {
      // TODO -> If its indeterminated we need to find a smart way
      // to only fetch the users we don't currently have on client
      fetchUsersByDepartment(id);
      const filteredDepartments = (indeterminateDepartments.filter((x) => x !== id));
      setState({
        ...state,
        selectedDepartments: [...selectedDepartments, id],
        indeterminateDepartments: filteredDepartments,
      });
    } else {
      hideDepartment(id);
      setState({ ...state, selectedDepartments: selectedDepartments.filter((x) => x !== id) });
    }
  };

  const handleUserSelection = (isSelected, id, departmentId) => {
    console.log("IM RUNNING");
    const { indeterminateDepartments, selectedDepartments } = state;
    // This means we clicked on a selected user, so we need to hide it.
    if (isSelected) {
      hideUserTasks(id);
    } else {
      fetchUserTasks(id);
    }
    // Once an employee is selected, change its relevant department to indeteminated
    // Also make sure we don't add the same departments twice
    const updateIndeterminate = indeterminateDepartments.find((x) => x === departmentId);
    setState({
      ...state,
      indeterminateDepartments:
       updateIndeterminate
         ? indeterminateDepartments
         : [...indeterminateDepartments, departmentId],
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
