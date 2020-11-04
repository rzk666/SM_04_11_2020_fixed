export const INITIAL_STATE = {
  auth: {
    token: '',
  },
  users: {
    isLoading: false,
    hasError: false,
    error: '',
    // Hidden -> This might be usede in an idea I have to realise other stuff later
    data: [],
  },
};

export const DEPARTMENTS = [
  {
    id: 25,
    title: 'Sales',
  },
  {
    id: 96,
    title: 'Marketing',
  },
  {
    id: 64,
    title: 'Sales',
  },
  {
    id: 17,
    title: 'Product',
  },
  {
    id: 19,
    title: 'HR',
  },
  {
    id: 22,
    title: 'R&D',
  },
  {
    id: 88,
    title: 'Research',
  }];

export const MAX_USERS = 10;
