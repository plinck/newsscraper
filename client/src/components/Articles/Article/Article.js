import React from 'react';

class Article extends React.Component {
    render() {
        return ( 
            <div className="col s12 m6 l4">
                <div className="card">
                    <div className="card-image">
                        <img className="BurgerLog275x200 materialboxed" src={this.props.url} alt="" />
                        <a href="#!" className="halfway-fab btn-floating grey">
                            <i className="material-icons">favorite</i>
                        </a>
                    </div>
                    <div className="card-content">
                        <span className="flow-text card-title">{this.props.title}</span>
                        <p className="truncate">{this.props.body}</p>
                    </div>
                    <div className="card-action">
                        <a href="#!" className="indigo-text text-darken-4" data-target="modal-post">
                            <i className="postInfo material-icons left">info</i>
                        </a>
                        <a href="#!" className="indigo-text text-darken-4">
                            <i className="postDelete material-icons left">delete</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;