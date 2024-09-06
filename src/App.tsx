import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetail';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
