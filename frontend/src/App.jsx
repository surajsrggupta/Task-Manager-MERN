import './App.css'
import HomeApp from './components/HomeApp';
import Try from './components/Try';
import Login from "./components/Login";
import { useState } from 'react';

function App() {

 const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      {/* <Try/> */}
      <div className="App">{!token ? <Login setToken = {setToken} /> : <HomeApp token = {token} />}</div>
    </>
  );
}

export default App
