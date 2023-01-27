/* eslint-disable no-alert */
/* eslint-disable no-console */
/*  eslint-disable */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as KaKaoIcon } from '../assets/images/kakaoLogin.svg';
import customAxios from '../libs/api/axios';

function RegisterPage() {
    const navigate = useNavigate();

    const [handleRegiter, setHandleRegiter] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');

    const schema = yup.object().shape({
        name: yup
            .string()
            .max(6, '별명은 최대 6자까지 입력할 수 있습니다.')
            .required('별명을 입력하세요.')
            .trim(''),
        email: yup
            .string()
            .required('이메일을 입력하세요.')
            .email('이메일 형식이 올바르지 않습니다.'),
        password: yup.string().required('비밀번호를 입력하세요.'),
        passwordConfirm: yup.string().required('비밀번호 확인을 입력하세요.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        mode: 'onChange',
    });

    const onSubmit = values => {
        // reset();
        customAxios
            .post('auth/register', values)
            .then(response => {
                if (response.data.error) {
                    setHandleRegiter(true);
                    setRegisterMessage(response.data.error);
                    console.log(response.data);
                } else {
                    window.alert('회원가입되었습니다.');
                    navigate('/login');
                    // console.log(response.data);
                    // 로그인 정보 저장.
                    // dispatch(
                    //     login({
                    //         id: response.data.id,
                    //         name: response.data.name,
                    //         isLoggedIn: true,
                    //     }),
                    // );
                    // navigate('/');
                }
            })
            .catch(() => {
                // console.log(error);
            });
    };

    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         password: '',
    //         passwordConfirm: '',
    //     },
    //     validationSchema: Yup.object({
    //         name: Yup.string()
    //             .max(6, '별명은 최대 6자까지 입력할 수 있습니다.')
    //             .required('별명을 입력하세요.')
    //             .trim(''),
    //         email: Yup.string()
    //             .required('이메일을 입력하세요.')
    //             .email('이메일 형식이 올바르지 않습니다.'),
    //         password: Yup.string().required('비밀번호를 입력하세요.'),
    //         passwordConfirm:
    //             Yup.string().required('비밀번호 확인을 입력하세요.'),
    //     }),
    //     // 클릭 시 빈값으로 보여지게 만들기.
    //     onSubmit: values => {
    //         setHandleRegiter(false);
    //         // handleValidate(values);
    //         customAxios
    //             .post('/api/register', values)
    //             .then(response => {
    //                 // handleValidate(values)
    //                 if (response.data.error) {
    //                     setHandleRegiter(true);
    //                     setRegisterMessage(response.data.error);
    //                     // console.log(response.data);
    //                 } else {
    //                     window.alert('회원가입되었습니다.');
    //                     navigate('/login');
    //                     // console.log(response.data);
    //                 }
    //             })
    //             .catch(() => {
    //                 // console.log(error);
    //             });
    //     },
    // });

    const kakaoRegister = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}auth/kakao`;
    };

    const handleRegisterError = () => {
        return <span className="errorsMessage">{registerMessage}</span>;
    };

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="register-title">
                    <span>회원가입</span>
                </div>
                <button
                    onClick={() => {
                        kakaoRegister();
                    }}
                    type="button"
                    className="socialRegister-kakao"
                >
                    <KaKaoIcon width="30px" height="30px" />
                    <span>카카오 회원가입</span>
                </button>
                <hr />
                {/* <div className="login-form"> */}
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="register-input">
                        <p>이메일</p>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="별명"
                            {...register('name', { required: true })}
                            onClick={() => {
                                setHandleRegiter(false);
                            }}
                        />
                        {errors.name && (
                            <span className="errorsMessage">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="register-input">
                        <p>이메일</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="이메일"
                            {...register('email', { required: true })}
                            onClick={() => {
                                setHandleRegiter(false);
                            }}
                        />
                        {errors.email && (
                            <span className="errorsMessage">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="register-input">
                        <p>비밀번호</p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            {...register('password', { required: true })}
                            onClick={() => {
                                setHandleRegiter(false);
                            }}
                        />
                        {errors.password && (
                            <span className="errorsMessage">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="register-input">
                        <p>비밀번호</p>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="비밀번호 확인"
                            {...register('passwordConfirm', { required: true })}
                            onClick={() => {
                                setHandleRegiter(false);
                            }}
                        />
                        {errors.passwordConfirm && (
                            <span className="errorsMessage">
                                {errors.passwordConfirm.message}
                            </span>
                        )}
                    </div>
                    {!handleRegiter ? null : handleRegisterError()}
                    <button type="submit">회원가입</button>
                </form>
                {/* </div> */}
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
