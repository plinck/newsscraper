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
                return(<Article saved={false} 
                    gotoSavedArticles={this.gotoSavedArticles}
                    key={i}
                    url={info.url}
                    imageUrl={info.imageUrl}
                    title={info.title}
                    body={info.body} />);
            })}
            </div>
        );
    }
}

export default Articles;