import React, { Component } from 'react';
import moment from 'moment';
import Modal from 'react-modal'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editModalOpen: false,
        commentBody: this.props.body,
    }
  }

  handleCommentChange = (event) => {
    this.setState({ commentBody: event.target.value });
  }

  openEditModal = () => {
    this.setState({ editModalOpen: true });
  }

  closeEditModal = () => {
    this.setState({ editModalOpen: false });
  }

  render(){
    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.editModalOpen}
          onRequestClose={this.closeEditModal}
          contentLabel='Modal'
        >
          <textarea value={this.state.commentBody} onChange={this.handleCommentChange} rows={6} cols={60}/>
          <br/>
          <button onClick={(id, body, closeModal) => this.props.update(this.props.id, this.state.commentBody, this.closeEditModal)}>Update Comment</button>
        </Modal>
        <br/>
        <span>
          <button onClick={(id) => this.props.upvote(this.props.id)}>upvote</button>
          <button onClick={(id) => this.props.downvote(this.props.id)}>downvote</button>
          {this.props.score} points by {this.props.author} {moment(this.props.timestamp).fromNow()}
          <button onClick={this.openEditModal}>edit</button> |
          <button onClick={(id) => this.props.delete(this.props.id)}>delete</button>
        </span>
        <div>
          {this.props.body}
          <br/>
        </div>
        <br/>
      </div>
    )
  }
}


export default Comment
