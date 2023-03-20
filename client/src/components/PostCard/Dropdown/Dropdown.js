/* eslint-disable no-console */
// eslint-disable
import './Dropdown.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faEllipsisVertical,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfirmMoadl from '../../Modal/Comfirm/ComfirmModal';

function Dropdown({ id, deletePost }) {
    const [dropdownShow, setDropdownShow] = useState(false);
    // 모달창 오픈
    const [confirmMoadl, setConfirmMoadl] = useState(false);
    // 모달창 확인
    const [confirmMoadlCheck, setconfirmMoadlCheck] = useState(true);

    const options = ['편집', '삭제'];

    const navigate = useNavigate();

    const handleOptions = option => {
        if (option === '편집') {
            navigate(`/edit/${id}`);
        } else if (option === '삭제') {
            setConfirmMoadl(true);
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
                    body="게시물을 삭제하시겠습니까?"
                    closeModal={setConfirmMoadl}
                    setconfirmMoadlCheck={setconfirmMoadlCheck}
                    confirmMoadlCheck={confirmMoadlCheck}
                    deleteContent={deletePost}
                    id={id}
                />
            )}
        </div>
    );
}

export default Dropdown;
