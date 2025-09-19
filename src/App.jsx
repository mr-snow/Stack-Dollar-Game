import './App.css';
import Home from './Components/home/home';
import Levels from './Components/levels/levels';
import Level1 from './Components/level1/level1';
import Level2 from './Components/level2/level2';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="mainbody">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<Levels />} key={Date.now()} />
          <Route path="/level1" element={<Level1 />} key={Date.now()} />
          <Route path="/level2" element={<Level2 />} key={Date.now()} />
        </Routes>
      </div>
    </>
  );
}

export default App;
