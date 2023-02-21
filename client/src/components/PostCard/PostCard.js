/* eslint-disable react/prop-types */
//  eslint-disable
// profilecard 공용으로 사용하기 위해 따로 분류함.
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import Dropdown from './Dropdown';

function PostCard({ id, userId, name, date, deletePost }) {
    const { currentUser } = useSelector(state => state.user);

    // 현재 사용자가 작성한 게시물만 표시.
    function dropdownComponent() {
        if (currentUser !== null) {
            if (userId === currentUser.user.id) {
                return <Dropdown id={id} deletePost={deletePost} />;
            }
            return null;
        }
        return null;
    }

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
            {dropdownComponent()}
        </div>
    );
}

export default PostCard;
