/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// eslint-disable
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';

function CommentForm(props) {
    const { handleSubmit, submitLabel, textLabel, initialText = '' } = props;

    // 댓글 작성.
    const [newComment, setNewComment] = useState(initialText);

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(newComment);
        setNewComment('');
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label={textLabel}
                // variant="outlined"
                type="text"
                fullWidth
                multiline
                // autoFocus
                // minRows={5}
                value={newComment}
                onChange={e => {
                    setNewComment(e.target.value);
                }}
            />
            {newComment !== '' && newComment.trim('') ? (
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ marginTop: 1 }}
                    // onClick={addComment}
                >
                    {submitLabel}
                </Button>
            ) : (
                <Button sx={{ marginTop: 1 }} disabled>
                    {submitLabel}
                </Button>
            )}
        </form>
    );
}

export default CommentForm;
