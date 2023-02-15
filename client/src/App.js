/* eslint-disable no-console */
//  eslint-disable

import React, { useEffect } from 'react';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import customAxios from './libs/api/axios';
import { loginSuccess } from './redux/slices/userSlice';
import './sass/main.scss';

// components
import Navbar from './components/NavBar';
import Footer from './components/Footer';
// Pages
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Post from './pages/PostPage';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Search from './pages/SearchPage';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        customAxios
            .post('/auth/kakaoToken', {})
            .then(response => {
                // console.log(response.data);
                if (response.data.snsLoginSuccess === true) {
                    console.log(response.data);
                    dispatch(loginSuccess(response.data));
                }
            })
            .catch(() => {
                // console.log(error);
            });
    }, []);

    return (
        <BrowserRouter>
            {/* <Box sx={{ paddingBottom: '5rem' }}> */}
            {/* <Layout> */}
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
                {/* <Route path="/post" element={<NewPost />} />
                <Route path="/post/:id" element={<Blog />} />
                <Route path="/*" element={<NotFound />} />  */}
            </Routes>
            <Footer />
            {/* )} */}
            {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/post" element={<NewPost />} />
                    <Route path="/post/:id" element={<Blog />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes> */}
            {/* <Footer /> */}
            {/* </Stack> */}
            {/* </Box> */}
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;
