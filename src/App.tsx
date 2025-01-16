import React from 'react';
import Navigator from './navigators/Navgator';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
 <Provider store={store}>
    <Navigator/>
 </Provider>
  );
};

export default App;
