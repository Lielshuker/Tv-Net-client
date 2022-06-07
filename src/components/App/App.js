import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logout from '../Logout/Logout'
import './App.css';
import Login from '../Login/Login';
import useToken from './useToken';
import Profile from '../Profile/Profile';
import SignUp from '../SingUp/SignUp';
import { Movie } from '@mui/icons-material';
import MoviesList from '../Movies/MoviesList';
import Example from '../Movies/Movies';


function App() {
  const { token, removeToken, setToken } = useToken();

  if (!token && token !== "" && token !== undefined) {
    return <Login setToken={setToken} />
  }
  console.log(token)

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Logout token={removeToken} /> */}
        {/* {!token && token !== "" && token !== undefined ? */}
        {/* <Login setToken={setToken} />
          : ( */}
        <>
          <Routes>
            <Route exact path="/" element={<Login token={token} setToken={setToken} />}></Route>
            <Route exact path="/profile" element={<Profile token={token} />}></Route>
            <Route exact path="/signup" element={<SignUp token={token} />}></Route>
            <Route exact path="/logout" element={<Logout token={removeToken} />}></Route>
            {/* <Route exact path="/movies" element={<Movie token={token} />}></Route> */}
            <Route exact path="/moviesList" element={<MoviesList token={token} />}></Route>
            <Route exact path='/watchMovie' element={<Example token={token} />}></Route>
          </Routes>
        </>
        {/* )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;