/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import customAxios from '../libs/api/axios';
import PostsCard from '../components/PostCard/PostsCard';
// import Dropdown from '../components/PostCard/Dropdown';

function HomePage() {
    // 게시물 출력.
    const [posts, setPosts] = useState([]);
    // dropdown 옵션 선택
    // const [selected, setSelected] = useState([]);

    // const handleChange = (a, b, c) => {
    //     const dateDesc = posts
    //         .filter(post => post.id !== null)
    //         .sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    // };

    // const dateDesc = posts
    //     .filter(post => post.id !== null)
    //     .sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

    const handleChangeValue = sort => {
        // 최신
        if (sort === 'desc') {
            const dateDesc = posts
                .filter(post => post)
                .sort(
                    (a, b) => new Date(b.createDate) - new Date(a.createDate),
                );

            setPosts(dateDesc);
        } else if (sort === 'asc') {
            // 오래된순
            const dateAsc = posts
                .filter(post => post)
                .sort(
                    (a, b) => new Date(a.createDate) - new Date(b.createDate),
                );

            setPosts(dateAsc);
        } else {
            // 조회수
            const view = posts
                .filter(post => post)
                .sort((a, b) => b.view - a.view);

            setPosts(view);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get('/post/postlist');
            setPosts(response.data);
        };
        fetchPost();
    }, []);

    return (
        <div className="home">
            {/* <Dropdown selected={selected} setSelected={setSelected} /> */}
            <div>
                <button
                    type="button"
                    onClick={() => {
                        handleChangeValue('desc');
                    }}
                >
                    최신순
                </button>
                <button
                    type="button"
                    onClick={() => {
                        handleChangeValue('asc');
                    }}
                >
                    오래된순
                </button>
                <button
                    type="button"
                    onClick={() => {
                        handleChangeValue('view');
                    }}
                >
                    조회수
                </button>
            </div>
            {posts.map(post => (
                <PostsCard post={post} key={post.id} />
            ))}
        </div>
    );
}

export default HomePage;
