//  eslint-disable
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

function postContent({ postcontent }) {
    return (
        <div className="postcontent">
            <div className="postcontent-card">
                <div className="postcard-header">
                    <div className="postcard-info">
                        <Avatar
                            width="30px"
                            height="30px"
                            className="postcard-info-img"
                        />
                        <div className="postcard-info-details">
                            <span>{postcontent.name}</span>
                            <span>
                                {moment(postContent.create_date).format(
                                    'YYYY년 M월 D일',
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h2>{postcontent.title}</h2>
            <hr />
            <p>{postcontent.body}</p>
        </div>
    );
}

export default postContent;
