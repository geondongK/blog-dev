/* eslint-disable no-alert */
/* eslint-disable no-console */
/*  eslint-disable */

import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Container,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import customAxios from '../libs/api/axios';

function RegisterPage() {
    const navigate = useNavigate();

    const [handleRegiter, setHandleRegiter] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(6, '별명은 최대 6자까지 입력할 수 있습니다.')
                .required('별명을 입력하세요.')
                .trim(''),
            email: Yup.string()
                .required('이메일을 입력하세요.')
                .email('이메일 형식이 올바르지 않습니다.'),
            password: Yup.string().required('비밀번호를 입력하세요.'),
            passwordConfirm:
                Yup.string().required('비밀번호 확인을 입력하세요.'),
        }),
        // 클릭 시 빈값으로 보여지게 만들기.
        onSubmit: values => {
            setHandleRegiter(false);
            // handleValidate(values);
            customAxios
                .post('/api/register', values)
                .then(response => {
                    // handleValidate(values)
                    if (response.data.error) {
                        setHandleRegiter(true);
                        setRegisterMessage(response.data.error);
                        // console.log(response.data);
                    } else {
                        window.alert('회원가입되었습니다.');
                        navigate('/login');
                        // console.log(response.data);
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

    const handleRegisterError = () => {
        return (
            <Typography style={{ color: 'red' }}>{registerMessage}</Typography>
        );
    };

    // const { values, touched, errors, handleChange, handleSubmit } = formik;
    const { touched, errors } = formik;

    return (
        <div className="login-container">
            <div className="login-form">
                <span className="login-title">회원가입</span>
                <div className="socialLogin-kakao">
                    <img width="30px" src="images/kakaoLogin.png" />
                    <span>카카오 로그인</span>
                </div>
                <hr />
                <form>
                    <div className="login-input">
                        <p>별명</p>
                        <input type="text" placeholder="별명" />
                    </div>
                    <div className="login-input">
                        <p>이메일</p>
                        <input type="email" placeholder="이메일" />
                    </div>
                    <div className="login-input">
                        <p>비밀번호</p>
                        <input type="password" placeholder="비밀번호" />
                    </div>
                    <div className="login-input">
                        <p>비밀번호 확인</p>
                        <input type="password" placeholder="비밀번호 확인" />
                    </div>
                    <button type="submit">회원가입</button>
                </form>
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
        //         justifyContent: 'center',
        //         '@media (max-width: 900px)': {
        //             boxShadow: 'none',
        //             width: 'auto',
        //             height: 500,
        //             marginTop: 0,
        //         },
        //     }}
        // >
        //     <Typography
        //         component="h1"
        //         variant="h5"
        //         // className={classes.typography}
        //     >
        //         회원가입
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
        //             margin="normal"
        //             // label="별명"
        //             label={
        //                 touched.name && Boolean(errors.name) === true
        //                     ? touched.name && errors.name
        //                     : '별명'
        //             }
        //             id="name"
        //             name="name"
        //             type="name"
        //             autoFocus
        //             value={formik.values.name}
        //             error={touched.name && Boolean(errors.name)}
        //             // helperText={touched.name && errors.name}
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleRegiter(false);
        //             }}
        //         />
        //         <TextField
        //             variant="outlined"
        //             margin="normal"
        //             fullWidth
        //             // label="이메일"
        //             label={
        //                 touched.email && Boolean(errors.email) === true
        //                     ? touched.email && errors.email
        //                     : '이메일'
        //             }
        //             name="email"
        //             id="email"
        //             type="email"
        //             value={formik.values.email}
        //             error={touched.email && Boolean(errors.email)}
        //             // helperText={touched.email && errors.email}
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleRegiter(false);
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
        //             // helperText={touched.password && errors.password}
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleRegiter(false);
        //             }}
        //         />
        //         <TextField
        //             variant="outlined"
        //             margin="normal"
        //             fullWidth
        //             // label="비밀번호 확인"
        //             label={
        //                 touched.passwordConfirm &&
        //                 Boolean(errors.passwordConfirm) === true
        //                     ? touched.passwordConfirm && errors.passwordConfirm
        //                     : '비밀번호 확인'
        //             }
        //             name="passwordConfirm"
        //             id="passwordConfirm"
        //             type="password"
        //             value={formik.values.passwordConfirm}
        //             error={
        //                 touched.passwordConfirm &&
        //                 Boolean(errors.passwordConfirm)
        //             }
        //             // helperText={
        //             //     touched.passwordConfirm && errors.passwordConfirm
        //             // }
        //             onChange={formik.handleChange}
        //             onClick={() => {
        //                 setHandleRegiter(false);
        //             }}
        //         />
        //         <Box sx={{ textAlign: 'left' }}>
        //             {!handleRegiter ? null : handleRegisterError()}
        //         </Box>
        //         <Button
        //             type="submit"
        //             fullWidth
        //             color="primary"
        //             variant="contained"
        //             // className={classes.submit}
        //         >
        //             회원가입
        //         </Button>
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
        //             },
        //         }}
        //         src="images/kakao_login_medium_narrow.png"
        //     />
        // </Paper>
    );
}

export default RegisterPage;
