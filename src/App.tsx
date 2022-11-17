import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomPage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import UserPage from './components/UserPage/UserPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} />

        {/* w środku, komponenty które będą się pojawiać i znikać  */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/user' element={<UserPage loggedIn={loggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
