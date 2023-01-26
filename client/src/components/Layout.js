/* eslint-disable react/prop-types */
import React from 'react';
import NavBar from './NavBar';

function Layout({ children }) {
    return (
        <div className="container">
            <NavBar />
            <div className="layout-container">{children}hi</div>
        </div>
    );
}

export default Layout;
