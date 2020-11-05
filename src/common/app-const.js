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
    color: '#22D2A0',
    length: '3',
  },
  {
    id: 96,
    title: 'Marketing',
    color: '#192824',
    length: '3',
  },
  {
    id: 64,
    title: 'CC',
    color: '#1FC11B',
    length: '3',
  },
  {
    id: 17,
    title: 'Product',
    color: '#FFD913',
    length: '3',
  },
  {
    id: 19,
    title: 'HR',
    color: '#FF9C55',
    length: '3',
  },
  {
    id: 22,
    title: 'R&D',
    color: '#FF5555',
    length: '3',
  },
  {
    id: 88,
    title: 'Research',
    color: '#2970be',
    length: '3',
  }];

export const MAX_USERS = 10;
