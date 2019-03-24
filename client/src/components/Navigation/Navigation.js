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
                <nav class="nav-wrapper indigo">
                    <div class="container">
                        <a href="/index" class="brand-logo left hide-on-med-and-down"><i class="material-icons">home</i>NewsScraper</a>
                        <a href="#!" class="sidenav-trigger" data-target="mobile-links">
                            <i class="material-icons">menu</i>
                            <a href="/index" class="brand-logo"><i class="material-icons">home</i>NewsScraper</a>
                        </a>
                        <ul class="right hide-on-med-and-down">
                            <li><Link to="/">Landing</Link></li>
                            <li><Link to="/Saved">Saved</Link></li>
                            <li><Link to="/ScrapeNew">Scrape</Link></li>
                            <li><Link to="/Clear">Clear</Link></li>
                        </ul>
                    </div>
                </nav>
                <ul class="sidenav" id="mobile-links">
                    <a href="#!" class="brand-logo"><i class="material-icons">home</i>Home</a>
                        <li><Link to="/">Landing</Link></li>
                        <li><Link to="/Saved">Saved</Link></li>
                        <li><Link to="/ScrapeNew">Scrape</Link></li>
                        <li><Link to="/Clear">Clear</Link></li>
                </ul>
            </div>
            // <!--  END NAV -->
        );
    }
}

export default Navigation;