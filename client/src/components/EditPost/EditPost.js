/* eslint-disable react/no-danger */
// eslint-disable
import '../../pages/EditPost/EditPost.scss';
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';

import authContext from '../../libs/api/AuthContext';

Quill.register('modules/ImageResize', ImageResize);
function EditPost({ postcontent }) {
    const [postInfo, setPostInfo] = useState({
        title: postcontent.title,
        description: postcontent.description,
    });
    const [isError, setError] = useState(null);

    const quillRef = useRef();

    const navigate = useNavigate();
    const { id } = useParams();

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
                const response = await authContext.post('/upload', formData);

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
        if (postInfo.title.length < 1) {
            setError('제목을 작성해 주세요.');
            return;
        }
        if (postInfo.description.length < 1) {
            setError('본문을 작성해 주세요.');
            return;
        }
        authContext
            .put(`/post/edit/${id}`, {
                id,
                title: postInfo.title,
                description: postInfo.description,
            })
            .then(() => {
                navigate('/');
            })
            .catch(() => {});
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
                    ['image'],
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
        // 'link',
        'image',
        'align',
        'color',
        'background',
    ];

    return (
        <div className="editpost">
            <div className="container">
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                    <h3>글작성</h3>
                    <div className="title">
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
                        />
                    </div>
                    <div className="editpost-submit">
                        <button type="submit">저장</button>
                    </div>
                    {isError !== null && (
                        <div className="errors-message"> {isError} </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditPost;
