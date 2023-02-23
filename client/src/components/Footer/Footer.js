import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="container">
            <h3 className="copyright">
                © {new Date().getFullYear()}. kimgeondong All rights reserved.
            </h3>
        </div>
    );
}

export default Footer;
