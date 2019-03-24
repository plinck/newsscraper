import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.css';


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
            <div>
                <ul className="sidenav" id="mobile-menu">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img alt="Background" className="responsive-img" src="./images/portfolio-background.jpg" />
                            </div>
                        </div>
                    </li>
                    <li><Link to="/">Landing</Link></li>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/Saved">Saved Articles</Link></li>
                    <li><Link to="/ScrapeNew">Scrape New</Link></li>
                    <li><Link to="/Clear">Clear</Link></li>
                </ul>

                <div id={styles.navbarFixed} className='navbar-fixed'>
                    <nav id={styles.navBar} className={this.navBarClass}>
                        <div className="container nav-wrapper">
                            <div id={styles.headerName} className="brand-logo"><a href="#!">Scraper</a></div>
                            <a href="#!" data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><Link to="/">Landing</Link></li>
                                <li><Link to="/Home">Home</Link></li>
                                <li><Link to="/Saved">Saved Articles</Link></li>
                                <li><Link to="/ScrapeNew">Scrape New</Link></li>
                                <li><Link to="/Clear">Clear</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Navigation;