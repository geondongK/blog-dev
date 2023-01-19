/* eslint-disable no-console */
/* eslint-disable react/prop-types */
//  eslint-disable
import {
    Typography,
    // makeStyles,
    Box,
    Menu,
    MenuItem,
    IconButton,
    Button,
    // Card,
    Paper,
    Stack,
    Container,
    Checkbox,
} from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import ReplyForm from './NestedCommentForm';
import Reply from './NestedComment';

// comment, replies
function Comment(props) {
    const {
        comment,
        replies,
        // isDeleted,
        addComment,
        deleteComment,
        updateComment,
        replyEditing,
        setReplyEditing,
        parentId = null,
    } = props;

    // const classes = useStyles();
    // const user = useSelector(state => state.user.value);
    // 대댓글 확인창.
    const [showReply, setShowReply] = useState(false);

    let replyButtonTitle = '댓글 숨기기';

    const handleShowReply = () => {
        setShowReply(!showReply);
    };

    if (!showReply) {
        replyButtonTitle = `${replies.length} 개의 댓글 보기`;
    } else {
        replyButtonTitle = '댓글 숨기기';
    }

    // Options창.
    const [anchorEl, setAnchorEl] = useState(null);

    const optionList = ['수정', '삭제'];

    // const handleClick = e => {
    //     setAnchorEl(e.currentTarget);
    // };

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    // 편집 & 삭제 로그인한 유저만 가능.
    // const canEdit = comment.user_id === user.id && !isDeleted;

    // 답글 클릭일 경우.
    const isReplying =
        replyEditing &&
        replyEditing.type === 'replying' &&
        replyEditing.id === comment.id;
    // 수정 클릭일 경우.
    const isEditing =
        replyEditing &&
        replyEditing.type === 'editing' &&
        replyEditing.id === comment.id;
    // parentID 전달.
    const replyId = parentId || comment.id;

    return (
        <Box sx={{ marginTop: 2 }}>
            <Paper sx={{ border: '1px solid gray' }} component={Container}>
                <Stack
                    // alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    mt={2}
                >
                    <Box display="flex">
                        <Typography variant="caption" display="block">
                            {comment.name} •
                        </Typography>
                        <Typography variant="caption" display="block">
                            &nbsp;{comment.create_date}
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
                {comment.is_deleted ? (
                    <Typography variant="caption">
                        삭제된 댓글 입니다.
                    </Typography>
                ) : (
                    <Typography variant="body2">
                        {comment.comment_body}
                    </Typography>
                )}
                {/* {!isEditing && <Typography>{comment.comments_body}</Typography>} */}
                {/* 댓글 수정 기능. */}
                <Box textAlign="right" sx={{ marginTop: 2 }}>
                    {isEditing && (
                        <ReplyForm
                            submitLabel="댓글 수정"
                            textLabel="댓글 수정"
                            handleCancelButton
                            initialText={comment.comment_body}
                            handleSubmit={newComment =>
                                updateComment(newComment, comment.id)
                            }
                            handleCancel={() => setReplyEditing()}
                        />
                    )}
                </Box>
                {/* 리플 확인. */}
                <Box>
                    {replies.length > 0 && (
                        <Button onClick={handleShowReply}>
                            <Typography variant="caption">
                                {replyButtonTitle}
                            </Typography>
                        </Button>
                    )}
                </Box>
                {/* 메뉴 옵션 */}
                <Box>
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
                                                id: comment.id,
                                                type: 'editing',
                                            });
                                        default:
                                            return deleteComment(
                                                comment.id,
                                                parentId,
                                            );
                                    }
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />}
                    />
                </IconButton>
                <IconButton>
                    <FavoriteBorder />
                </IconButton>
            </Paper>
            {/* 댓글 확인. */}
            {showReply && (
                <Box>
                    {replies.map(row => (
                        <Reply
                            key={row.id}
                            id={row.id}
                            name={row.name}
                            userId={row.user_id}
                            commentBody={row.comment_body}
                            createDate={row.create_date}
                            isDeleted={row.is_deleted}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            replyEditing={replyEditing}
                            setReplyEditing={setReplyEditing}
                            parentId={comment.id}
                        />
                    ))}
                </Box>
            )}
            {/* 답글 버튼 */}
            <Box textAlign="right">
                {/* {user.isLoggedIn && (
                    <Button
                        onClick={() => {
                            setReplyEditing({
                                id: comment.id,
                                type: 'replying',
                            });
                        }}
                    >
                        답글
                    </Button>
                )} */}
            </Box>
            {/* 답글 달기 버튼 */}
            <Box textAlign="right" sx={{ marginTop: 2 }}>
                {isReplying && (
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
                )}
            </Box>
        </Box>
    );
}

export default Comment;
