/* eslint-disable */
import './Comments.scss';
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import 'moment/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
// import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import CommentForm from '../CommentForm/CommentForm';
import NestedComments from '../NestedComments/NestedComments';

function Comments({
    mainPostComment,
    subPostComment,
    addComment,
    editComment,
    activeComment,
    setActiveComment,
    deleteComment,
    commentId,
}) {
    // 대댓글 오픈.
    const [showNestedComments, setShowNestedComments] = useState(false);

    // 답글 클릭일 경우.
    const isReplying =
        activeComment &&
        activeComment.type === 'replying' &&
        activeComment.id === commentId;

    return (
        <div className="postcomment">
            <div className="postcomment-card">
                <NestedComments
                    commentId={commentId}
                    userId={mainPostComment.userId}
                    name={mainPostComment.userName}
                    description={mainPostComment.description}
                    createDate={mainPostComment.createDate}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                />
                {/* <div className="postcard-header">
                    <div className="postcard-info">
                        <Avatar
                            width="30px"
                            height="30px"
                            className="postcard-info-img"
                        />
                        <div className="postcard-info-details">
                            <span>{postComment.name}</span>
                            <span>
                                {moment(postComment.create_date).format(
                                    'YYYY년 M월 D일',
                                )}
                            </span>
                        </div>
                    </div>
                </div> */}
                {/* <hr /> */}
                {/* <p>{postComment.comment_body}</p> */}
            </div>
            <button type="button">
                <FontAwesomeIcon
                    onClick={() => {
                        setShowNestedComments(!showNestedComments);
                    }}
                    icon={faCommentDots}
                />
                {subPostComment.length}
            </button>
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
            {/* 대댓글 작성 */}
            {isReplying && (
                <div>
                    <CommentForm
                        submitLabel="답글달기"
                        textLabel="답글 달기"
                        handleCancelButton
                        handleSubmit={newComment => {
                            addComment(newComment, mainPostComment.id);
                        }}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                </div>
            )}
            {/* 대댓글 */}
            {showNestedComments && (
                <div>
                    {subPostComment.map(nestedComments => (
                        <NestedComments
                            key={nestedComments.id}
                            commentId={nestedComments.id}
                            userId={nestedComments.userId}
                            name={nestedComments.userName}
                            description={nestedComments.description}
                            createDate={nestedComments.createDate}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            editComment={editComment}
                            deleteComment={deleteComment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comments;
