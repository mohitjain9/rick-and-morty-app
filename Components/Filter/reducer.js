export default function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.data];
    case 'remove':
      return state.filter((value) => value !== action.data);
    case 'replace':
      return [action.data];
    default:
      throw new Error();
  }
}
