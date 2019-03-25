import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.navBarClass = '';

        if (props.scroll){
            this.navBarClass = 'transparent z-depth-0';
        } else {
            this.navBarClass = 'z-depth-0 blue darken-4';
        }
    
    }

    render() {
        return (
            // <!--  NAV -->
            <div>
                <ul className="sidenav" id="mobile-links">
                    <a href="/" className="brand-logo"><i className="material-icons">home</i>Home</a>
                        <li><a href="/ArticlesSaved">Saved</a></li>
                        <li><a href="/Articles">Scrape</a></li>
                        <li><a href="/Clear">Clear</a></li>
                </ul>
                <nav className="nav-wrapper indigo">
                    <div className="container">
                        <a href="/" className="brand-logo left hide-on-med-and-down"><i className="material-icons">home</i>NewsScraper</a>
                        <a href="#!" className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/">Landing</Link></li>
                            <li><Link to="/ArticlesSaved">Saved</Link></li>
                            <li><a href="/Articles">Scrape</a></li>
                            <li><Link to="/Clear">Clear</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            // <!--  END NAV -->
        );
    }
}

export default Navigation;