/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
//  eslint-disable
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBars,
    faRightToBracket,
    faRightFromBracket,
    faUserPlus,
    faXmark,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { searchSuccess } from '../redux/slices/searchSlice';

import customAxios from '../libs/api/axios';
import { persistor } from '../redux/store/store';

function NavBar() {
    const checkedRef = useRef(false);
    const [q, SetQ] = useState('');
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();

    // console.log(search, setSearch);

    const navigate = useNavigate();

    // 사용자 로그인 상태여부 체크.
    const { currentUser } = useSelector(state => state.user);

    // persistor 세션 값삭 제.
    const purge = async () => {
        await persistor.purge();
    };

    const onKeyDown = e => {
        if (e.key === 'Enter') {
            if (q.length >= 1) {
                dispatch(searchSuccess(q));
                navigate(`/search?q=${q}`);
            }
        }
    };

    const handleLogout = () => {
        customAxios
            .post('/auth/logout', {})
            .then(() => {
                navigate('/');
                // header 입력
                // dispatch(logout({}))
                // window.location.reload();
            })
            .catch(() => {});
    };

    const handleChecked = () => {
        setChecked(!checked);
        checkedRef.current.checked = checked;
    };

    useEffect(() => {
        // console.log(currentUser);
    }, [checked]);

    return (
        <nav className="navbar">
            <input
                onClick={() => {
                    handleChecked();
                }}
                ref={checkedRef}
                type="checkbox"
                id="nav-menu"
            />
            <div className="nav-left">
                <Link to="/">
                    <button
                        onClick={() => {
                            checkedRef.current.checked = false;
                            setChecked(true);
                        }}
                        className="nav-logo"
                        type="button"
                    >
                        Blog
                    </button>
                </Link>
                <div className="search-bar">
                    <i className="search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </i>
                    <input
                        onKeyDown={onKeyDown}
                        onChange={e => SetQ(e.target.value)}
                        className="search-input"
                        type="search"
                        placeholder="검색"
                    />
                </div>
            </div>
            {!currentUser ? (
                <div className="nav-right">
                    <Link to="/login">
                        <button onClick={handleChecked} type="button">
                            <i>
                                <FontAwesomeIcon
                                    className="right-icon"
                                    icon={faRightToBracket}
                                />
                            </i>
                            로그인
                        </button>
                    </Link>
                    <Link to="/register">
                        <button onClick={handleChecked} type="button">
                            <i>
                                <FontAwesomeIcon
                                    className="right-icon"
                                    icon={faUserPlus}
                                />
                            </i>
                            회원가입
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="nav-right">
                    <Link to="/add">
                        <button onClick={handleChecked} type="button">
                            <i>
                                <FontAwesomeIcon
                                    className="right-icon"
                                    icon={faPenToSquare}
                                />
                            </i>
                            글작성
                        </button>
                    </Link>

                    <button
                        onClick={() => {
                            handleLogout();
                            purge();
                            handleChecked();
                        }}
                        type="button"
                    >
                        <i>
                            <FontAwesomeIcon
                                className="right-icon"
                                icon={faRightFromBracket}
                            />
                        </i>
                        로그아웃
                    </button>
                </div>
            )}
            {!checkedRef.current.checked ? (
                <label htmlFor="nav-menu">
                    <FontAwesomeIcon icon={faBars} />
                </label>
            ) : (
                <label htmlFor="nav-menu">
                    <FontAwesomeIcon icon={faXmark} />
                </label>
            )}
        </nav>
    );
}

export default NavBar;
