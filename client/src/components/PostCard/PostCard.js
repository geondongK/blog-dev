/* eslint-disable react/prop-types */
/* eslint-disable */
// profilecard 공용으로 사용하기 위해 따로 분류함.
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import Dropdown from './Dropdown';
import customAxios from '../../libs/api/axios';

function PostCard({ id, name, date, deletePost }) {
    // const handleEditPost = postId => {};

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
                <Dropdown id={id} deletePost={deletePost} />

                {/* <Dropdown /> */}
            </div>
        </div>
    );
}

export default PostCard;
