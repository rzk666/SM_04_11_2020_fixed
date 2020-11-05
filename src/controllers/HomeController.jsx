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
    globals,
  } = props;
  const { data } = users;
  const { departments } = globals;

  // State
  const [state, setState] = useState({
    selectedDepartments: [],
    indeterminateDepartments: [],
    filterByEmployee: false,
    usersByDeparments: {},
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
    const {
      selectedDepartments,
      indeterminateDepartments,
      usersByDeparments,
    } = state;
    const { title, length } = departments.find((department) => department.id === id);
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
        usersByDeparments: { ...usersByDeparments, [title]: length },
        selectedDepartments: [...selectedDepartments, id],
        indeterminateDepartments: filteredDepartments,
      });
    } else {
      hideDepartment(id);
      setState({
        ...state,
        selectedDepartments: selectedDepartments.filter((x) => x !== id),
        usersByDeparments: { ...usersByDeparments, [title]: 0 },
      });
    }
  };

  const handleUserSelection = (isSelected, id, departmentId) => {
    const { usersByDeparments, indeterminateDepartments, selectedDepartments } = state;
    const { title, length } = departments.find((department) => department.id === departmentId);
    let usersInCurrentDepartment;
    // This means we clicked on a selected user, so we need to hide it.
    if (isSelected) {
      hideUserTasks(id);
      usersInCurrentDepartment = usersByDeparments[title] - 1;
    } else {
      usersInCurrentDepartment = usersByDeparments[title] + 1;
      fetchUserTasks(id);
    }
    // If we emptied this department we simply need to filter it out of both
    // indeterminated & selected
    if (!usersInCurrentDepartment) {
      setState({
        ...state,
        usersByDeparments: { ...usersByDeparments, [title]: usersInCurrentDepartment },
        indeterminateDepartments: indeterminateDepartments.filter((x) => x !== departmentId),
        selectedDepartments: selectedDepartments.filter((x) => x !== departmentId),
      });
      // If this department is full, we need to set it to selected and filter it out of
      // indeterminated
    } else if (usersInCurrentDepartment === length) {
      setState({
        ...state,
        usersByDeparments: { ...usersByDeparments, [title]: usersInCurrentDepartment },
        indeterminateDepartments: indeterminateDepartments.filter((x) => x !== departmentId),
        selectedDepartments: [...selectedDepartments, departmentId],
      });
    } else {
    // Once an employee is selected, change its relevant department to indeteminated
    // Also make sure we don't add the same departments twice
      // const updateIndeterminate = (indeterminateDepartments.find((x) => x === departmentId));
      setState({
        ...state,
        usersByDeparments: { ...usersByDeparments, [title]: usersInCurrentDepartment },
        indeterminateDepartments: [...new Set([...indeterminateDepartments, departmentId])],
        selectedDepartments: selectedDepartments.filter((department) => departmentId !== department),
      });
    }
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
