import React from 'react';

class Landing extends React.Component {
    render() {
        return ( 
            <div>
                <h1>Landing - Welcome {this.props.name}</h1>
                <p>- Click Scrape to Scrape New Articles</p>
                <p>- Click Saved to View Saved Articles</p>
                <p>- Click The Heart Icon to Save a Scraped Article</p>
            </div>  
        );
    }
}

export default Landing;