/* eslint-disable react/no-danger */
// eslint-disable
import './PostContent.scss';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import Dompurify from 'dompurify';
import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

function PostContent({ postcontent, description }) {
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
                                {moment(postcontent.creatDate).format(
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
            <p
                dangerouslySetInnerHTML={{
                    __html: Dompurify.sanitize(description),
                }}
            />
        </div>
    );
}

export default PostContent;
