import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { remove, upvote, downvote, fetchPosts } from '../actions';
import PostList from './PostList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import * as api from '../utils/api';

class App extends Component {

  state = {
    createPostModalOpen: false,
    editPostModalOpen: false,
    postId: undefined,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  openCreatePostModal = () => {
    this.setState(() => ({
      createPostModalOpen: true,
    }))
  };

  closeCreatePostModal = () => {
    this.setState(() => ({
      createPostModalOpen: false,
    }))
  };

  openEditPostModal = (id) => {
    this.setState(() => ({
      editPostModalOpen: true,
      id: id,
    }));
  };

  closeEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: false,
    }));
  };

  upvote = (id, property) => {
    this.props.upVote(id, property);
    api.updateScore(id, JSON.stringify({option: 'upVote'}));
  };

  downvote = (id, property) => {
    this.props.downVote(id, property);
    api.updateScore(id, JSON.stringify({option: 'downVote'}));
  };

  delete = (id, property) => {
    this.props.delete(id, property);
    api.deletePost(id);
  };

  render() {
    return (
      <div className="root">
        <h1> Welcome to Readable </h1>
        <div>
          <Link to='/react'>React</Link>
          <span> | </span>
          <Link to='/redux'>Redux</Link>
          <span> | </span>
          <Link to='/javascript'>JavaScript</Link>
          <span> | </span>
          <Link to='functional'>Functional Programming</Link>
          <span> | </span>
          <Link to='udacity'>Udacity</Link>
        </div>
        <br/>
        <button onClick={this.openCreatePostModal}>New Post</button>
        <br/>
        <br/>
        <CreatePost isOpen={this.state.createPostModalOpen} closeModal={this.closeCreatePostModal}/>
        {
          this.state.editPostModalOpen
          ? <EditPost
            isOpen={this.state.editPostModalOpen}
            closeModal={this.closeEditPostModal}
            post={this.props.posts.find(post => post.id === this.state.id)}
          />
          : null
        }
        <Route exact path='/' render={(props) => (
          <PostList
            posts={this.props.posts}
            postCategory={undefined}
            upvote={this.upvote}
            downvote={this.downvote}
            openEditModal={this.openEditPostModal}
            closeEditModal={this.closeEditPostModal}
            delete={this.delete}
          />
        )}/>
        <Route path='/:category' render={(props) => (
          <PostList
            posts={this.props.posts}
            postCategory={props.match.params.category}
            upvote={this.upvote}
            downvote={this.downvote}
            openEditModal={this.openEditPostModal}
            closeEditModal={this.closeEditPostModal}
            delete={this.delete}
          />
        )}/>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return { posts, comments };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    upVote: (id, property) => dispatch(upvote({ id, property })),
    downVote: (id, property) => dispatch(downvote({ id, property })),
    delete: (id, property) => dispatch(remove({ id, property }))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
