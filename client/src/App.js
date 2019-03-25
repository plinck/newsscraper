import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Articles from './components/Articles/Articles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
    // Create a constructor, and bind the value of this in our function which will make the fetch API call t oo express server
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const response = await fetch(`/api/user`);
    const userJson = await response.json();
    const user = userJson;
    this.setState(user);
    console.log(this.state);
  }

  // Then we call the function as soon as the component is mounted.
  // Next we have the render function which has the overall markup for the app. So that was the last change we will do in React or our frontend application.
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
        <Router>
            <div className="container">
                <Navigation />
                <Route
                    exact path="/"
                    render={() => (
                    <Landing {...this.state} />
                    )}
                /> 
                <Route path="/Articles" component={Articles} />      
            </div>
        </Router>
    );
  }
}
export default App;