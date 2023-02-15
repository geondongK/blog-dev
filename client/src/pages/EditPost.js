/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable no-console */
//  eslint-disable
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../libs/api/axios';
import EditPosts from '../components/EditPost/EditPosts';

function EditPost() {
    // 게시물 내용.
    const [postcontents, setPostcontents] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await customAxios.get(`/post/get/${id}`);
            setPostcontents(response.data);
        };
        fetchPost();
    }, []);

    return (
        <div>
            {postcontents.map(postcontent => (
                <EditPosts
                    postcontent={postcontent}
                    // Dompurify 데이터 받기.
                    description={postcontent.description}
                    key={postcontent.id}
                />
            ))}
        </div>
    );
}

export default EditPost;
