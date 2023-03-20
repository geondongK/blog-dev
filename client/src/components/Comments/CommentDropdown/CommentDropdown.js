//  eslint-disable
import './CommentDropdown.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faEllipsisVertical,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import ConfirmMoadl from '../../Modal/Comfirm/ComfirmModal';

function CommentDropdown({ commentId, deleteComment, setActiveComment }) {
    const [dropdownShow, setDropdownShow] = useState(false);

    // 모달창 오픈
    const [confirmMoadl, setConfirmMoadl] = useState(false);
    // 모달창 확인
    const [confirmMoadlCheck, setconfirmMoadlCheck] = useState(true);

    const options = ['편집', '삭제'];

    const handleOptions = option => {
        if (option === '편집') {
            setActiveComment({
                id: commentId,
                type: 'editing',
            });
        } else if (option === '삭제') {
            setConfirmMoadl(true);
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
                <div className="dropdown-options">
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
            {confirmMoadl && (
                <ConfirmMoadl
                    // title="삭제"
                    body="댓글을 삭제하시겠습니까?"
                    closeModal={setConfirmMoadl}
                    setconfirmMoadlCheck={setconfirmMoadlCheck}
                    confirmMoadlCheck={confirmMoadlCheck}
                    deleteContent={deleteComment}
                    id={commentId}
                />
            )}
        </div>
    );
}

export default CommentDropdown;
