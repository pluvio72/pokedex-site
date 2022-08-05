import React from 'react';
import Navbar from '../Navbar';
import PropTypes from 'prop-types';

function Layout({ children }){
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;