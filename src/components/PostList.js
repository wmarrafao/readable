import React from 'react'
import moment from 'moment';
import sortBy from 'sort-by';
import Post from './Post';

export default function PostList (props) {
  let postCounter = 1;
  return (
    <div>
      <button onClick={props.openCreatePostModal}>New Post</button>
      <label>
        Order by:
        <select onChange={props.handleSortChange} value={props.sortBy}>
          <option value="-timestamp">date</option>
          <option value="-voteScore">points</option>
        </select>
      </label>
      <br/>
      <br/>
      <table className={'postList'}>
        <tbody>
          {
            props.posts.filter( (post) => {
              if (props.postCategory !== undefined) {
                return post.deleted === false && post.category === props.postCategory;
              }
              return post.deleted === false;
            })
            .sort(sortBy(props.sortBy)).map((post) => (
              <tr key={post.id}>
                <td>
                  <Post
                    id={post.id}
                    rank={`${postCounter++}.`}
                    category={post.category}
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
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
