import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="footer">
            <h4 className="footer-copyright">
                © {new Date().getFullYear()}. kimgeondong All rights reserved.
            </h4>
        </div>
    );
}

export default Footer;
