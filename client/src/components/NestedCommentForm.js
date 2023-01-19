//  eslint-disable
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
// makeStyles
import { TextField, Button } from '@mui/material';

// const useStyles = makeStyles({
// grid_button: {
//     marginTop: 15,
// },
// });

function NestedCommentForm(props) {
    const {
        handleSubmit,
        submitLabel,
        textLabel,
        handleCancel,
        handleCancelButton = false,
        initialText = '',
    } = props;

    // const classes = useStyles();

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
                autoFocus
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
                    // variant="contained"
                    variant="text"
                >
                    {submitLabel}
                </Button>
            ) : (
                <Button disabled>{submitLabel}</Button>
            )}
            {handleCancelButton && (
                <Button
                    type="button"
                    // variant="contained"
                    onClick={handleCancel}
                >
                    취소
                </Button>
            )}
        </form>
    );
}

export default NestedCommentForm;
