/* eslint-disable no-console */
/* eslint-disable */
// react map Infinite Scroll , Intersection Observer
import React, { useCallback, useEffect, useRef, useState } from 'react';
import customAxios from '../libs/api/axios';
import PostsCard from '../components/PostCard/PostsCard';
import Loading from '../components/Loading';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(true);

    const observerTargetEl = useRef(null);
    const page = useRef(0);

    // const [page, setPage] = useState(0);
    // const [loading, setLoading] = useState(true);

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
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (!observerTargetEl.current || !hasNextPage) {
            setLoading(false);
            return;
        }
        const io = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                fetch();
            }
        });
        io.observe(observerTargetEl.current);

        return () => {
            io.disconnect();
        };
    }, [fetch, hasNextPage]);

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
            {/* {loading && <Loading />} */}
            {/* {posts.map(post => (
                <PostsCard post={post} key={post.id} deletePost={deletePost} />
            ))} */}
            {posts.map(post => (
                <PostsCard key={post.id} post={post} deletePost={deletePost} />
            ))}
            <div ref={observerTargetEl}></div>
            {loading && <Loading />}
        </div>
    );
}

export default HomePage;
