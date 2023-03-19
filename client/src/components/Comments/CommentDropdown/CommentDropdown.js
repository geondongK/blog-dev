//  eslint-disable
/* eslint-disable no-console */

import './CommentDropdown.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faEllipsisVertical,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

function CommentDropdown({ commentId, deleteComment, setActiveComment }) {
    const [dropdownShow, setDropdownShow] = useState(false);

    const options = ['편집', '삭제'];

    const handleOptions = option => {
        console.log(option);

        if (option === '편집') {
            setActiveComment({
                id: commentId,
                type: 'editing',
            });
        } else {
            deleteComment(commentId);
        }
    };

    return (
        <div className="comment-dropdown">
            <button
                className="dropdown-btn"
                type="button"
                onClick={() => {
                    setDropdownShow(!dropdownShow);
                }}
            >
                <i>
                    <FontAwesomeIcon icon={faEllipsis} />
                </i>
            </button>
            {dropdownShow && (
                <div role="menu" className="dropdown-options">
                    {options.map(option => (
                        <button
                            key={option}
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                                setDropdownShow(false);
                                handleOptions(option);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentDropdown;
