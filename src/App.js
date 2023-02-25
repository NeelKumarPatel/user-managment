import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Headers';
import Footer from './components/Footer/Footer';
import List from './pages/List';
import Login from './pages/Login'
import AddItem from './pages/AddItem';
import Signup from './pages/Signup';
import Protected from './components/protected/protectedRoute';
import MyContext from './pages/MyContext';

import { useState } from 'react';

const authToken = localStorage.getItem('user_id');
function App() {
  const [myValue, setMyValue] = useState(authToken);

  if (!authToken) {
    redirect('/');
  }

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <MyContext.Provider value={{ myValue, setMyValue }}>
        <Header token={authToken} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/list-itme' element={<Protected> <List /></Protected> } />
          <Route path='/add-item' element={<Protected> <AddItem /> </Protected>} />
          <Route path='/*' element={<Login />} />
        </Routes>
        <Footer />
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
