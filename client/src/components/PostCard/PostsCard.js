/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function PostsCard({ post }) {
    return (
        <div className="postscard">
            <div className="postcard-container">
                <PostCard name={post.name} date={post.createDate} />
                <div className="postscard-body">
                    <h4 className="postcard-body-title">
                        <Link to={`post/${post.id}`}>{post.title}</Link>
                    </h4>
                </div>
                <div className="postscard-footer">
                    <div className="postcard-view-icon">
                        <FontAwesomeIcon icon={faEye} />
                        <span>{post.view}</span>
                    </div>
                    <div className="postscard-comment-icon">
                        <FontAwesomeIcon icon={faComment} />
                        <span>{post.view}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsCard;
