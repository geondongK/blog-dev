import {
    Box,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    styled,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import customAxios from '../libs/api/axios';

const CardBody = styled(CardContent)({
    paddingBottom: '0px',
    paddingTop: 10,
    paddingLeft: 70,
});

const CardBottom = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 70,
    gap: 5,
});

const StyledTypography = styled(Typography)({
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
});

function HomePageCard() {
    const navigate = useNavigate();

    // 게시물 출력.
    const [postList, setPostList] = useState([]);

    // 게시물 이동.
    const handleTitleClick = id => {
        // addViews();
        navigate(`/post/${id}`);
    };

    // 조회수 증가.
    const addViews = async id => {
        await customAxios.put(`/post/view/${id}`);
    };

    // 게시물 출력.
    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get('/post/postlist');
            setPostList(response.data);
            // console.log(response.data);
        };
        fetchPost();
    }, []);

    return (
        <div>
            {postList.map(row => (
                <Card sx={{ margin: 2, height: 150 }} key={row.id}>
                    <CardHeader
                        sx={{ paddingBottom: '0px' }}
                        avatar={<Avatar aria-label="recipe" />}
                        title={row.name}
                        subheader={moment(
                            row.create_date,
                            'YYYYMMDDHHmmss',
                        ).fromNow('YYYY-MM-DD HH:mm:ss')}
                    />
                    <CardBody>
                        <StyledTypography
                            onClick={() => {
                                handleTitleClick(row.id);
                                addViews(row.id);
                            }}
                        >
                            {row.title}
                        </StyledTypography>
                    </CardBody>
                    <CardBottom>
                        <ChatBubbleOutlineIcon fontSize="1rem" />
                        <RemoveRedEyeOutlinedIcon fontSize="1rem" />
                        <Typography>{`view ${row.view} `}</Typography>
                    </CardBottom>
                </Card>
            ))}
        </div>
    );
}

export default HomePageCard;
