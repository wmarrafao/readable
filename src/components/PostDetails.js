import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComments, clearComments, setCurrentPost, add, remove, upvote, downvote, edit } from '../actions';
import Post from './Post';
import Comment from './Comment';
import moment from 'moment';
import shortid from 'shortid';
import * as api from '../utils/api';
import '../App.css';

class PostDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  componentDidMount() {
    var currentPost = this.props.posts.find(post => post.id === this.props.id);
    if (currentPost === undefined) {
      api.fetchPost(this.props.id).then((response) => {
        response.json().then((post) => {
          if (post.error || post.id === undefined) {
            this.props.history.replace('/');
          }
          this.props.setCurrentPost(post);
        });
      });
    } else {
      this.props.setCurrentPost(currentPost);
    }

    this.props.clearComments();
    this.props.fetchComments(this.props.id);
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  submitComment = () => {
    let comment = {
      id: shortid.generate(),
      timestamp: Date.now(),
      body: this.state.comment,
      author: 'anonymous',
      parentId: this.props.currentPost.id,
      deleted: false,
      voteScore: 1,
      parentDeleted: false,
    }
    this.props.addComment(comment, 'comments')
    api.addComment(JSON.stringify(comment));
    this.setState({ comment: "" });

    this.props.setCurrentPost({
      ...this.props.currentPost,
      commentCount: this.props.currentPost.commentCount+1,
    });
  }

  upvotePost = (id) => {
    this.props.upVote(this.props.id, 'posts')
    this.props.setCurrentPost({
      ...this.props.currentPost,
      voteScore: this.props.currentPost.voteScore+1,
    })
  }

  downvotePost = (id) => {
    this.props.downVote(this.props.id, 'posts')
    this.props.setCurrentPost({
      ...this.props.currentPost,
      voteScore: this.props.currentPost.voteScore-1,
    })
  }

  upvoteComment = (id) => {
    this.props.upVote(id, 'comments');
    api.updateCommentScore(id, JSON.stringify({option: 'upVote'}));
  }

  downvoteComment = (id) => {
    this.props.downVote(id, 'comments');
    api.updateCommentScore(id, JSON.stringify({option: 'downVote'}));
  }

  updateComment = (id, body, closeModal) => {
    let updatedComment = {
      timestamp: Date.now(),
      body: body,
    }
    this.props.editComment(id, updatedComment, 'comments')
    api.updateComment(JSON.stringify(updatedComment), id);
    closeModal()
  }

  deleteComment = (id) => {
    this.props.deleteComment(id, 'comments');
    api.deleteComment(id);
    this.props.setCurrentPost({
      ...this.props.currentPost,
      commentCount: this.props.currentPost.commentCount-1,
    });
  }

  render() {
    return (
      <div>
        <Post
          id={this.props.currentPost.id}
          rank={null}
          category={this.props.currentPost.category}
          title={this.props.currentPost.title}
          voteScore={this.props.currentPost.voteScore}
          author={this.props.currentPost.author}
          timesFromNow={moment(this.props.currentPost.timestamp).fromNow()}
          commentCount={this.props.currentPost.commentCount}
          upvote={this.upvotePost}
          downvote={this.downvotePost}
          openEditModal={this.props.openEditModal}
          closeEditModal={this.props.closeEdittModal}
          delete={this.props.delete}
        />
        <p> {this.props.currentPost.body} </p>
        <br/>
        <br/>
        <textarea value={this.state.comment} onChange={this.handleCommentChange} rows={6} cols={60}/>
        <br/>
        <button onClick={this.submitComment}>Add Comment</button>

        {
          this.props.comments.filter(comment => comment.deleted === false).map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.author}
              timestamp={comment.timestamp}
              body={comment.body}
              score={comment.voteScore}
              upvote={this.upvoteComment}
              downvote={this.downvoteComment}
              delete={this.deleteComment}
              update={this.updateComment}
            />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps({ posts, currentPost, comments }) {
  return { posts, currentPost, comments };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    setCurrentPost: (data) => dispatch(setCurrentPost({ data })),
    clearComments: () => dispatch(clearComments()),
    addComment: (data, property) => dispatch(add({ data, property })),
    upVote: (id, property) => dispatch(upvote({ id, property })),
    downVote: (id, property) => dispatch(downvote({ id, property })),
    deleteComment: (id, property) => dispatch(remove({ id, property })),
    editComment: (id, data, property) => dispatch(edit({ id, data, property })),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
