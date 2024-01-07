import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './Home';
import Spotify from './Spotify';
import Result from './Result';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/migrate" element={<Spotify />} />
        <Route path="/success" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
