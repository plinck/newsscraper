import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import NoteForm from './NoteForm';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.favsClasses = 'material-icons';

        if (props.saved){
            this.favsClasses += ' red';
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

    // Only show notes if this is saved article
    notesFooter = () => {
        if (this.props.saved) {
            return(
                <Notes notes={this.props.notes} />
            );
        }
    }

    // Only form if this is saved article
    notesForm = () => {
        if (this.props.saved) {
            return(
                <NoteForm articleId={this.props._id} />
            );
        }
    }
    
    render() {
        // decontruct props
        let { imgUrl, title, body, url, notes } =  this.props;
        if (imgUrl === undefined || imgUrl === "") {
            imgUrl = "./images/NewsScraper275x200.png";
        } 

        let notesFormDiv = this.notesForm();
        let notesFooterDiv = this.notesFooter();

        return ( 
            <div className="col s12 m6 l4">
                <div className="card">
                    <div className="card-image">
                        <img className="materialboxed" src={imgUrl} alt="" />
                        <a href="#!" className="halfway-fab btn-floating grey">
                            <i className={this.favsClasses} onClick={this.saveArticle.bind(this)}>favorite</i>
                        </a>
                    </div>
                    <div className="card-content">
                        <span className="flow-text card-title">{title}</span>
                        <p className="truncate">{body}</p>
                    </div>
                    <div className="card-action">
                        <a target="_blank" rel="noopener noreferrer" href={url} className="indigo-text text-darken-4" data-target="modal-post">
                            <i className="articleInfo material-icons left">info</i>
                        </a>
                        <a href="#!" className="indigo-text text-darken-4">
                            <i className="articleDelete material-icons left" onClick={this.deleteArticle.bind(this)}>delete</i>
                        </a>
                    </div>
                    <div className="card-footer">
                        {notesFooterDiv}
                        {notesFormDiv}
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;