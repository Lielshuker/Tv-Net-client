import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from '../Login/Login';
import useToken from './useToken';
import Profile from '../Profile/Profile';
import SignUp from '../SingUp/SignUp';
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import ResetPassword from '../ResetPassword/ResetPassword'


function App() {
  const { token, setToken } = useToken();
  return (
    <BrowserRouter>
      <div className="App">
        {(!token && token !== "" && token !== undefined) ?
          <Route exact path="/" element={<Login token={token} setToken={setToken} />}></Route>

          : (
            <>
              <Routes>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />}></Route>
                <Route exact path="/signup" element={<SignUp token={token} />}></Route>
                <Route exact path="/forgotPassword" element={<ForgotPassword token={token} setToken={setToken} />}></Route>
                <Route exact path="/reset/:token" element={<ResetPassword />}></Route>
                <Route exact path="/" element={<Login token={token} setToken={setToken} />}></Route>
              </Routes>
            </>

          )}
      </div>
    </BrowserRouter >
  );
}

export default App;
