//  eslint-disable
import {
    Box,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import customAxios from '../libs/api/axios';

const Container = styled(Box)({
    // backgroundColor: '#f5f5f5',
    height: '100vh',
});

const Wrapper = styled(Box)({
    paddingRight: '100px',
    paddingLeft: '100px',
    '@media (max-width: 900px)': {
        paddingRight: '15px',
        paddingLeft: '15px',
    },
});

const StyledTypography = styled(Typography)({
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    '&:hover': {
        color: '#3f51b5',
    },
});

function Feed() {
    const navigate = useNavigate();

    // 게시물 출력.
    const [postList, setPostList] = useState([]);

    // 게시물 이동.
    const handleTitleClick = id => {
        navigate(`/post/${id}`);
    };

    // 게시물 출력.
    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get('/post');
            setPostList(response.data);
        };
        fetchPost();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Box>분류</Box>
                {postList.map(row => (
                    <Card sx={{ marginTop: 2 }} key={row.id}>
                        <CardHeader
                            avatar={<Avatar aria-label="recipe" />}
                            title={row.name}
                            subheader={row.create_date}
                        />
                        <CardContent>
                            <StyledTypography
                                onClick={() => {
                                    handleTitleClick(row.id);
                                }}
                            >
                                {row.title}
                            </StyledTypography>
                        </CardContent>
                        <CardActions disableSpacing />
                    </Card>
                ))}
                <CreatePost />
            </Wrapper>
        </Container>
    );
}

export default Feed;
