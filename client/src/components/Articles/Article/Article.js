import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.favsClasses = 'material-icons';

        if (props.saved){
            this.favsClasses += ' red';
        }    
    }

    state = {
        toSavedArticles: false,
    }

    // Save this article to MongoDB
    saveArticle = (event) => {
        // Call node to save article
        if (!this.props.saved) {
            console.log(event.target);
            axios.post(`/api/saveArticle`, this.props)
            .then(res => {
                console.log("Saved article for later");
                this.setState({toSavedArticles: true});
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    handleMouseOver = (e) => {
        console.log(e.target, e.pageX);
        e.currentTarget.className = 'material-icons red';
    }

    handleMouseOut = (e) => {
        console.log(e.target, e.pageX);
        e.currentTarget.className = this.favsClasses;
    }

    render() {
        if (this.state.toSavedArticles === true) {
            return (<Redirect to='/ArticlesSaved' />);
        }
      
        // decontruct props
        let { imgUrl, title, body, url } =  this.props;
        if (!imgUrl) {
            imgUrl = "./images/NewsScraper275x200.png";
        } 

        return ( 
            <div className="card">
                <div className="card-image">
                    <img className="materialboxed" src={imgUrl} alt="" />
                    <a href="#!" className="halfway-fab btn-floating grey">
                        <i className={this.favsClasses}
                            onMouseOver={this.handleMouseOver}
                            onMouseOut={this.handleMouseOut}
                            onClick={this.saveArticle.bind(this)}
                            >favorite
                        </i>
                    </a>
                </div>
                <div className="card-content">
                    <span className="flow-text card-title">{title}</span>
                    <p className="truncate">{body}</p>
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={url} className="indigo-text text-darken-4" data-target="modal-post">
                        <i className="articleInfo material-icons left">open_in_browser</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default Article;