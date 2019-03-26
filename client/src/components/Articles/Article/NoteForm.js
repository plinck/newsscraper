import React from 'react';
import axios from 'axios';

class NoteForm extends React.Component {
    state = {
        user: "",
        comments: ""
    };

    addNote = () => {
        axios.post(`/api/addNote/${this.props.articleId}`, { user: this.state.user, comments: this.state.comments } )
        .then(res => {
            console.log("Note saved");
            // Update parent to take off this view
            // this.props.refreshParentPage();
        })
        .catch(err => {
            console.error(err); 
        });
    }

    userChange = (e) => {
        this.setState({
            user: e.target.value
        });
    }

    commentsChange = (e) => {
        this.setState({
            comments: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted', this.state);
        this.addNote();
    }

    render(){
        return(
            <div className="app-content">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.userChange} />
                    <input type="text" onChange={this.commentsChange} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default NoteForm;