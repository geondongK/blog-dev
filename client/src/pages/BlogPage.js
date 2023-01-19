// //  eslint-disable
// /* eslint-disable no-console */
// import { Paper, Container, Box } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// // useNavigate
// import { useParams, useNavigate } from 'react-router-dom';
// // useDispatch,
// import { useSelector } from 'react-redux';
// import customAxios from '../libs/api/axios';
// import AuthContext from '../libs/api/AuthContext';
// import Comments from '../components/Comment';
// import CommentsForm from '../components/CommentForm';
// import Post from '../components/Blog/Post/Post';

// function BlogPage() {
//     const { id } = useParams();

//     const user = useSelector(state => state.user.value);
//     // const classes = useStyles();
//     const navigate = useNavigate();

//     // 현재 게시물
//     const [postList, setPostList] = useState([]);
//     // 댓글 리스트
//     const [commentsList, setCommentsList] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     // 답글 작성 및 편집.
//     const [replyEditing, setReplyEditing] = useState(null);

//     // 댓글 조회
//     const commentList = commentsList.filter(
//         getCommentsList =>
//             getCommentsList.parent_id === null ||
//             getCommentsList.is_deleted === true,
//     );

//     // 대댓글 조회
//     const getReplies = commentId => {
//         return commentsList.filter(
//             getReplyComment => getReplyComment.parent_id === commentId,
//         );
//     };

//     // 댓글 작성.
//     // eslint-disable-next-line no-unused-vars
//     const addComment = (newComment, parentId) => {
//         if (!user.isLoggedIn) {
//             navigate('/login');
//         } else {
//             AuthContext.post('/api/comments', {
//                 posts_id: id,
//                 comments_body: newComment,
//                 parentId,
//             })
//                 .then(response => {
//                     // console.log(newComment, parentId);
//                     const setAddComment = {
//                         posts_id: id,
//                         comments_body: newComment,
//                         create_date: response.data.create_date,
//                         name: response.data.name,
//                         user_id: response.data.id,
//                     };
//                     setCommentsList([...commentsList, setAddComment]);
//                     setIsLoading(true);
//                     setReplyEditing(null);
//                 })
//                 .catch(() => {
//                     // console.log(error);
//                 });
//         }
//     };

//     // 댓글 & 답글 삭제 기능
//     const deleteComment = async (commentId, parentId) => {
//         // eslint-disable-next-line no-alert
//         if (window.confirm('댓글을 삭제하시겠습니까?')) {
//             await customAxios
//                 .post(`/api/comments/commentDelete`, {
//                     commentId,
//                     parentId,
//                 })
//                 .then(() => {
//                     const newComments = commentsList.filter(
//                         comment => comment.id !== commentId,
//                     );
//                     setCommentsList(newComments);
//                     setIsLoading(true);
//                 })
//                 .catch(() => {
//                     // console.log(error);
//                 });
//         }
//     };

//     // 댓글 & 답글 수정 기능
//     const updateComment = async (newComment, commentId) => {
//         await customAxios
//             .put(`/api/comments/editReply`, {
//                 newComment,
//                 commentId,
//             })
//             .then(() => {
//                 const updateComments = commentsList.map(commentLists => {
//                     if (commentLists.id === commentId) {
//                         return {
//                             ...commentLists,
//                             body: newComment,
//                         };
//                     }
//                     return commentLists;
//                 });

//                 setCommentsList(updateComments);
//                 setReplyEditing(null);
//                 setIsLoading(true);
//             })
//             .catch(() => {
//                 // console.log(error);
//             });
//     };

//     useEffect(() => {
//         // 현재 게시물 내용
//         customAxios
//             .get(`/api/posts/getId/${id}`)
//             .then(response => {
//                 setPostList(...response.data);
//             })
//             .catch(() => {
//                 // console.log(error);
//             });

//         // 댓글 리스트
//         if (isLoading) {
//             customAxios
//                 .get(`/api/comments/${id}`)
//                 .then(response => {
//                     // console.log(response.data);
//                     setCommentsList(response.data);
//                     setIsLoading(false);
//                     // console.log(response.data.is_deleted);
//                 })
//                 .catch(() => {
//                     // console.log(error);
//                 });
//         }
//     }, [isLoading]);

//     return (
//         // <Container component="main" className={classes.root} maxWidth="lg">
//         // className={classes.root}
//         <Paper
//             component={Container}
//             sx={{
//                 padding: '30px 20px',
//                 marginTop: 2,
//                 '@media (max-width: 900px)': {
//                     marginTop: 0,
//                 },
//             }}
//         >
//             <Post
//                 title={postList.title}
//                 name={postList.name}
//                 body={postList.body}
//                 createDate={postList.create_date}
//             />
//             {commentList.map(row => (
//                 <Comments
//                     key={row.id}
//                     comment={row}
//                     replies={getReplies(row.id)}
//                     isDeleted={row.is_deleted}
//                     addComment={addComment}
//                     deleteComment={deleteComment}
//                     updateComment={updateComment}
//                     replyEditing={replyEditing}
//                     setReplyEditing={setReplyEditing}
//                 />
//             ))}
//             {user.isLoggedIn ? (
//                 <Box textAlign="right" sx={{ marginTop: 2 }}>
//                     <CommentsForm
//                         handleSubmit={addComment}
//                         submitLabel="댓글 작성"
//                         textLabel="댓글"
//                     />
//                 </Box>
//             ) : (
//                 <Box textAlign="right" sx={{ marginTop: 2 }}>
//                     <CommentsForm
//                         handleSubmit={addComment}
//                         submitLabel="댓글 작성"
//                         textLabel="로그인을 하셔야 댓글 작성이 가능합니다."
//                     />
//                 </Box>
//             )}
//         </Paper>
//     );
// }

// export default BlogPage;
