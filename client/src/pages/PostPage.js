/*  eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Postcontent from '../components/PostContent/postContent';
import PostComments from '../components/commtents/Comment';
import PostCommentForm from '../components/commtents/CommentForm';
import customAxios from '../libs/api/axios';
import authContext from '../libs/api/AuthContext';
import moment from 'moment';
import 'moment/locale/ko';

function PostPage() {
    // 게시물 내용.
    const [postcontents, setPostcontents] = useState([]);
    // 게시물 댓글.
    const [postComments, setPostComments] = useState([]);
    // 답글 작성 및 편집.
    const [activeComment, setActiveComment] = useState(null);

    // 현재시간.
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

    // 사용자 로그인 상태여부 체크.
    const { currentUser } = useSelector(state => state.user);

    const { id } = useParams();

    // 댓글 조회.
    const postComment = postComments.filter(
        getPostComments => getPostComments.parentId === null,
    );

    // 대댓글 조회.
    const getNestedComments = commentId => {
        return postComments.filter(
            getNestedComment => getNestedComment.parentId === commentId,
        );
    };

    // 댓글 or 대댓글 작성.
    const addComment = async (newComment, parentId) => {
        await authContext
            .post('/comment', {
                id: null,
                postId: id,
                description: newComment,
                userName: currentUser.user.name,
                parentId,
                createDate: nowTime,
            })
            .then(response => {
                setPostComments([...postComments, response.data]);
                setActiveComment(null);
            })
            .catch(() => {
                // console.log(error);
            });
    };

    // 댓글 & 답글 수정 기능
    const editComment = async (newComment, commentId) => {
        await customAxios
            .put(`/comment`, {
                newComment,
                commentId,
            })
            .then(() => {
                const updateComments = postComments.map(postComment => {
                    if (postComment.id === commentId) {
                        return {
                            ...postComment,
                            description: newComment,
                        };
                    }
                    return postComment;
                });
                setPostComments(updateComments);
                setActiveComment(null);
            })
            .catch(() => {
                // console.log(error);
            });
    };

    // 댓글 & 답글 삭제 기능
    const deleteComment = async commentId => {
        // eslint-disable-next-line no-alert
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            await customAxios
                .delete(`/comment`, {
                    data: {
                        commentId,
                    },
                })
                .then(() => {
                    const newComments = postComments.filter(
                        postComment => postComment.id !== commentId,
                    );
                    setPostComments(newComments);
                })
                .catch(() => {
                    // console.log(error);
                });
        }
    };

    useEffect(() => {
        // 게시물 내용.
        const fetchPost = async () => {
            const response = await customAxios.get(`/post/get/${id}`);
            setPostcontents(response.data);
        };
        // 게시물 댓글.
        const fetchComments = async () => {
            const response = await customAxios.get(`/comment/${id}`);
            setPostComments(response.data);
        };
        fetchPost();
        fetchComments();
    }, []);

    return (
        <div className="post">
            <div className="post-container">
                {postcontents.map(postcontent => (
                    <Postcontent
                        postcontent={postcontent}
                        // Dompurify 데이터 받기.
                        description={postcontent.description}
                        key={postcontent.id}
                    />
                ))}
                {/* <div className="post-comments"> */}
                {postComment.map(mainPostComment => (
                    <PostComments
                        key={mainPostComment.id}
                        commentId={mainPostComment.id}
                        mainPostComment={mainPostComment}
                        subPostComment={getNestedComments(mainPostComment.id)}
                        addComment={addComment}
                        editComment={editComment}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    />
                ))}
                {/* </div> */}
                <div className="post-comment">
                    <PostCommentForm
                        submitLabel="댓글달기"
                        textLabel="댓글 달기"
                        handleSubmit={newComment => {
                            addComment(newComment, null);
                        }}

                        // buttonHidden
                    />
                </div>
            </div>
        </div>
    );
}

export default PostPage;
