// eslint-disable
import React, { useState } from 'react';
import './CommentForm.scss';

function CommentForm({
    handleSubmit,
    submitLabel,
    textLabel,
    // buttonHidden,
    handleCancel,
    handleCancelButton = false,
    initialText = '',
}) {
    // 댓글 작성.
    const [newComment, setNewComment] = useState(initialText);

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(newComment);
        setNewComment('');
    };

    return (
        <div className="comment-form">
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder={textLabel}
                    rows={2}
                    type="text"
                    value={newComment}
                    onChange={e => {
                        setNewComment(e.target.value);
                    }}
                />
                <div className="comment-button">
                    {newComment !== '' && newComment.trim('') ? (
                        <button type="submit">{submitLabel}</button>
                    ) : (
                        <button type="button">{submitLabel}</button>
                    )}
                    {handleCancelButton && (
                        <button
                            // hidden={buttonHidden}
                            onClick={handleCancel}
                            type="button"
                        >
                            취소
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CommentForm;
