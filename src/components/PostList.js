import React from 'react'
import moment from 'moment';
import sortBy from 'sort-by';
import Post from './Post';

export default function PostList (props) {
  let postCounter = 1;
  return (
    <table>
      <tbody>
        {
          props.posts.filter( (post) => {
            if (props.postCategory !== undefined) {
              return post.deleted === false && post.category === props.postCategory;
            }
            return post.deleted === false;
          })
          .sort(sortBy('-voteScore')).map((post) => (
            <Post
              key={post.id}
              id={post.id}
              rank={postCounter++}
              title={post.title}
              voteScore={post.voteScore}
              author={post.author}
              timesFromNow={moment(post.timestamp).fromNow()}
              commentCount={post.commentCount}
              upvote={props.upvote}
              downvote={props.downvote}
              openEditModal={props.openEditModal}
              closeEditModal={props.closeEdittModal}
              delete={props.delete}
            />
          ))
        }
      </tbody>
    </table>
  )
}
