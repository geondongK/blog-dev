//  eslint-disable
import React, { useEffect } from 'react';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import customAxios from './libs/api/axios';
import { loginSuccess } from './redux/slices/userSlice';
import './sass/main.scss';

// components
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Post from './pages/Post/Post';
import AddPost from './pages/EditPost/AddPost/AddPost';
import EditPost from './pages/EditPost/EditPost/EditPost';
import Search from './pages/Search/SearchPage';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        customAxios
            .post('/auth/kakaoToken', {})
            .then(response => {
                // console.log(response.data);
                if (response.data.snsLoginSuccess === true) {
                    dispatch(loginSuccess(response.data));
                }
            })
            .catch(() => {
                // console.log(error);
            });
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/post" element={<AddPost />} />
                <Route path="/search" element={<Search />} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
