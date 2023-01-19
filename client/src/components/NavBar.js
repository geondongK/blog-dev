/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable */
import {
    // AppBar,
    // Toolbar,
    Button,
    // styled,
    // Typography,
    // Menu,
    // IconButton,
    // MenuItem,
    // InputBase,
} from '@mui/material';

// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import customAxios from '../libs/api/axios';
import { persistor } from '../redux/store/store';

// const Container = styled.div`
//     width: 100px;
// `;

// const Wrapper = styled.div`
//     width: 100px;
// `;

// const Search = styled.div`
//     width: 100px;
// `;

// const StyledButton = styled(Button)`
//     color: '#9e9e9e';
//     &:hover {
//         background-color: '#e0e0e0';
//     }
// `;

// const StyledAppbar = styled(AppBar)({
//     position: 'sticky',
//     height: '56px',
//     backgroundColor: 'white',
//     borderBottom: '0.1px solid #e0e0e0',
//     paddingRight: '250px',
//     paddingLeft: '250px',
//     '@media (max-width: 900px)': {
//         paddingLeft: 0,
//         paddingRight: 0,
//     },
// });

// const StyledToolbar = styled(Toolbar)({
//     // position: 'static',
//     display: 'flex',
//     alignItems: 'center',
//     // justifyContent: 'space-between',
//     // justifyContent: 'flex-end',
//     bottom: 5,
// });

// const StyledButton = styled(Button)({
//     color: '#9e9e9e',
//     '&:hover': {
//         backgroundColor: '#e0e0e0',
//     },
//     '@media (max-width: 900px)': {
//         '&:hover': {
//             backgroundColor: 'transparent',
//             color: 'transparent',
//         },
//     },
// });

// const Search = styled('div')({
//     // position: 'absolute',
//     display: 'flex',
//     // left: '120px',
//     // alignItems: 'center',
//     width: 350,
//     height: 35,
//     borderRadius: 10,
//     float: 'left',
//     border: '1px solid grey',
//     '@media (max-width: 900px)': {
//         left: '100px',
//         width: 200,
//         height: 30,
//     },
//     // '&:active': {
//     //     border: '1px solid blue',
//     // },
// });

// const NavRight = styled('div')(({ theme }) => ({
//     display: 'none',
//     // position: 'absolute',
//     // alignItems: 'right',
//     // float: 'right',
//     // right: '10px',
//     color: '#9e9e9e',
//     [theme.breakpoints.up('sm')]: {
//         display: 'flex',
//     },
// }));

// const MobileNav = styled('div')(({ theme }) => ({
//     display: 'flex',
//     position: 'absolute',
//     alignItems: 'center',
//     gap: '10px',
//     right: '20px',
//     color: '#9e9e9e',
//     [theme.breakpoints.up('sm')]: {
//         display: 'none',
//     },
// }));

function NavBar() {
    const [search, setSearch] = useState('');

    console.log(search);

    const navigate = useNavigate();

    // 사용자 로그인 상태여부 체크.
    const { currentUser } = useSelector(state => state.user);

    // 메뉴 오픈.
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // persistor 세션 값삭 제.
    const purge = async () => {
        await persistor.purge();
    };

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            alert('hi');
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

    useEffect(() => {
        // console.log(currentUser);
    }, []);

    return (
        <div>hi</div>
        // <StyledAppbar elevation={0}>
        //     <StyledToolbar>
        //         <StyledButton component={Link} to="/">
        //             <Typography variant="button" color="textSecondary">
        //                 BLOG DEV
        //             </Typography>
        //         </StyledButton>
        //         <Search>
        //             <InputBase
        //                 fullWidth
        //                 placeholder="검색"
        //                 onChange={e => setSearch(e.target.value)}
        //                 onKeyPress={onKeyPress}
        //                 sx={{ padding: '5px' }}
        //             />
        //             <IconButton
        //                 id="demo-positioned-menu"
        //                 aria-labelledby="demo-positioned-button"
        //                 // onClick={handleClick}
        //             >
        //                 <SearchIcon />
        //             </IconButton>
        //         </Search>
        //         <NavRight>
        //             {!currentUser ? (
        //                 <>
        //                     <StyledButton
        //                         variant="text"
        //                         component={Link}
        //                         to="/signup"
        //                     >
        //                         <Typography>회원가입</Typography>
        //                     </StyledButton>
        //                     <StyledButton
        //                         variant="text"
        //                         disableRipple
        //                         component={Link}
        //                         to="/login"
        //                     >
        //                         <Typography>로그인</Typography>
        //                     </StyledButton>
        //                 </>
        //             ) : (
        //                 <StyledButton
        //                     variant="text"
        //                     onClick={async () => {
        //                         await handleLogout();
        //                         await setTimeout(() => purge(), 200);
        //                     }}
        //                 >
        //                     로그아웃
        //                 </StyledButton>
        //             )}
        //         </NavRight>
        //         <MobileNav>
        //             <IconButton
        //                 id="demo-positioned-menu"
        //                 aria-labelledby="demo-positioned-button"
        //                 onClick={handleClick}
        //             >
        //                 <MenuIcon />
        //             </IconButton>
        //             <Menu
        //                 id="demo-positioned-menu"
        //                 aria-labelledby="demo-positioned-button"
        //                 anchorEl={anchorEl}
        //                 getcontentanchorel={null}
        //                 open={open}
        //                 onClose={handleClose}
        //                 onClick={handleClose}
        //                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //                 transformOrigin={{
        //                     vertical: 'top',
        //                     horizontal: 'right',
        //                 }}
        //             >
        //                 <div>
        //                     {!currentUser ? (
        //                         <>
        //                             <MenuItem component={Link} to="login">
        //                                 로그인
        //                             </MenuItem>
        //                             <MenuItem component={Link} to="signup">
        //                                 회원가입
        //                             </MenuItem>
        //                         </>
        //                     ) : (
        //                         <MenuItem
        //                             onClick={async () => {
        //                                 await handleLogout();
        //                                 await setTimeout(() => purge(), 200);
        //                             }}
        //                         >
        //                             로그아웃
        //                         </MenuItem>
        //                     )}
        //                 </div>
        //             </Menu>
        //         </MobileNav>
        //     </StyledToolbar>
        // </StyledAppbar>
    );
}

export default NavBar;
