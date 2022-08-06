import React from 'react';
import Navbar from '../Navbar';
import PropTypes from 'prop-types';
import "./layout.scss";

function Layout({ children }){
    return (
        <div>
            <header id="header">
                <Navbar/>
            </header>
            <main id="main">
                {children}
            </main>
        </div>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;