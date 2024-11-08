import React, { useEffect, useState } from 'react';

function NavBar() {
    const [nav, setNav] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <a href='#' className='Logo'>
                <img src="Logo.png" height={80} alt='Logo' />
            </a>
            <input type='checkbox' className='menu-btn' id='menu-btn' />
            <label className='menu-icon' htmlFor='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                <li><a href='#'>Home</a></li>
                <li><a href='#about'>About Us</a></li>
                <li><a href='#Features'>Services</a></li>
                <li><a href='#Contact'>Contact Us</a></li>
                <li><a href='#'>Sign In</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;