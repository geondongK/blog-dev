/* eslint-disable no-console */
import { Box, Fab, Tooltip } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const navigate = useNavigate();
    // const user = useSelector(state => state.user.value);

    const EditClick = () => {
        // if (!user.isLoggedIn) {
        navigate('/login');
        // } else {
        //     navigate('/post');
        // }
    };

    return (
        // <Box sx={{ textAlign: 'right', marginRight: 7 }}>
        <Box
            sx={{
                textAlign: 'right',
                marginRight: 7,
                // zIndex: 10,
                // paddingBottom: '5rem',
                // minHeight: '100vh',
            }}
        >
            <Tooltip
                onClick={() => {
                    EditClick();
                }}
                title="글작성"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    // marginBottom: '1rem',
                    // zIndex: 99,
                    // minHeight: '100vh',
                }}
            >
                <Fab color="primary" aria-label="edit">
                    <EditIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}

export default CreatePost;
