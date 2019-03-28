import React from 'react';
import axios from 'axios';
import Notes from './Note/Notes';
import NoteForm from './Note/NoteForm';

class ArticleSaved extends React.Component {
    constructor(props) {
        super(props);

        this.favsClasses = 'material-icons red';
    }

    // Delete this article from MongoDB
    deleteArticle = (event) => {
        // Call node to save article
        // Only delete if it was saved with valid Object ID
        console.log(event.target);

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

    refreshPage = () => {
        this.props.refreshParentPage();
    }

    // Only show notes if this is saved article
    notesFooter = () => {
        return(
            <Notes notes={this.props.notes} refreshParentPage={this.refreshPage} />
        );
    }

    // Only form if this is saved article
    notesForm = () => {
        return(
            <NoteForm articleId={this.props._id} refreshParentPage={this.refreshPage}/>
        );
    }

    render() {      
        // decontruct props
        let { imageUrl, title, body, url } =  this.props;
        if (!imageUrl) {
            imageUrl = "./images/NewsScraper275x200.png";
        } 

        let notesFooterDiv = this.notesFooter();
        let notesFormDiv = this.notesForm();

        return ( 
            <div className="card">
                <div className="card-image">
                    <img className="materialboxed" src={imageUrl} alt="" />
                    <a href="#!" className="halfway-fab btn-floating grey">
                        <i className={this.favsClasses}>favorite</i>
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
                    <a href="#!" className="indigo-text text-darken-4">
                        <i className="articleDelete material-icons left" onClick={this.deleteArticle.bind(this)}>delete</i>
                    </a>
                </div>
                <div className="card-action">
                    {notesFooterDiv}
                </div>
                <div className="card-action">
                    {notesFormDiv}
                </div>
            </div>          
        );
    }
}

export default ArticleSaved;