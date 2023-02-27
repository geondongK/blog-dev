// eslint-disable
import './NestedComments.scss';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as dislike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import customAxios from '../../../libs/api/axios';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import CommentDropdown from '../Dropdown/CommentDropdown';
import CommentForm from '../CommentForm/CommentForm';

function NestedComments({
    commentId,
    userId,
    name,
    description,
    createDate,
    activeComment,
    setActiveComment,
    addComment,
    editComment,
    deleteComment,
}) {
    const [liked, setLiked] = useState([]);

    const { id } = useParams();

    const { currentUser } = useSelector(state => state.user);

    // 좋아요 개수.
    const likes = liked.filter(likeCount => likeCount.commentId === commentId);

    // 답글 클릭일 경우.
    const isReplying =
        activeComment &&
        activeComment.type === 'replying' &&
        activeComment.id === commentId &&
        currentUser !== null;

    // 수정 클릭일 경우.
    const isEditing =
        activeComment &&
        activeComment.type === 'editing' &&
        activeComment.id === commentId;

    // 좋아요 추가
    const handleAddLike = async addLikeId => {
        await customAxios
            .post('/liked', {
                postId: id,
                commentId: addLikeId,
                userId: currentUser.user.id,
            })
            .then(response => {
                setLiked([...liked, response.data]);
            })
            .catch(() => {
                // console.log(error);
            });
    };
    // 좋아요 삭제
    const handleDeleteLike = async deleteCommentId => {
        await customAxios
            .delete('/liked', {
                data: {
                    commentId: deleteCommentId,
                    userId: currentUser.user.id,
                },
            })
            .then(() => {
                const deleteLiked = liked.filter(
                    deleteLike =>
                        deleteLike.commentId === commentId &&
                        deleteLike.userId !== currentUser.user.id,
                );
                setLiked(deleteLiked);
            })
            .catch(() => {
                // console.log(error);
            });
    };

    function dropdownComponent() {
        if (currentUser !== null) {
            if (userId === currentUser.user.id) {
                return (
                    <CommentDropdown
                        commentId={commentId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        editComment={editComment}
                    />
                );
            }
            return null;
        }
        return null;
    }

    function likedButtonComponent() {
        if (currentUser !== null) {
            if (
                liked.some(
                    likeButton =>
                        likeButton.commentId === commentId &&
                        likeButton.userId === currentUser.user.id,
                )
            ) {
                return (
                    <button
                        type="button"
                        onClick={() => {
                            handleDeleteLike(commentId);
                        }}
                    >
                        <FontAwesomeIcon style={{ color: 'red' }} icon={like} />
                    </button>
                );
            }
            return (
                <button
                    type="button"
                    onClick={() => {
                        handleAddLike(commentId);
                    }}
                >
                    <FontAwesomeIcon icon={dislike} />
                </button>
            );
        }
        return <FontAwesomeIcon icon={dislike} />;
    }

    useEffect(() => {
        const fetchLiked = async () => {
            const response = await customAxios.get(`/liked/${id}`);
            setLiked(response.data);
        };
        fetchLiked();
    }, []);

    return (
        <div className="nestedcomments">
            <div className="nestedcomments-info">
                <Avatar
                    className="nestedcomments-info-img"
                    width="30px"
                    height="30px"
                />
                <div className="nestedcomments-details">
                    <span className="nestedcomments-name">{name}</span>
                    <span className="nestedcomments-date">
                        {moment(createDate).format('YYYY년 M월 D일')}
                    </span>
                </div>
                <div>{dropdownComponent()}</div>
            </div>
            <p className="nestedcomments-description">{description}</p>
            <div className="nestedcomments-button">
                {/* 좋아요 버튼 */}
                {likedButtonComponent()}
                <span>
                    {likes.length === 0 ? null : `좋아요${likes.length}`}
                </span>
                {/* 답글 버튼 */}
                {!currentUser ? null : (
                    <button
                        onClick={() => {
                            setActiveComment({
                                id: commentId,
                                type: 'replying',
                            });
                        }}
                        type="button"
                    >
                        답글작성
                    </button>
                )}
            </div>
            {/* 대댓글 작성 */}
            <div className="nestedcomments-active">
                {isReplying && (
                    <CommentForm
                        submitLabel="답글달기"
                        textLabel="답글 달기"
                        handleCancelButton
                        handleSubmit={newComment => {
                            addComment(newComment, commentId);
                        }}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                {/* likedButtonComponent() 코드로 동작함 */}
                {isEditing && (
                    <CommentForm
                        submitLabel="댓글 수정"
                        textLabel="수정"
                        handleCancelButton
                        initialText={description}
                        handleSubmit={newComment => {
                            editComment(newComment, commentId);
                        }}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default NestedComments;
