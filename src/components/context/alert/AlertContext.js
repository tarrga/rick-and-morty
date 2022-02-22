import { createContext, useReducer, useContext } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

const AlertProvider = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set an alert
  const setAlert = (msg, type) => {
    dispatch({ type: 'setAlert', payload: { msg, type } });
    setTimeout(() => {
      dispatch({ type: 'removeAlert' });
    }, 3000);
  };

  return <AlertContext.Provider value={{ alert: state, setAlert }} {...props} />;
};

const useAlert = () => {
  const context = useContext(AlertContext);
  return context;
};

export { AlertProvider, useAlert };
