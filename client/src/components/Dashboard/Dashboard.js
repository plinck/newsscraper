import React from 'react';
import Articles from '../Articles/Articles';

class Dashboard extends React.Component {
    render() {
        return ( 
            <div className="row">
                <div className="col s12 m12 l5">
                    <div className="card">
                        <div className="card-content">
                            <span className="flow-text card-title">Dashboard - Welcome {this.props.name}</span>
                            <p>Click Scrape <i className="material-icons blue-text">content_cut</i>to Scrape New Articles</p>
                            <p>Click Saved <i className="material-icons blue-text">save</i>to View Saved Articles</p>
                            <p>Click Love <i className="material-icons blue-text">favorite</i> to Save a Scraped Article</p>
                            <p>Click Open <i className="material-icons blue-text">open_in_browser</i> to open web page for that article</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12 l7">
                    <Articles />     
                </div> 
            </div>
        );
    }
}

export default Dashboard;