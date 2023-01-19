/*  eslint-disable */
/* eslint-disable no-console */
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    // Avatar,
    Paper,
    Container,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
import customAxios from '../libs/api/axios';
import '../sass/main.scss';
// import { login } from '../redux/slices/userSlice';

function LoginPage() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [handleLogin, setHandleLogin] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            // 이메일 변경.
            email: Yup.string()
                .required('이메일을 입력하세요.')
                .email('이메일 형식이 올바르지 않습니다.'),
            password: Yup.string().required('비밀번호를 입력하세요.'),
        }),
        onSubmit: values => {
            setHandleLogin(false);
            customAxios
                .post('/api/login', values)
                .then(response => {
                    if (response.data.error) {
                        setHandleLogin(true);
                        setLoginMessage(response.data.error);
                    } else {
                        // 로그인 정보 저장.
                        // dispatch(
                        //     login({
                        //         id: response.data.id,
                        //         name: response.data.name,
                        //         isLoggedIn: true,
                        //     }),
                        // );
                        navigate('/');
                    }
                })
                .catch(() => {
                    // console.log(error);
                });
        },
    });

    const kakaoLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/kakao`;
    };

    const handLoginError = () => {
        return <Typography style={{ color: 'red' }}>{loginMessage}</Typography>;
    };

    // const { values, touched, errors, handleChange, handleSubmit } = formik;
    const { touched, errors } = formik;

    return (
        <div className="login-container">
            <div className="login-form">
                <span className="login-title">로그인</span>
                <div className="socialLogin-kakao">
                    <img width="30px" src="images/kakaoLogin.png" />
                    <span>카카오 로그인</span>
                </div>
                <hr />
                <form>
                    <div className="login-input">
                        <p>이메일</p>
                        <input type="email" placeholder="이메일" />
                    </div>
                    <div className="login-input">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호" />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <a className="login-link" href="*">
                    회원가입
                </a>
            </div>
        </div>

        // <Paper
        //     component={Container}
        //     elevation={3}
        //     onSubmit={formik.handleSubmit}
        //     sx={{
        //         width: 680,
        //         height: 580,
        //         marginTop: 3,
        //         display: 'flex',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         '@media (max-width: 900px)': {
        //             boxShadow: 'none',
        //             width: 'auto',
        //             height: 500,
        //             marginTop: 0,
        //         },
        //     }}
        // >
        //     <Typography
        //         sx={{
        //             textAlign: 'center',
        //             paddingTop: 8,
        //             '@media (max-width: 900px)': {
        //                 paddingTop: 2,
        //             },
        //         }}
        //         component="h1"
        //         variant="h5"
        //     >
        //         로그인
        //     </Typography>
        //     <Box
        //         sx={{
        //             mt: 1,
        //             textAlign: 'center',
        //             width: 600,
        //             '@media (max-width: 900px)': {
        //                 width: 'auto',
        //             },
        //         }}
        //         component="form"
        //         noValidate
        //         autoComplete="off"
        //     >
        //         <TextField
        //             variant="outlined"
        //             fullWidth
        //             // label="이메일"
        //             label={
        //                 touched.email && Boolean(errors.email) === true
        //                     ? touched.email && errors.email
        //                     : '이메일'
        //             }
        //             autoFocus
        //             id="email"
        //             name="email"
        //             type="email"
        //             value={formik.values.email}
        //             error={touched.email && Boolean(errors.email)}
        //             // helperText={touched.email && errors.email}
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleLogin(false);
        //             }}
        //         />
        //         <TextField
        //             variant="outlined"
        //             margin="normal"
        //             fullWidth
        //             // label="비밀번호"
        //             label={
        //                 touched.password && Boolean(errors.password) === true
        //                     ? touched.password && errors.password
        //                     : '비밀번호'
        //             }
        //             name="password"
        //             id="password"
        //             type="password"
        //             value={formik.values.password}
        //             error={touched.password && Boolean(errors.password)}
        //             // helperText={touched.email && errors.password}
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleLogin(false);
        //             }}
        //         />
        //         <Box sx={{ textAlign: 'left' }}>
        //             {!handleLogin ? null : handLoginError()}
        //         </Box>
        //         <Button
        //             type="submit"
        //             fullWidth
        //             color="primary"
        //             variant="contained"
        //         >
        //             로그인
        //         </Button>
        //         <Grid container justifyContent="flex-end">
        //             <Grid item>
        //                 <Button
        //                     variant="text"
        //                     component={Link}
        //                     to="/register"
        //                     sx={{
        //                         color: '#9e9e9e',
        //                         '&:hover': {
        //                             backgroundColor: 'transparent',
        //                             // color: 'none',
        //                         },
        //                     }}
        //                 >
        //                     회원가입
        //                 </Button>
        //             </Grid>
        //         </Grid>
        //     </Box>
        //     <Box
        //         component="img"
        //         onClick={() => {
        //             kakaoLogin();
        //         }}
        //         sx={{
        //             paddingTop: 2,
        //             width: 'auto',
        //             '&:hover': {
        //                 cursor: 'pointer',
        //                 // color: 'none',
        //             },
        //         }}
        //         src="images/kakao_login_medium_narrow.png"
        //     />
        // </Paper>
    );
}

export default LoginPage;
