import React from 'react'
import { Link } from 'react-router-dom'
import trashBin from '../icons/trash.png'
import downArrow from '../icons/down-arrow.png'
import upArrow from '../icons/up-arrow.png'
import editBtn from '../icons/edit.png'

export default function Post(props) {
  return (
    <div className={'post'}>
      <span className={'rank'}>{props.rank? props.rank : null}</span>
      <img src={upArrow} alt={""} className={'upArrow'} onClick={(id) => props.upvote(props.id)}/>
      <img src={downArrow} alt={""} className={'downArrow'} onClick={(id) => props.downvote(props.id)}/>
      <Link to={`/${props.category}/${props.id}`} className={'postLink'}>{props.title}</Link>
      <p className={'meta'}>
        {`${props.voteScore} points by ${props.author} | ${props.timesFromNow} | ${props.commentCount} comments `}
        <img src={editBtn} alt={""} onClick={(id, property) => props.openEditModal(props.id)}/>
        <img src={trashBin} alt={""} onClick={(id, property) => props.delete(props.id, 'posts')}/>
      </p>
    </div>
  )
};
