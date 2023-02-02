/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable */
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import NestedComments from './NestedComments';

function Comment({ postComment }) {
    return (
        <div className="postcomment">
            <div className="postcomment-card">
                <NestedComments
                    name={postComment.name}
                    date={postComment.create_date}
                    body={postComment.comment_body}
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
                <FontAwesomeIcon icon={faComments} />
            </button>
            <button type="button">답글작성</button>
            {/* 중첩 댓글 */}
            {/* <div className="aaa">
                <NestedComments
                    name={postComment.name}
                    date={postComment.create_date}
                    body={postComment.comment_body}
                />
            </div> */}
        </div>
    );
}

export default Comment;
