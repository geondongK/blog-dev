/* eslint-disable no-console */
/* eslint-disable */
// import './App.css';
// import React, { Suspense, lazy } from 'react';
import React, { useEffect } from 'react';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import customAxios from './libs/api/axios';
import './sass/main.scss';
// import { login } from './redux/slices/userSlice';

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
// import NewPost from './pages/NewPostPage';
// import Blog from './pages/PostPage';
// import MainPage from './pages/MainPage';
// import NotFound from './pages/NotFoundPage';
// 다시 시작
// const Feed = lazy(() => import('./components/layout/Feed'));
// import Loading from './components/Loading';

function App() {
    // const dispatch = useDispatch();

    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        customAxios
            .post('/auth/kakaoToken', {})
            .then(response => {
                // console.log(response.data);
                if (response.data.snsLoginSuccess === true) {
                    // dispatch(
                    //     login({
                    //         id: response.data.id,
                    //         name: response.data.name,
                    //         isLoggedIn: true,
                    //     }),
                    // );
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
