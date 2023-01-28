/* eslint-disable react/prop-types */
/*  eslint-disable */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

function PostCard({ post }) {
    return (
        <div className="post-container">
            <div className="post-wrapper">
                <div className="post-header">
                    <div className="post-info">
                        <Avatar
                            width="30px"
                            height="30px"
                            className="post-info-img"
                        />
                        <div className="post-info-details">
                            <span className="post-name">{post.name}</span>
                            <span className="post-date">
                                {moment(
                                    post.create_date,
                                    'YYYYMMDDHHmmss',
                                ).fromNow('YYYY-MM-DD HH:mm:ss')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="post-body">
                    <h4 className="post-body-title">
                        <Link to={`post/${post.id}`}>{post.title}</Link>
                    </h4>
                </div>

                <div className="post-footer">
                    <div className="post-view-icon">
                        <FontAwesomeIcon icon={faEye} />
                        <span>{post.view}</span>
                    </div>
                    <div className="post-comment-icon">
                        <FontAwesomeIcon icon={faComment} />
                        <span>{post.view}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
