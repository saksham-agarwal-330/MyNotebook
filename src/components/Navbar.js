import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyNotebook</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                    </ul>
                    {localStorage.getItem("token") ? (
                        <form className="d-flex justify-center" role="search">
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-primary mx-2"
                            >
                                Logout
                            </button>
                        </form>
                    ) : (
                        <form className="d-flex justify-center" role="search">
                            <Link to="/login" className="btn btn-primary mx-2" aria-disabled="true">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary mx-2" aria-disabled="true">
                                SignUp
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
