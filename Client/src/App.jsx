import {Routes,Route} from 'react-router-dom';
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import Addvehicles from './Components/Addvehicles';
import Addinsurances from './Components/Addinsurances';
import Addfuellogs from './Components/Addfuellogs';
import Addmaintenances from './Components/Addmaintenances';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Addvehicles" element={<Addvehicles/>}/>
        <Route path="/Addinsurances" element={<Addinsurances/>}/>
        <Route path="/Addfuellogs" element={<Addfuellogs/>}/>
        <Route path="/Addmaintenances" element={<Addmaintenances/>}/>
      </Routes>
    </>
  )
}

export default App
