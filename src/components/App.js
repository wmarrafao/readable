import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add, edit, remove, upvote, downvote } from '../actions'
import CreatePost from './CreatePost'

class App extends Component {

  state = {
    createPostModalOpen: false,
  }

  submitPost = () => {

  }

  openCreatePostModal = (post) => {
    this.setState(() => ({
      createPostModalOpen: true,
    }))
  }

  closeCreatePostModal = () => {
    this.setState(() => ({
      createPostModalOpen: false,
    }))
  }

  render() {
    return (
      <div className="root">
        <h1> Welcome to Readable </h1>
        <button onClick={this.openCreatePostModal}>New Post</button>
        <CreatePost isOpen={this.state.createPostModalOpen} closeModal={this.closeCreatePostModal}/>
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
