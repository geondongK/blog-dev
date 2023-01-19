import React from 'react';
import { Box, styled } from '@mui/material';

const Background = styled(Box)({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    background: '#ffffffb7',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

// const LoadingText = styled(Box)({
//     textAlign: 'center',
// });

const Image = styled(Box)({
    src: 'images/spinner.gif',
    width: '5%',
});

function Loading() {
    return (
        <Background>
            <img src="images/spinner.gif" width="5%" alt="로딩중" />
            <Image />
        </Background>
    );
}

export default Loading;
