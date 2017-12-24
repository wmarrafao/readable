import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import { remove, upvote, downvote, fetchPosts, setCurrentPost } from '../actions';
import PostList from './PostList';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import * as api from '../utils/api';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createPostModalOpen: false,
      editPostModalOpen: false,
      sortPostsBy: "-voteScore",
      postDeleted: false,
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

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

  upvotePost = (id) => {
    this.props.upVote(id, 'posts');
    api.updateScore(id, JSON.stringify({option: 'upVote'}));
  };

  downvotePost = (id) => {
    this.props.downVote(id, 'posts');
    api.updateScore(id, JSON.stringify({option: 'downVote'}));
  };

  delete = (id, property) => {
    this.props.delete(id, property);
    api.deletePost(id);
    this.props.history.replace('/');
  };

  handleSortChange = (event) => {
    this.setState({sortPostsBy: event.target.value});
  }

  tooglePostDeleted = (value) => {
    this.setState({ postDeleted: value });
  }

  render() {
    return (
      <div className="root">
        <Link to='/'>HOME</Link>
        <h1> Welcome to Readable </h1>
        <div>
          <Link to='/react'>React</Link>
          <span> | </span>
          <Link to='/redux'>Redux</Link>
          <span> | </span>
          <Link to='/javascript'>JavaScript</Link>
          <span> | </span>
          <Link to='/functional'>Functional Programming</Link>
          <span> | </span>
          <Link to='/udacity'>Udacity</Link>
        </div>
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
            openCreatePostModal={this.openCreatePostModal}
            sortBy={this.state.sortPostsBy}
            handleSortChange={this.handleSortChange}
            postCategory={undefined}
            upvote={this.upvotePost}
            downvote={this.downvotePost}
            openEditModal={this.openEditPostModal}
            closeEditModal={this.closeEditPostModal}
            delete={this.delete}
          />
        )}/>
        <Route exact path='/:category' render={(props) => (
          props.match.params.category !== 'react' &&   props.match.params.category !== 'redux' &&   props.match.params.category !== 'javascript' &&   props.match.params.category !== 'functional' &&   props.match.params.category !== 'udacity'?(
              <Redirect to='/'/>
          ) : (
            <PostList
              posts={this.props.posts}
              openCreatePostModal={this.openCreatePostModal}
              sortBy={this.state.sortPostsBy}
              handleSortChange={this.handleSortChange}
              postCategory={props.match.params.category}
              upvote={this.upvotePost}
              downvote={this.downvotePost}
              openEditModal={this.openEditPostModal}
              closeEditModal={this.closeEditPostModal}
              delete={this.delete}
            />
          )
        )}/>

        <Route exact path='/:category/:id' render={({ match }) => (
          <PostDetails
            id={match.params.id}
            upvote={this.upvotePost}
            downvote={this.downvotePost}
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
    fetchPosts: (property) => dispatch(fetchPosts(property)),
    upVote: (id, property) => dispatch(upvote({ id, property })),
    downVote: (id, property) => dispatch(downvote({ id, property })),
    delete: (id, property) => dispatch(remove({ id, property })),
    setCurrentPost: (data) => dispatch(setCurrentPost({ data })),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
