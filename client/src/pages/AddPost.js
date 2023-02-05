/* eslint-disable react/no-danger */
/* eslint-disable no-console */
/*   eslint-disable */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useFormik } from 'formik';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import customAxios from '../libs/api/axios';

const modules = {
    toolbar: [
        //[{ 'font': [] }],
        // [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ['clean'],
    ],
};

const formats = [
    //'font',
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

function AddPost() {
    const [description, setDescription] = useState('');

    const schema = yup.object().shape({
        title: yup.string().required('제목을 입력해주세요'),
        description: yup.string().required('내용을 입력해주세요.'),
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        // reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
        },
        mode: 'onChange',
    });

    const handleDescriptionChange = editor => {
        setValue('description', editor);
    };

    const editorContent = watch('description');

    // const handleChange = (content, delta, source, editor) => {
    //     console.log(editor.getHTML()); // html 사용시
    //     console.log(JSON.stringify(editor.getContents())); // delta 사용시
    //     setDescription(editor.getHTML());
    // };

    const onSubmit = values => {
        // reset();
        customAxios
            .post('post/addpost', {
                userId: 1,
                title: values.title,
                description: values.description,
                name: '굿모닝',
            })
            .then(response => {
                // if (response.data.error) {
                console.log(response.data);
                // } else {
                // 로그인 정보 저장.
                // dispatch(
                //     login({
                //         id: response.data.id,
                //         name: response.data.name,
                //         isLoggedIn: true,
                //     }),
                // );
                // navigate('/');
                // }
            })
            .catch(error => {
                console.log(params);
                console.log(error);
            });
    };

    return (
        <div className="addpost">
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="title">
                    <span>제목</span>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="제목"
                        {...register('title', { required: true })}
                    />
                    {errors.title && (
                        <span className="errorsMessage">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div className="quill">
                    <ReactQuill
                        id="description"
                        name="description"
                        {...register('description', { required: true })}
                        style={{ height: '600px' }}
                        theme="snow"
                        modules={modules}
                        placeholder="게시물을 작성하세요."
                        formats={formats}
                        value={editorContent}
                        onChange={handleDescriptionChange}
                    />
                    {errors.description && (
                        <span className="errorsMessage">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default AddPost;
