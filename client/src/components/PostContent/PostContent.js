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
            <div className="postcontent-header">
                <div className="postcontent-info">
                    <Avatar
                        width="30px"
                        height="30px"
                        className="postcontent-info-img"
                    />
                    <div className="postcontent-info-details">
                        <span className="postcontent-name">
                            {postcontent.name}
                        </span>
                        <span className="postcontent-date">
                            {moment(postcontent.creatDate).format(
                                'YYYY년 M월 D일',
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="postcontent-title">
                <h3 className="postcontent-title-body">{postcontent.title}</h3>
            </div>
            <p
                className="postcontent-description"
                dangerouslySetInnerHTML={{
                    __html: Dompurify.sanitize(description),
                }}
            />
        </div>
    );
}

export default PostContent;
