import React from 'react';
import companyLogo from '../images/company-logo.png'

const Header = () => (
    <header>
        <div className="header-container">
            <img src={companyLogo} alt="Github"/>
        </div>
    </header>
);

export default Header;