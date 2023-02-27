/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
//  eslint-disable
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
        if (option === '편집') {
            setActiveComment({
                id: commentId,
                type: 'editing',
            });
        } else if (option === '삭제') {
            deleteComment(commentId);
        }
    };

    return (
        <div className="dropdown">
            <button
                className="dropdown-btn"
                // role="button"
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
                <div className="dropdown-options">
                    {options.map(option => (
                        <div
                            key={option}
                            className="dropdown-item"
                            role="button"
                            onClick={() => {
                                setDropdownShow(false);
                                handleOptions(option);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentDropdown;
