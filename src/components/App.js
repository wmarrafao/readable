import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { remove, upvote, downvote, fetchPosts } from '../actions';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import Post from './Post';
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
    let postCounter = 1;
    return (
      <div className="root">
        <h1> Welcome to Readable </h1>
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
        <table>
          <tbody>
            {
              this.props.posts.filter(post => post.deleted === false).map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  rank={postCounter++}
                  title={post.title}
                  voteScore={post.voteScore}
                  author={post.author}
                  timesFromNow={moment(post.timestamp).fromNow()}
                  commentCount={post.commentCount}
                  upvote={this.upvote}
                  downvote={this.downvote}
                  openEditModal={this.openEditPostModal}
                  closeEditModal={this.closeEditPostModal}
                  delete={this.delete}
                />
              ))
            }
          </tbody>
      </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
