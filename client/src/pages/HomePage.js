import React, { useEffect, useState } from 'react';
import customAxios from '../libs/api/axios';
import PostsCard from '../components/PostCard/PostsCard';
import Dropdown from '../components/PostCard/Dropdown';

function HomePage() {
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
        <div className="home">
            <Dropdown selected={selected} setSelected={setSelected} />
            {posts.map(post => (
                <PostsCard post={post} key={post.id} />
            ))}
        </div>
    );
}

export default HomePage;
