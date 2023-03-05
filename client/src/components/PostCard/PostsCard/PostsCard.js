/*  eslint-disable */
import './PostsCard.scss';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import customAxios from '../../../libs/api/axios';

function PostsCard({ post, deletePost }) {
    // 게시물 댓글 수
    const [countComment, setCountComment] = useState([]);

    // 게시물 조회 업데이트.
    const handleViewClick = postId => {
        customAxios
            .put('/post/view', {
                id: postId,
            })
            .then(() => {
                // console.log(response.data);
            })
            .catch(() => {
                // console.log(error);
            });
    };

    useEffect(() => {
        const fetchCountComment = async () => {
            const response = await customAxios.post(`/post/countComment`, {
                postId: post.id,
            });
            console.log(response.data);
            setCountComment(response.data);
            console.log(countComment);
        };
        fetchCountComment();
    }, []);

    return (
        <div className="postscard">
            <div className="postcard-container">
                <PostCard
                    id={post.id}
                    userId={post.userId}
                    name={post.name}
                    date={post.createDate}
                    deletePost={deletePost}
                />
                <div className="postscard-body">
                    <h4 className="postcard-body-title">
                        <Link
                            onClick={() => {
                                handleViewClick(post.id);
                            }}
                            to={`/post/${post.id}`}
                        >
                            {post.title}
                        </Link>
                    </h4>
                </div>
                <div className="postscard-footer">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{post.view}</span>
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>{countComment.length}</span>
                </div>
            </div>
        </div>
    );
}

export default PostsCard;
