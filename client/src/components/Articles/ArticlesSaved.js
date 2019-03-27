import React from 'react';
import ArticleSaved from './Article/ArticleSaved';
import axios from 'axios';

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [
            ]
        };
    }

    refreshPage = () => {
        // Call node to scrape
        axios.get(`/api/savedArticles`)
        .then(res => {
            const articles = [...res.data];
            this.setState({ articles: articles });
        })
        .catch(err => {
            console.error(err); 
        });        
    };


    // Scrape all the articles on mount
    componentDidMount() {
        this.refreshPage();
    }
    
    render() {
        return (
            <div className="row">
            {this.state.articles.map((article, i) => {
                return(<ArticleSaved 
                    refreshParentPage={this.refreshPage}
                    _id={article._id}
                    key={article._id}
                    url={article.url}
                    imageUrl={article.imageUrl}
                    title={article.title}
                    body={article.body}
                    notes={article.notes}
                     />);
            })}
            </div>
        );
    }
}

export default Articles;