/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
// eslint-disable
import '../auth.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as KaKaoIcon } from '../../../assets/images/kakaoLogin.svg';
import customAxios from '../../../libs/api/axios';

function Register() {
    const navigate = useNavigate();

    const [handleRegiter, setHandleRegiter] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');

    const schema = yup.object().shape({
        name: yup
            .string()
            .max(6, '별명은 최대 6자까지 입력할 수 있습니다.')
            .required('별명을 입력해 주세요.')
            .trim(''),
        email: yup
            .string()
            .required('이메일을 입력해 주세요.')
            .email('이메일 형식이 올바르지 않습니다.'),
        password: yup.string().required('비밀번호를 입력해 주세요.'),
        passwordConfirm: yup
            .string()
            .required('비밀번호 확인을 입력해 주세요.'),
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
        mode: 'onSubmit',
    });

    const onSubmit = values => {
        // reset();
        customAxios
            .post('auth/register', values)
            .then(response => {
                if (response.data.error) {
                    setHandleRegiter(true);
                    setRegisterMessage(response.data.error);
                } else {
                    window.alert('회원가입되었습니다.');
                    navigate('/login');
                }
            })
            .catch(() => {
                // console.log(error);
            });
    };

    const kakaoRegister = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}auth/kakao`;
    };

    const handleRegisterError = () => {
        return <span className="errors-message">{registerMessage}</span>;
    };

    return (
        <div className="auth">
            <div className="container">
                <div className="auth-title">
                    <span>회원가입</span>
                </div>
                <button
                    onClick={() => {
                        kakaoRegister();
                    }}
                    type="button"
                    className="socialAuth-kakao"
                >
                    <KaKaoIcon width="30px" height="30px" />
                    <span>카카오 회원가입</span>
                </button>
                <hr />
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="auth-input">
                        <p>별명</p>
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
                            <span className="errors-message">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="auth-input">
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
                                setHandleRegiter(false);
                            }}
                        />
                        {errors.password && (
                            <span className="errors-message">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="auth-input">
                        <p>비밀번호 확인</p>
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
                            <span className="errors-message">
                                {errors.passwordConfirm.message}
                            </span>
                        )}
                    </div>
                    {!handleRegiter ? null : handleRegisterError()}
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
