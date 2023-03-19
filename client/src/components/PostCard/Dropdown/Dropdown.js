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

function Dropdown({ id, deletePost }) {
    const [dropdownShow, setDropdownShow] = useState(false);

    const options = ['편집', '삭제'];

    const navigate = useNavigate();

    const handleOptions = option => {
        if (option === '편집') {
            navigate(`/edit/${id}`);
        } else {
            deletePost(id);
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
        </div>
    );
}

export default Dropdown;
