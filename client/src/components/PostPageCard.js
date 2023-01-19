/* eslint-disable react/prop-types */
import { Typography, Divider, Grid, Box } from '@mui/material';
import React from 'react';

function PostPageCard(props) {
    const { title, name, createDate, body } = props;

    // const classes = useStyles();

    return (
        <Box>
            <Box>
                <Box display="flex">
                    <Typography variant="caption" display="block">
                        {name} •
                    </Typography>
                    <Typography variant="caption" display="block">
                        &nbsp;{createDate}
                    </Typography>
                </Box>
            </Box>
            <Typography sx={{ marginTop: 2 }} variant="h6">
                {title}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Grid>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {body}
                </Typography>
            </Grid>
            <Divider sx={{ marginTop: 2 }} />
        </Box>
    );
}

export default PostPageCard;
