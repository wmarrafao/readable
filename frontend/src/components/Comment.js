import React, { Component } from 'react';
import moment from 'moment';
import Modal from 'react-modal'
import trashBin from '../icons/trash.png'
import downArrow from '../icons/down-arrow.png'
import upArrow from '../icons/up-arrow.png'
import editBtn from '../icons/edit.png'

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
      <div className={'comment'}>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.editModalOpen}
          onRequestClose={this.closeEditModal}
          contentLabel='Modal'>
          <textarea value={this.state.commentBody} onChange={this.handleCommentChange} rows={6} cols={60}/>
          <br/>
          <button onClick={(id, body, closeModal) => this.props.update(this.props.id, this.state.commentBody, this.closeEditModal)}>Update Comment</button>
        </Modal>
        
        <div className={'commentBody'}>
          <p className={'commentText'}>{this.props.body}</p>
          <p className={'metaComment'}>
            <img src={upArrow} alt={""} className={'upArrow'} onClick={(id) => this.props.upvote(this.props.id)}/>
            <img src={downArrow} alt={""} className={'downArrow'} onClick={(id) => this.props.downvote(this.props.id)}/>
            {this.props.score} points by {this.props.author} {moment(this.props.timestamp).fromNow()}
            <img src={editBtn} alt={""} onClick={(id, property) => this.openEditModal(this.props.id)}/>
            <img src={trashBin} alt={""} onClick={(id, property) => this.props.delete(this.props.id, 'posts')}/>
          </p>
        </div>
        <br/>
      </div>

    )
  }
}


export default Comment
