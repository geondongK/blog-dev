/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ selected, setSelected }) {
    const [dropdownShow, setDropdownShow] = useState(false);
    const options = ['최신순', '오래된순', '조회수'];

    // const handleDropdownClick = () => {
    //     setDropdownShow(!dropdownShow);
    // };

    return (
        <div className="dropdown">
            <div
                className="dropdown-btn"
                role="button"
                onClick={() => {
                    setDropdownShow(!dropdownShow);
                }}
            >
                {selected === '' ? '정렬' : selected}
                <i>
                    <FontAwesomeIcon icon={faSortDown} />
                </i>
            </div>
            {dropdownShow && (
                <div className="dropdown-options">
                    {options.map(option => (
                        <div
                            key={option}
                            className="dropdown-item"
                            role="button"
                            onClick={() => {
                                setSelected(option);
                                setDropdownShow(false);
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

export default Dropdown;
