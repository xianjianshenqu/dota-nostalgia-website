import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Heroes from './pages/Heroes';
import Netbar from './pages/Netbar';
import Videos from './pages/Videos';
import Radio from './pages/Radio';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/netbar" element={<Netbar />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/radio" element={<Radio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;