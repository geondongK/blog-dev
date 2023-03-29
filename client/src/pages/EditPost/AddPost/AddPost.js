/* eslint-disable no-alert */
/* eslint-disable react/no-danger */
// eslint-disable
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import imageCompression from 'browser-image-compression';
import '../EditPost.scss';

import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ImageResize from 'quill-image-resize';
import authContext from '../../../libs/api/AuthContext';
import loading from '../../../assets/images/loading.gif';

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

    const imageHandler = async () => {
        // 이미지를 저장할 input type=file DOM을 생성.
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];

            // 압축 옵션
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            const editor = quillRef.current.getEditor();

            const range = editor.getSelection(true);

            editor.insertEmbed(range.index, 'image', loading);

            try {
                const compressedFile = await imageCompression(file, options);

                const formData = new FormData();
                formData.append('file', compressedFile);

                const response = await authContext.post('/upload', formData);

                const messgae = response.data.error;

                if (messgae === 'File too large') {
                    window.alert('5MB 이하 사진만 올려주세요');
                    editor().deleteText(range.index);
                } else if (messgae === 'Only images are allowed') {
                    window.alert('이미지 파일만 올려주세요.');
                    editor().deleteText(range.index);
                }

                // 압축 결과
                const IMG_URL = response.data.location;

                editor.deleteText(range.index, 1);

                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                editor.deleteText(range.index, 1);
            }
        });
    };

    const handleChangeValue = e => {
        setPostInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeDescription = value => {
        setPostInfo({ ...postInfo, description: value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (
            postInfo.title.length < 1 ||
            postInfo.title.replace(/\s/g, '') === ''
        ) {
            setError('제목을 작성해 주세요.');
            return;
        }
        if (postInfo.description.length < 1) {
            setError('본문을 작성해 주세요.');
            return;
        }
        authContext
            .post('/post', {
                userId: currentUser.user.id,
                title: postInfo.title,
                description: postInfo.description,
                name: currentUser.user.name,
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
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    [{ align: [] }, { color: [] }, { background: [] }],
                    // ['clean'],
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
        'font',
        'header',
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

export default AddPost;
