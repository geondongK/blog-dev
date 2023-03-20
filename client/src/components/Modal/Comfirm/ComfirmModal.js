import React from 'react';
import './ComfirmModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ComfirmModal({
    title,
    body,
    closeModal,
    setconfirmMoadlCheck,
    confirmMoadlCheck,
    deleteContent,
    id,
}) {
    const handleDeleteContent = () => {
        if (confirmMoadlCheck === true) {
            deleteContent(id);
        }
    };

    return (
        <div className="comfirm-modal">
            <div className="location">
                <div className="container">
                    <div className="title">
                        <span>{title}</span>
                        <button
                            onClick={() => {
                                closeModal(false);
                            }}
                            type="button"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="body">
                        <p>{body}</p>
                    </div>
                    <div className="footer">
                        <button
                            onClick={() => {
                                setconfirmMoadlCheck(true);
                                handleDeleteContent();
                            }}
                            type="button"
                        >
                            확인
                        </button>
                        <button
                            className="cancel-button"
                            onClick={() => {
                                closeModal(false);
                            }}
                            type="button"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComfirmModal;
