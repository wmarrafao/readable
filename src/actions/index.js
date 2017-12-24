import * as api from '../utils/api';

export const ADD = "ADD";
export const EDIT = "EDIT";
export const REMOVE = "REMOVE";
export const INCREMENT_SCORE = "INCREMENT_SCORE";
export const DECREMENT_SCORE = "DECREMENT_SCORE";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";
export const SET_CURRENT_POST = "SET_CURRENT_POST";

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

export const receive = ({ data, property }) => {
  return {
    type: RECEIVE_DATA,
    data,
    property
  }
};

export const fetchPosts = () => dispatch => (
  api.fetchPosts().then((response) => {
    response.json().then((posts) => {
      dispatch(receive({data: posts, property: 'posts'}))
    });
  })
);

export const fetchComments = (postId) => dispatch => (
  api.fetchComments(postId).then((response) => {
    response.json().then((comments) => {
      dispatch(receive({data: comments, property: 'comments'}))
    });
  })
);

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS,
    data: [],
  }
};

export const setCurrentPost = ({ data }) => {
  return {
    type: SET_CURRENT_POST,
    data,
  }
};
