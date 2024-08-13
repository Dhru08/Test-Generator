import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();

    return (
        <>
            <nav className='navbar navbar-expand-lg bg-dark border-bottom border-body' data-bs-theme='dark'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>
                        Test Generator
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <Link className={`nav-link ${location.pathname === '/number' ? 'active' : ''}`} aria-current='page' to='/number'>
                                    Number
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className={`nav-link ${location.pathname === '/array' ? 'active' : ''}`} aria-current='page' to='/array'>
                                    Array
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className={`nav-link ${location.pathname === '/string' ? 'active' : ''}`} aria-current='page' to='/string'>
                                    String
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className={`nav-link ${location.pathname === '/tree' ? 'active' : ''}`} aria-current='page' to='/tree'>
                                    Tree
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className={`nav-link ${location.pathname === '/graph' ? 'active' : ''}`} aria-current='page' to='/graph'>
                                    Graph
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
