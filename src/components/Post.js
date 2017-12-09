import React from 'react'

export default function Post(props) {
  return (
    <tr>
      <td>
        {props.rank}.
        <button onClick={(id, property) => props.upvote(props.id, 'posts')}>upvote</button>
        <button onClick={(id, property) => props.downvote(props.id, 'posts')}>downvote</button>
        <a href='#'>{props.title} </a>
        {props.voteScore} points by {props.author} {props.timesFromNow} | {props.commentCount} comments |
        <button onClick={(id, property) => props.openEditModal(props.id)}>edit</button> |
        <button onClick={(id, property) => props.delete(props.id, 'posts')}>delete</button>
      </td>
    </tr>
  )
};
