/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable
import '../auth.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useFormik } from 'formik';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/slices/userSlice';
import { ReactComponent as KaKaoIcon } from '../../../assets/images/kakaoLogin.svg';
import customAxios from '../../../libs/api/axios';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [handleLogin, setHandleLogin] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('이메일을 입력해 주세요.')
            .email('이메일 형식이 올바르지 않습니다.'),
        password: yup.string().required('비밀번호를 입력해 주세요.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });

    const onSubmit = values => {
        // reset();
        customAxios
            .post('auth/login', values)
            .then(response => {
                if (response.data.error) {
                    setHandleLogin(true);
                    setLoginMessage(response.data.error);
                } else {
                    // 로그인 정보 저장.
                    dispatch(loginSuccess(response.data));
                    navigate('/');
                }
            })
            .catch(() => {
                // console.log(error);
            });
    };

    const kakaoLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}auth/kakao`;
    };

    const handleLoginError = () => {
        return <span className="errors-message">{loginMessage}</span>;
    };

    return (
        <div className="auth">
            <div className="container">
                <div className="auth-title">
                    <span>로그인</span>
                </div>
                <button
                    onClick={() => {
                        kakaoLogin();
                    }}
                    type="button"
                    className="socialAuth-kakao"
                >
                    <KaKaoIcon width="30px" height="30px" />
                    <span>카카오 로그인</span>
                </button>
                <hr />
                {/* <div className="login-form"> */}
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="auth-input">
                        <p>이메일</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="이메일"
                            {...register('email')}
                            onClick={() => {
                                setHandleLogin(false);
                            }}
                        />
                        {errors.email && (
                            <span className="errors-message">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="auth-input">
                        <p>비밀번호</p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            {...register('password', { required: true })}
                            onClick={() => {
                                setHandleLogin(false);
                            }}
                        />
                        {!errors.password ? null : (
                            <span className="errors-message">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    {!handleLogin ? null : handleLoginError()}
                    <button type="submit">로그인</button>
                </form>
                {/* </div> */}
                <div className="link">
                    <Link to="/register">회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
