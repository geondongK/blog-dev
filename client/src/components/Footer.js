import { Box, Typography } from '@mui/material';
import React from 'react';

function Footer() {
    return (
        <Box
            sx={{
                // backgroundColor: '#e0e0e0',
                // borderTop: '1px solid #e0e0e0',
                textAlign: 'center',
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '100%',
                height: '5rem',
                paddingTop: 3,
                '@media (max-width: 900px)': {
                    paddingTop: 0,
                },
            }}
        >
            {/* align="center" */}
            <Typography variant="caption">
                © 2022. kimgeondong All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
