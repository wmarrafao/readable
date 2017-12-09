import * as api from '../utils/api';

export const ADD = "ADD";
export const EDIT = "EDIT";
export const REMOVE = "REMOVE";
export const INCREMENT_SCORE = "INCREMENT_SCORE";
export const DECREMENT_SCORE = "DECREMENT_SCORE";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function add ({ data, property }) {
  return {
    type: ADD,
    data,
    property
  };
}

export function edit ({ id, data, property }) {
  return {
    type: EDIT,
    id,
    data,
    property
  };
}

export function remove ({ id, property }) {
  return {
    type: REMOVE,
    id,
    property
  };
}

export function upvote ({ id, property }) {
  return {
    type: INCREMENT_SCORE,
    id,
    property
  }
}

export function downvote ({ id, property }) {
  return {
    type: DECREMENT_SCORE,
    id,
    property
  }
}

export const receivePosts = ({ data, property }) => {
  return {
    type: RECEIVE_POSTS,
    data,
    property
  }
};

export const fetchPosts = () => dispatch => (
  api.fetchPosts().then((response) => {
    response.json().then((posts) => {
      dispatch(receivePosts({data: posts, property: 'posts'}))
    });
  })
);
