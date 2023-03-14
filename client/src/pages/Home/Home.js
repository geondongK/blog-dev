/*  eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import customAxios from '../../libs/api/axios';
import authContext from '../../libs/api/AuthContext';
import PostsCard from '../../components/PostCard/PostsCard/PostsCard';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';

import './Home.scss';

function Home() {
    // 게시물 출력
    const [posts, setPosts] = useState([]);

    // 다음 페이지 여부 확인.
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(true);

    const observerTargetEl = useRef(null);
    const page = useRef(0);

    // 게시물 삭제 기능.
    const deletePost = async postId => {
        // eslint-disable-next-line no-alert
        if (window.confirm('게시물을 삭제하시겠습니까?')) {
            await authContext
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
        if (sort === 'desc') {
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

            setPosts(dateDesc);
        } else if (sort === 'asc') {
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

            setPosts(dateAsc);
        } else {
            // 조회수
            const view = posts
                .filter(post => post)
                .sort((a, b) => b.view - a.view);

            setPosts(view);
        }
    };

    // 게시물 무한 스크롤 기능.
    const fetch = useCallback(async () => {
        try {
            const { data } = await customAxios.get(
                `/post/postlist?limit=10&offset=${page.current}`,
            );
            setPosts(prevPosts => [...prevPosts, ...data]);
            setHasNextPage(data.length === 10);

            if (data.length) {
                page.current += 10;
            }
        } catch (error) {
            // console.log(error);
        }
    }, []);

    useEffect(() => {
        if (!observerTargetEl.current || !hasNextPage) {
            setLoading(false);
            return;
        }
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetch();
            }
        });
        io.observe(observerTargetEl.current);

        // return () => {
        //     io.disconnect();
        // };
    }, [fetch, hasNextPage]);

    return (
        <div className="home">
            <div className="sort-button">
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
                <PostsCard key={post.id} post={post} deletePost={deletePost} />
            ))}
            <div className="observer-loading" ref={observerTargetEl}>
                {loading && <Loading />}
            </div>
        </div>
    );
}

export default Home;
