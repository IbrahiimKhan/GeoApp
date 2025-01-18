import React from 'react';
import Navigator from './navigators/Navgator';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
 <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
   <Navigator/>
   </PersistGate>
 </Provider>
  );
};

export default App;
