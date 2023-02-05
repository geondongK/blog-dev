/* eslint-disable no-console */
//   eslint-disable
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Postcontent from '../components/PostContent/postContent';
import PostComments from '../components/commtents/Comment';
import PostCommentForm from '../components/commtents/CommentForm';
import customAxios from '../libs/api/axios';

function PostPage() {
    // 게시물 내용.
    const [postcontents, setPostcontents] = useState([]);
    // 게시물 댓글.
    const [postComments, setPostComments] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get(`/post/get/${id}`);
            setPostcontents(response.data);
            // console.log(response.data);
        };

        const fetchComments = async () => {
            const response = await customAxios.get(`/comment/${id}`);
            setPostComments(response.data);
            console.log(response.data);
        };
        fetchPost();
        fetchComments();
    }, []);

    return (
        <div className="post">
            <div className="post-container">
                {postcontents.map(postcontent => (
                    <Postcontent
                        postcontent={postcontent}
                        key={postcontent.id}
                    />
                ))}
                {/* <div className="post-comments"> */}
                {postComments.map(postComment => (
                    <PostComments
                        postComment={postComment}
                        key={postComment.id}
                    />
                ))}
                {/* </div> */}
                <div className="post-comment">
                    <PostCommentForm
                        submitLabel="댓글달기"
                        textLabel="댓글 달기"
                        buttonHidden
                    />
                </div>
            </div>
        </div>
    );
}

export default PostPage;
