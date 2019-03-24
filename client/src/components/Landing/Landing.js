import React from 'react';

class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div>
                <h1>Landing - Welcome {this.props.name} {this.props.email}</h1>
            </div>  
        );
    }
}

export default Landing;