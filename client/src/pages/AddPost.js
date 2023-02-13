/* eslint-disable react/no-danger */
/* eslint-disable no-console */
//   eslint-disable
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ImageResize from 'quill-image-resize';
import customAxios from '../libs/api/axios';

Quill.register('modules/ImageResize', ImageResize);
function AddPost() {
    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
    });
    const [isError, setError] = useState(null);

    const quillRef = useRef();

    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    const imageHandler = () => {
        // 이미지를 저장할 input type=file DOM을 생성.
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await customAxios.post('/upload', formData);

                const IMG_URL = `${process.env.REACT_APP_API_URL_IMAGE}${response.data}`;

                const editor = quillRef.current.getEditor();

                const range = editor.getSelection();

                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                // console.log(error);
            }
        });
    };

    const handleChangeValue = e => {
        setPostInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeDescription = value => {
        setPostInfo({ ...postInfo, description: value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (postInfo.title.length < 5) {
            setError('5자리 이상 !');
            return;
        }
        customAxios
            .post('/post', {
                userId: currentUser.user.id,
                title: postInfo.title,
                description: postInfo.description,
                name: currentUser.user.name,
            })
            .then(response => {
                navigate('/');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    // [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    [{ align: [] }, { color: [] }, { background: [] }],
                    ['clean'],
                ],
                handlers: { image: imageHandler },
            },
            ImageResize: {
                parchment: Quill.import('parchment'),
            },
        }),

        [],
    );

    const formats = [
        // 'font',
        // 'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
    ];

    return (
        <div className="addpost">
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <div className="title">
                    <span>제목</span>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="제목"
                        value={postInfo.title}
                        onChange={handleChangeValue}
                    />
                </div>
                <div className="quill">
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        placeholder="게시물을 작성해 주세요."
                        value={postInfo.description}
                        onChange={handleChangeDescription}
                        formats={formats}
                        id="description"
                        name="description"
                        style={{ height: 600 }}
                    />
                </div>
                <button style={{ cursor: 'pointer' }} type="submit">
                    저장
                </button>
            </form>
            {isError !== null && <div className="errors"> {isError} </div>}
        </div>
    );
}

export default AddPost;
