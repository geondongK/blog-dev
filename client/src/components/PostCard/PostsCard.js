/* eslint-disable */

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import Dropdown from './Dropdown';
import customAxios from '../../libs/api/axios';

function PostsCard() {
    // 게시물 출력.
    const [posts, setPosts] = useState([]);
    // dropdown 옵션 선택
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get('/post/postlist');
            setPosts(response.data);
            // console.log(response.data);
        };
        fetchPost();
    }, []);

    return (
        <div className="posts-container">
            <Dropdown selected={selected} setSelected={setSelected} />
            {posts.map(post => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
    );
}

export default PostsCard;
