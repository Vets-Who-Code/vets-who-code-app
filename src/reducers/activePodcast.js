export default (state = null, action) => {
  switch (action.type) {
    case 'PODCAST_SELECTED':
      return action.payload;
    default:
      return state;
  }
};
