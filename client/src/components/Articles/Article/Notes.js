import React from 'react';
import Note from './Note';

class Notes extends React.Component {
    // Scrape all the articles on mount
    render() {
        // decontruct props
        let { notes } =  this.props;
        console.log(`notes: ${notes}`);
        let notesRender = "";

        // Only render notes if they exist
        if (notes && notes.length > 0) {
            notesRender = notes.map((note, i) => {
                return(<Note key={note._id} user={note.user} comments={note.comments} articleId={note.articleId} />);
            });
        }
        
        return (
            // Only display comments header if there are comments
            <div>
                {notesRender}
            </div>
        );
    }
}

export default Notes;