import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ListTemtems from './components/Temtem/ListTemtems';
import CreateTemtem from './components/Temtem/CreateTemtem';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <ListTemtems />
          </PrivateRoute>
        } />
        <Route path="/create-temtem" element={
          <PrivateRoute>
            <CreateTemtem />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
