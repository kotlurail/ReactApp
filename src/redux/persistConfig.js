// persistConfig.js
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'loggedIn',
  storage,
  whitelist: ['auth'], // include the slices you want to persist
};

export default persistConfig;
