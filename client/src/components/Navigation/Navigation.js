import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to={"/"}>Landing</Link>
                    </li>
                    <li>
                        <Link to={'/Home'}>Home</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navigation;