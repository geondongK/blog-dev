/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// eslint-disableㅜ
import {
    Typography,
    // IconButton,
    Menu,
    MenuItem,
    Box,
    Paper,
    Stack,
    Container,
    // Button,
} from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import ReplyForm from './NestedCommentForm';

function NestedComment(props) {
    const {
        id,
        name,
        // userId,
        createDate,
        commentBody,
        // addComment,
        deleteComment,
        updateComment,
        replyEditing,
        setReplyEditing,
        isDeleted,
        parentId = null,
    } = props;

    // const user = useSelector(state => state.user.value);

    // Options창.
    const [anchorEl, setAnchorEl] = useState(null);

    // Options 리스트
    const optionList = ['수정', '삭제'];

    // const handleClick = e => {
    //     setAnchorEl(e.currentTarget);
    // };

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    // 편집 & 삭제 작성자만 편집가능.
    // const canEdit = userId === user.id && !isDeleted;

    // 답글 클릭일 경우.
    // const isReplying =
    //     replyEditing &&
    //     replyEditing.type === 'replying' &&
    //     replyEditing.id === id;
    // 수정 클릭일 경우.
    const isEditing =
        replyEditing &&
        replyEditing.type === 'editing' &&
        replyEditing.id === id;
    // id 전달.
    const replyId = parentId || id;

    return (
        <Box sx={{ marginTop: 2 }}>
            <Paper
                sx={{
                    width: 'auto',
                    marginLeft: 6.5,
                    border: '1px solid gray',
                    // '@media (max-width: 900px)': {
                    //     width: 'auto',
                    //     // marginLeft: 6.5,
                    // },
                }}
                component={Container}
            >
                <Stack
                    // alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    mt={2}
                >
                    <Box display="flex">
                        <Typography variant="caption" display="block">
                            {name} •
                        </Typography>
                        <Typography variant="caption" display="block">
                            &nbsp;{createDate}
                        </Typography>
                    </Box>
                    {/* 편집 기능. */}
                    {/* {canEdit && (
                        <IconButton
                            aria-label="more"
                            onClick={handleClick}
                            aria-haspopup="true"
                            aria-controls="long-menu"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    )} */}
                </Stack>
                {/* 댓글 존재 삭제 시 확인기능.  */}
                {isDeleted ? (
                    <Typography variant="caption">
                        삭제된 댓글 입니다.
                    </Typography>
                ) : (
                    <Typography variant="body2">{commentBody}</Typography>
                )}
                <Box>
                    {/* 메뉴 옵션 리스트. */}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        onClose={handleClose}
                        open={open}
                        onClick={handleClose}
                    >
                        {optionList.map(option => (
                            <MenuItem
                                key={option}
                                onClick={() => {
                                    switch (option) {
                                        case '수정':
                                            return setReplyEditing({
                                                id,
                                                type: 'editing',
                                            });
                                        default:
                                            return deleteComment(id, replyId);
                                    }
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                    {/* 답글 달기 기능. */}
                    {/* <Box>
                        <Button
                            onClick={() => {
                                setReplyEditing({ id, type: 'replying' });
                            }}
                        >
                            답글
                        </Button>
                    </Box> */}
                    {/* {isReplying && (
                    <ReplyForm
                        submitLabel="답글"
                        textLabel="답글 달기"
                        handleCancelButton
                        // eslint-disable-next-line no-undef
                        handleSubmit={newComment =>
                            addComment(newComment, replyId)
                        }
                        handleCancel={() => setReplyEditing()}
                    />
                )} */}
                </Box>
                {/* 댓글 수정 기능. */}
                <Box textAlign="right" sx={{ marginTop: 2 }}>
                    {isEditing && (
                        <ReplyForm
                            submitLabel="댓글 수정"
                            textLabel="댓글 수정"
                            handleCancelButton
                            initialText={commentBody}
                            handleSubmit={newComment =>
                                updateComment(newComment, id)
                            }
                            handleCancel={() => setReplyEditing()}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
}

export default NestedComment;
