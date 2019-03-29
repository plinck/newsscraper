import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
                    <a href="/" className="brand-logo"><i className="material-icons">markunread_mailbox</i>Home</a>
                    <li><a href="/Articles">Scrape</a></li>
                    <li><a href="/ArticlesSaved">Saved</a></li>
                </ul>
                <nav className="nav-wrapper indigo">
                    <div className="container">
                        <a href="/" className="brand-logo left hide-on-med-and-down"><i className="material-icons">markunread_mailbox</i>NewsScraper</a>
                        <a href="#!" className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/">Dashboard</Link></li>
                            <li><NavLink to="/Articles">Scrape<i className="material-icons white-text right">content_cut</i></NavLink></li>
                            <li><NavLink to="/ArticlesSaved">Saved<i className="material-icons white-text right">save</i></NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
            // <!--  END NAV -->
        );
    }
}

export default Navigation;