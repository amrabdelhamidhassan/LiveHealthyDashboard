import './App.css';
import Header from './components/Header';
import Login from './screens/Login';
import Home from './screens/Home';
import Food from './screens/Food';
import Users from './screens/Users';
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './store/store';
import { Provider } from "react-redux";
import MakeFood from './screens/MakeFood';
import {
  BrowserRouter ,
  Routes,
  Route,
  
} from "react-router-dom";

import './constants/colors.css'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <div className="App BackgroundMainTheme">
        <Header />

          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/food" element={<Food />} />
              <Route path="/home/food/crud" element={<MakeFood />} />
              <Route path="/home/users" element={<Users />} />
              <Route path='*' element={<Login />} />
          </Routes>
          </div>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
