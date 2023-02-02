/* eslint-disable react/prop-types */
/*  eslint-disable */
import React from 'react';

import moment from 'moment';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

function PostCard({ name, date }) {
    return (
        <div className="postcard-header">
            <div className="postcard-info">
                <Avatar
                    width="30px"
                    height="30px"
                    className="postcard-info-img"
                />
                <div className="postcard-info-details">
                    <span className="postcard-name">{name}</span>
                    <span className="postcard-date">
                        {moment(date, 'YYYY.MM.DD HH:mm:ss').fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
