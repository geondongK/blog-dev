/* eslint-disable no-console */
/* eslint-disable */
// import './App.css';
// import React, { Suspense, lazy } from 'react';
import React, { useEffect } from 'react';
import './index.css';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import customAxios from './libs/api/axios';
import './sass/main.scss';
// import { login } from './redux/slices/userSlice';

// import Feed from './components/layout/Feed';
// import Footer from './components/Footer';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
// import Register from './pages/RegisterPage';
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
            <div style={{ height: '100vh' }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/register" element={<Register />} /> */}
                    {/* <Route path="/post" element={<NewPost />} />
                <Route path="/post/:id" element={<Blog />} />
                <Route path="/*" element={<NotFound />} />  */}
                </Routes>
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
            </div>
        </BrowserRouter>
    );
}

export default App;
