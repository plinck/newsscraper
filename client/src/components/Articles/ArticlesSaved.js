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
            {this.state.articles.map((info, i) => {
                return(<Article refreshParentPage={this.refreshPage} saved={true} _id={info._id} key={info._id} url={info.url} imageUrl={info.imageUrl} title={info.title} body={info.body} />);
            })}
            </div>
        );
    }
}

export default Articles;