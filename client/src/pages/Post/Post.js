//  eslint-disable
import './Post.scss';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Postcontent from '../../components/PostContent/PostContent';
import PostComments from '../../components/Comments/Comments/Comments';
import PostCommentForm from '../../components/Comments/CommentForm/CommentForm';
import customAxios from '../../libs/api/axios';
import authContext from '../../libs/api/AuthContext';
import Loading from '../../components/Loading/Loading';
import 'moment/locale/ko';

function Post() {
    // 게시물 내용.
    const [postcontents, setPostcontents] = useState([]);
    // 게시물 댓글.
    const [postComments, setPostComments] = useState([]);
    // 답글 작성 및 편집.
    const [activeComment, setActiveComment] = useState(null);

    const [loading, setLoading] = useState(true);

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
                userId: currentUser.user.id,
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
        await authContext
            .put(`/comment`, {
                newComment,
                commentId,
            })
            .then(() => {
                const updateComments = postComments.map(updateComment => {
                    if (updateComment.id === commentId) {
                        return {
                            ...updateComment,
                            description: newComment,
                        };
                    }
                    return updateComment;
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
        const commentsGroup = postComments.filter(
            getCommentsGroup =>
                getCommentsGroup.parentId === commentId ||
                getCommentsGroup.id === commentId,
        );

        if (commentsGroup.length > 1) {
            await authContext
                .put(`/comment/existComment`, {
                    commentId,
                })
                .then(() => {
                    const updateComments = postComments.map(updateComment => {
                        if (updateComment.id === commentId) {
                            return {
                                ...updateComment,
                                isDeleted: 1,
                            };
                        }
                        return updateComment;
                    });
                    setPostComments(updateComments);
                    setActiveComment(null);
                })
                .catch(() => {
                    // console.log(error);
                });
        } else {
            await authContext
                .delete(`/comment`, {
                    data: {
                        commentId,
                    },
                })
                .then(() => {
                    const newComments = postComments.filter(
                        newComment => newComment.id !== commentId,
                    );
                    setPostComments(newComments);
                })
                .catch(() => {
                    // console.log(error);
                });
        }

        // if(commentsGroup.length > 1) {

        // }
    };

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await customAxios.get(`/post/get/${id}`);
                setPostcontents(response.data);
            } catch (error) {
                // console.log(error);
            }
            setLoading(false);
        };
        // 게시물 댓글.
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await customAxios.get(`/comment/${id}`);
                setPostComments(response.data);
            } catch (error) {
                // console.log(error);
            }
            setLoading(false);
        };
        fetchPost();
        fetchComments();
    }, []);

    return (
        <div className="post">
            {loading ? (
                <div className="post-loading">{loading && <Loading />}</div>
            ) : (
                <div className="container">
                    {postcontents.map(postcontent => (
                        <Postcontent
                            postcontent={postcontent}
                            // Dompurify 데이터 받기.
                            description={postcontent.description}
                            key={postcontent.id}
                        />
                    ))}
                    <hr className="post-line" />
                    {postComment.map(mainPostComment => (
                        <PostComments
                            key={mainPostComment.id}
                            commentId={mainPostComment.id}
                            isDeleted={mainPostComment.isDeleted}
                            mainPostComment={mainPostComment}
                            subPostComment={getNestedComments(
                                mainPostComment.id,
                            )}
                            addComment={addComment}
                            editComment={editComment}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                        />
                    ))}
                    {!currentUser ? (
                        <h4 className="post-auth">
                            <Link to="/login">로그인</Link>을 하셔야 댓글을
                            작성할 수 있습니다
                        </h4>
                    ) : (
                        <div className="post-commentForm">
                            <PostCommentForm
                                submitLabel="댓글달기"
                                textLabel="댓글 달기"
                                handleSubmit={newComment => {
                                    addComment(newComment, null);
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Post;
