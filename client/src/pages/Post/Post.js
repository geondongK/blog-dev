// eslint-disable
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
        // eslint-disable-next-line no-alert
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
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
        setLoading(false);
        fetchPost();
        fetchComments();
    }, []);

    return (
        <div className="post">
            {loading ? <Loading /> : null}
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
                        mainPostComment={mainPostComment}
                        subPostComment={getNestedComments(mainPostComment.id)}
                        addComment={addComment}
                        editComment={editComment}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    />
                ))}
                {!currentUser ? (
                    <h4 className="post-auth">
                        <Link to="/login">로그인</Link>을 하셔야 댓글을 작성할
                        수 있습니다
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
        </div>
    );
}

export default Post;
