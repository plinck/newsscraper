import React from 'react';
import Article from './Article/Article';
import axios from 'axios';

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [
            ]
        };
    }

    // Scrape all the articles on mount
    componentDidMount() {
        // Call node to scrape
        axios.get(`/api/scrape`)
        .then(res => {
          const articles = [...res.data];
          this.setState({ articles: articles });
        })
        .catch(err => {
            console.error(err); 
        });
    }
    
    render() {
        return (
            <div className="row">
            {this.state.articles.map((info, i) => {
                return(
                    <div className="col s12 m6 l6">
                        <Article saved={false} 
                        key={i}
                        url={info.url}
                        imageUrl={info.imageUrl}
                        title={info.title}
                        body={info.body} />
                    </div>
                    );
            })}
            </div>
        );
    }
}

export default Articles;