/* eslint-disable react/no-danger */
/* eslint-disable no-console */
/*   eslint-disable */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useFormik } from 'formik';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import customAxios from '../libs/api/axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextEditor() {
    const schema = yup.object().shape({
        title: yup.string().required('제목을 입력해주세요'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = values => {
        // reset();
        customAxios
            .post('auth/login', values)
            .then(response => {
                if (response.data.error) {
                    console.log(response.data);
                } else {
                    // 로그인 정보 저장.
                    // dispatch(
                    //     login({
                    //         id: response.data.id,
                    //         name: response.data.name,
                    //         isLoggedIn: true,
                    //     }),
                    // );
                    // navigate('/');
                }
            })
            .catch(() => {
                // console.log(error);
            });
    };

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        const html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    console.log(convertedContent);

    // toolbar 설정
    // const toolbar = {
    //     list: { inDropdown: true }, // list 드롭다운
    //     textAlign: { inDropdown: true }, // align 드롭다운
    //     link: { inDropdown: true }, // link 드롭다운
    //     history: { inDropdown: false }, // history 드롭다운
    //     // image: { uploadCallback }, // 이미지 커스텀 업로드
    // };

    return (
        <div className="texteditor">
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="title">
                    <span>제목</span>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        placeholder="제목"
                        {...register('title', { required: true })}
                    />
                    {errors.email && (
                        <span className="errorsMessage">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <Editor
                    placeholder="게시글을 작성해주세요."
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                    }}
                    localization={{ locale: 'ko' }}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    // editorStyle={{
                    //     height: '400px',
                    //     width: '100%',
                    //     border: '3px solid lightgray',
                    //     padding: '20px',
                    // }}
                />
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default TextEditor;
