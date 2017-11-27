import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions'
import '../App.css';

class App extends Component {

  submitPost = () => {

  }

  render() {
    return (
      <div className="root">
        <h1> Welcome to Readable </h1>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return { posts, comments }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data, name) => dispatch(add(data, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
