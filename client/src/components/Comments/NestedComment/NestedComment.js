/* eslint-disable react/prop-types */
//   eslint-disable
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as dislike } from '@fortawesome/free-regular-svg-icons';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import customAxios from '../../../libs/api/axios';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';

function NestedComment({
    commentId,
    userId,
    name,
    description,
    createDate,
    activeComment,
    setActiveComment,
    editComment,
    deleteComment,
}) {
    const [liked, setLiked] = useState([]);

    const { id } = useParams();

    const { currentUser } = useSelector(state => state.user);

    // 좋아요 개수.
    const likes = liked.filter(likeCount => likeCount.commentId === commentId);

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

    function editButtonComponent() {
        if (currentUser !== null) {
            if (userId === currentUser.user.id) {
                return (
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveComment({
                                    id: commentId,
                                    type: 'editing',
                                });
                            }}
                        >
                            수정
                        </button>
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
                        <button
                            onClick={() => {
                                deleteComment(commentId);
                            }}
                            type="button"
                        >
                            삭제
                        </button>
                    </div>
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

    // const comments = liked.commentId;
    // const user = liked.userId;

    return (
        <div className="nestedcomments">
            <div className="nestedcomments-container">
                <Avatar
                    className="postcard-info-img"
                    width="30px"
                    height="30px"
                />
                <div className="info">
                    <span>{name}</span>
                    <p>{description}</p>
                </div>
                <span className="date">
                    {moment(createDate).format('YYYY년 M월 D일')}
                </span>
            </div>
            <div>
                {likedButtonComponent()}
                {likes.length === 0 ? null : likes.length}
            </div>
            {editButtonComponent()}
        </div>
    );
}

export default NestedComment;
