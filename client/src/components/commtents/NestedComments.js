/* eslint-disable */
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as dislikes } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likes } from '@fortawesome/free-solid-svg-icons';

function NestedComments({ name, date, body }) {
    return (
        <div className="nestedcomments">
            <div className="nestedcomments-container">
                <Avatar
                    className="postcard-info-img"
                    width="30px"
                    height="30px"
                />
                <div className="info">
                    <span>{name}</span>
                    <p>{body}</p>
                </div>
                <span className="date">
                    {moment(date.create_date).format('YYYY년 M월 D일')}
                </span>
            </div>
            <button type="button">
                <FontAwesomeIcon icon={dislikes} />
                <FontAwesomeIcon icon={likes} />
            </button>
        </div>
    );
}

export default NestedComments;
