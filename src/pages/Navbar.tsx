import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>

            <li>
              <Link to={'/create/customer'}> Create Customer </Link>
            </li>

            <li>
              <Link to={'/sales'}> Sales </Link>
            </li>
            <li>
              <Link to={'/create/sale'}> Create Sale </Link>
            </li>
          </ul>
        </nav>
    )
}

export default Navbar;