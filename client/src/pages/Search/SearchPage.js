//  eslint-disable
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import customAxios from '../../libs/api/axios';
import PostCard from '../../components/PostCard/PostCard/PostCard';

function Search() {
    const btnSort = [
        { key: 1, type: '최신순' },
        { key: 2, type: '오래된순' },
        { key: 3, type: '조회수' },
    ];
    // 게시물 출력.
    const [posts, setPosts] = useState([]);
    const [btnActive, setBtnActive] = useState('');

    const query = decodeURI(useLocation().search);

    // const query = URLSearchParams(location.search);

    // 게시물 삭제 기능.
    const deletePost = async postId => {
        // eslint-disable-next-line no-alert
        if (window.confirm('게시물을 삭제하시겠습니까?')) {
            await customAxios
                .delete('/post', {
                    data: {
                        postId,
                    },
                })
                .then(() => {
                    const newPosts = posts.filter(post => post.id !== postId);
                    setPosts(newPosts);
                })
                .catch(() => {
                    // console.log(error);
                });
        }
    };

    // 정렬기능.
    const handleChangeValue = sort => {
        // 최신
        if (sort === '최신순') {
            const dateDesc = posts
                .filter(post => post)
                .sort(
                    (a, b) =>
                        new Date(
                            moment().format(
                                b.createDate,
                                'YYYY-MM-DD HH:mm:ss',
                            ),
                        ) -
                        new Date(
                            moment().format(
                                a.createDate,
                                'YYYY-MM-DD HH:mm:ss',
                            ),
                        ),
                );
            setBtnActive(sort);
            setPosts(dateDesc);
        } else if (sort === '오래된순') {
            // 오래된순
            const dateAsc = posts
                .filter(post => post)
                .sort(
                    (a, b) =>
                        new Date(
                            moment().format(
                                a.createDate,
                                'YYYY-MM-DD HH:mm:ss',
                            ),
                        ) -
                        new Date(
                            moment().format(
                                b.createDate,
                                'YYYY-MM-DD HH:mm:ss',
                            ),
                        ),
                );
            setBtnActive(sort);
            setPosts(dateAsc);
        } else {
            // 조회수
            const view = posts
                .filter(post => post)
                .sort((a, b) => b.view - a.view);

            setBtnActive(sort);
            setPosts(view);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            // const response = await customAxiox.post(`/post/search${query}`);
            const response = await customAxios.post(`/post/search${query}`);
            setPosts(response.data);
        };
        fetchPost();
        setBtnActive('최신순');

        // setLoading(false);
    }, [query]);

    return (
        <div className="home">
            <div className="sort-button">
                {btnSort.map(item => {
                    return (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                                handleChangeValue(item.type);
                                setBtnActive(item.type);
                            }}
                            className={`${
                                btnActive === item.type ? 'btn-active' : ''
                            }`}
                        >
                            {item.type}
                        </button>
                    );
                })}
            </div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} deletePost={deletePost} />
            ))}
        </div>
    );
}

export default Search;
