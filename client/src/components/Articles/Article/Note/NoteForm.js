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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted', this.state);
        this.addNote();
    }

    render(){
        return(
            <div>
                <p>Add Comment</p>
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s12">
                        <div className="row">
                            <div className="active input-field col s12 m3">
                                <input id="user" onChange={this.handleChange} type="text" className="active validate" required="" aria-required="true" />
                                <label className="active" for="name">Name</label>
                            </div>
                            <div className="input-field col s12 m9">
                                <input id="comments" onChange={this.handleChange} type="text" className="active validate" required="" aria-required="true" />
                                <label className="active" for="mySystemNumber">Comments</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="center-align">
                                <button className="btn waves-effect waves-light blue" type="submit" name="submit">Submit
                                    <i className="material-icons right">save</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteForm;