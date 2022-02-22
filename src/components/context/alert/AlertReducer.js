const alertReducer = (state, action) => {
  switch (action.type) {
    case 'setAlert':
      return action.payload;
    case 'removeAlert':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
