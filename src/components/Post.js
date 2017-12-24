import React from 'react'
import { Link } from 'react-router-dom';

export default function Post(props) {
  return (
    <span>
        {props.rank}
        <button onClick={(id) => props.upvote(props.id)}>upvote</button>
        <button onClick={(id) => props.downvote(props.id)}>downvote</button>
        <Link to={`/${props.category}/${props.id}`}> {props.title} </Link>
        {props.voteScore} points by {props.author} {props.timesFromNow} | {props.commentCount} comments |
        <button onClick={(id, property) => props.openEditModal(props.id)}>edit</button> |
        <button onClick={(id, property) => props.delete(props.id, 'posts')}>delete</button>
    </span>
  )
};
