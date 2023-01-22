/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
//   eslint-disable
import React, { useEffect, useRef, useState } from 'react';
// useNavigate
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBars,
    faRightToBracket,
    // faRightFromBracket,
    faUserPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
// import customAxios from '../libs/api/axios';
// import { persistor } from '../redux/store/store';

function NavBar() {
    const checkedRef = useRef(false);
    const [search, setSearch] = useState('');
    const [checked, setChecked] = useState(true);

    console.log(search, setSearch);

    // const navigate = useNavigate();

    // 사용자 로그인 상태여부 체크.
    // const { currentUser } = useSelector(state => state.user);

    // 메뉴 오픈.
    // const [anchorEl, setAnchorEl] = useState(null);

    // const open = Boolean(anchorEl);
    // const handleClick = e => {
    //     setAnchorEl(e.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // persistor 세션 값삭 제.
    // const purge = async () => {
    //     await persistor.purge();
    // };

    // const onKeyPress = e => {
    //     if (e.key === 'Enter') {
    //         alert('hi');
    //     }
    // };

    // const handleLogout = () => {
    //     customAxios
    //         .post('/auth/logout', {})
    //         .then(() => {
    //             navigate('/');
    //             // header 입력
    //             // dispatch(logout({}))
    //             // window.location.reload();
    //         })
    //         .catch(() => {});
    // };

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
                        className="search-input"
                        type="search"
                        placeholder="검색"
                    />
                </div>
            </div>
            <div className="nav-right">
                <Link to="login">
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
                <Link to="register">
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
