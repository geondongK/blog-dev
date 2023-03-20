// eslint-disable
import './PostCard.scss';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import PostCard from '../PostCard/PostCard';
import { useSelector } from 'react-redux';
import customAxios from '../../../libs/api/axios';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import Dropdown from '../Dropdown/Dropdown';

function PostCard({ post, deletePost }) {
    const { currentUser } = useSelector(state => state.user);

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

    // 현재 사용자가 작성한 게시물만 표시.
    function dropdownComponent() {
        if (currentUser !== null) {
            if (post.userId === currentUser.user.id) {
                return <Dropdown id={post.id} deletePost={deletePost} />;
            }
            return null;
        }
        return null;
    }

    useEffect(() => {
        const fetchCountComment = async () => {
            const response = await customAxios.post(`/post/countComment`, {
                postId: post.id,
            });
            setCountComment(response.data);
        };
        fetchCountComment();
    }, []);

    return (
        <div className="postcard">
            <div className="postcard-container">
                <div className="postcard-header">
                    <div className="postcard-info">
                        <Avatar
                            width="30px"
                            height="30px"
                            className="postcard-info-img"
                        />
                        <div className="postcard-info-details">
                            <span className="postcard-name">{post.name}</span>
                            <span className="postcard-date">
                                {moment(
                                    post.createDate,
                                    'YYYY.MM.DD HH:mm:ss',
                                ).fromNow()}
                            </span>
                        </div>
                    </div>
                    {dropdownComponent()}
                </div>
                <div className="postcard-body">
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
                <div className="postcard-footer">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{post.view}</span>
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>{countComment.length}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
