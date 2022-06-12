import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './userReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer = combineReducers({
    userReducer: persistReducer(persistConfig, userReducer) ,
});

export const store = createStore(rootReducer,{}, applyMiddleware(thunk));
export const persistor = persistStore(store);