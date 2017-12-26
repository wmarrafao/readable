import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { add } from '../actions';
import * as api from '../utils/api';
import shortid from 'shortid';
import '../App.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      author: "",
      category: "react",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const post = {
      id: shortid.generate(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: 1,
      commentCount: 0,
      deleted: false,
    };

    this.props.addPost({data: post, property:"posts"});
    api.addPost(JSON.stringify(post));
    this.setState({
      title: "",
      body: "",
      author: "",
      category: "",
    });
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
            <h1>Create Post</h1>
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
                <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
                <br/>
              </label>
              <label className="createPostLabel">
                Category:
                <select name="category" value={this.state.Category} onChange={this.handleInputChange}>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="js">Javascript</option>
                  <option value="functional">Functional Programming</option>
                </select>
                <br/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
          </div>
          : null
        }
      </Modal>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(add(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
