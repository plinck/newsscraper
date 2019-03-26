import React from 'react';
import axios from 'axios';

class Note extends React.Component {
    // Delete this note from MongoDB
    deleteNote = (event) => {
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

    render() {
        // decontruct props
        let { user, comments } =  this.props;

        return ( 
            <div>
                <p className="flow-text card-title">{user}</p>
                <p className="truncate">{comments}</p>
            </div>
        );
    }
}

export default Note;