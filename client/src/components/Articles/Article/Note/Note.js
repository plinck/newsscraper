import React from 'react';
import axios from 'axios';

class Note extends React.Component {
    // Delete this note from MongoDB
    deleteNote = (event) => {
        // Call node to save article
        // Only delete if it was saved with valid Object ID
        console.log(event.target);

        axios.post(`/api/deleteNote`, { _id: this.props._id, articleId: this.props.articleId } )
        .then(res => {
            console.log("Deleted note");
            // Update paremt to take off this view
            this.props.refreshParentPage();
        })
        .catch(err => {
            console.error(err); 
        });
    }

    render() {
        // decontruct props
        let { user, comments } =  this.props;

        return ( 
            <div className="row">
                <div>
                    <i style={{cursor: 'pointer'}}
                    className="articleDelete material-icons left red-text"
                    onClick={this.deleteNote}>
                    delete_forever
                    </i>
                    {user} - {comments}
                </div>
            </div>
        );
    }
}

export default Note;