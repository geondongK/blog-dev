/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import customAxiox from '../libs/api/axios';

function SearchPage() {
    // 게시물 출력.
    const [posts, setPosts] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxiox.post(`/post/search${query}`);
            setPosts(response.data);
            // console.log(response.data);
        };
        fetchPost();
    }, [query]);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
}

export default SearchPage;
