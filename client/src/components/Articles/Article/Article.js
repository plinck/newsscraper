import React from 'react';
import axios from 'axios';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.favsClasses = 'material-icons';

        if (props.saved){
            this.favsClasses += ' red';
        }    
    }

    getImageUrl() {
        if (this.props.imgUrl === undefined || this.props.imgUrl === "") {
            return "./images/NewsScraper275x200.png";
        } else {
            return this.props.imgUrl;
        }
    }

    // Save this article to MongoDB
    saveArticle = (event) => {
        // Call node to save article
        console.log(event.target);
        axios.post(`/api/saveArticle`, this.props)
        .then(res => {
            console.log("Saved article for later");
        })
        .catch(err => {
            console.error(err); 
        });
    }

    // Delete this article from MongoDB
    deleteArticle = (event) => {
        // Call node to save article
        // Only delete if it was saved with valid Object ID
        console.log(event.target);

        if (this.props.saved) {
            axios.post(`/api/deleteArticle`, { _id: this.props._id } )
            .then(res => {
                console.log("Deleted article from saved");
                // Update paremt to take off this view
                this.props.refreshParentPage();
            })
            .catch(err => {
                console.error(err); 
            });
        }
    }

    render() {
        return ( 
            <div className="col s12 m6 l4">
                <div className="card">
                    <div className="card-image">
                        <img className="materialboxed" src={this.getImageUrl()} alt="" />
                        <a href="#!" className="halfway-fab btn-floating grey">
                            <i className={this.favsClasses} onClick={this.saveArticle.bind(this)}>favorite</i>
                        </a>
                    </div>
                    <div className="card-content">
                        <span className="flow-text card-title">{this.props.title}</span>
                        <p className="truncate">{this.props.body}</p>
                    </div>
                    <div className="card-action">
                        <a target="_blank" rel="noopener noreferrer" href={this.props.url} className="indigo-text text-darken-4" data-target="modal-post">
                            <i className="articleInfo material-icons left">info</i>
                        </a>
                        <a href="#!" className="indigo-text text-darken-4">
                            <i className="articleDelete material-icons left" onClick={this.deleteArticle.bind(this)}>delete</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;