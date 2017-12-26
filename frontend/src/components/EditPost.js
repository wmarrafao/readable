import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { edit, setCurrentPost } from '../actions';
import * as api from '../utils/api';
import '../App.css';

class EditPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      author: "",
      category: this.props.category,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.post.title,
      body: this.props.post.body,
      author: this.props.post.author,
      category: this.props.category,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const updatedPost = {
      title: this.state.title,
      body: this.state.body,
    };

    this.props.editPost({ id: this.props.post.id, data: updatedPost, property:'posts' });
    api.editPost(this.props.post.id, JSON.stringify(updatedPost));
    if (this.props.currentPost.id === this.props.post.id) {
      this.props.setCurrentPost({
        ...this.props.currentPost,
        title: this.state.title,
        body: this.state.body,
      })
    }
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        contentLabel='Modal'
      >
        {
          this.props.isOpen === true
          ? <div>
            <h1>Edit Post</h1>
            <form onSubmit={this.handleSubmit} className="createPostForm">
              <label className="createPostLabel">
                Title:
                <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                <br/>
              </label>
              <label className="createPostLabel">
                Body:
                <textarea name="body" value={this.state.body} onChange={this.handleInputChange} rows={10}/>
                <br/>
              </label>
              <label className="createPostLabel">
                Author:
                <input type="text" name="author" value={this.state.author} readOnly={true} />
                <br/>
              </label>
              <label className="createPostLabel">
                Category:
                <select name="category" value={this.state.Category} disabled={true}>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="js">Javascript</option>
                  <option value="functional">Functional Programming</option>
                </select>
                <br/>
              </label>
              <input type="submit" value="Update"/>
            </form>
          </div>
          : null
        }
      </Modal>
    );
  }
}

function mapStateToProps({ currentPost }) {
  return { currentPost };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (data) => dispatch(edit(data)),
    setCurrentPost: (data) => dispatch(setCurrentPost({ data })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
