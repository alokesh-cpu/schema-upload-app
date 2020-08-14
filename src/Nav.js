import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav  >
        <h3>Product Management Platform</h3>
        <ul className="nav-links">
            <Link to='/components/schemas'>
                <li>
                    <h4>Schemas</h4>
                </li>
            </Link>
            <Link to="/components/fileUpload">
            <li>
                <h4>Upload New Schema</h4>
            </li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;