export const ADD = "ADD"
export const EDIT = "EDIT"
export const REMOVE = "REMOVE"
export const INCREMENT_SCORE = "INCREMENT_SCORE"
export const DECREMENT_SCORE = "DECREMENT_SCORE"


export function add ({ data, property }) {
  return {
    type: ADD,
    data,
    property
  };
}

export function edit ({ data, property }) {
  return {
    type: EDIT,
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
