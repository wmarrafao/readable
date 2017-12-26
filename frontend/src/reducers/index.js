import {
  ADD,
  EDIT,
  REMOVE,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  RECEIVE_DATA,
  CLEAR_COMMENTS,
  SET_CURRENT_POST
} from '../actions'

function reducer(state = { posts:[], currentPost:{}, comments:[] }, action) {
  const { data, property, id } = action;

  switch (action.type) {
    case ADD:
      return {
        ...state,
        [property]: state[property].concat([data])
      };
    case EDIT:
      return {
        ...state,
        [property]: state[property].map((obj) => {
          if (obj.id === id) {
            return Object.assign({}, obj, data);
          }
          return obj;
        })
      };
    case REMOVE:
      return {
          ...state,
          [property]: state[property].map((obj) => {
          if (obj.id === id) {
            return Object.assign({}, obj, {
              deleted: true
            })
          }
          return obj;
        })
    }
    case INCREMENT_SCORE:
      return {
        ...state,
        [property]: state[property].map((obj) => {
          if (obj.id === id) {
            return Object.assign({}, obj, {
              voteScore: obj.voteScore+1
            })
          }
          return obj
        })
      }
    case DECREMENT_SCORE:
    return {
      ...state,
      [property]: state[property].map((obj) => {
        if (obj.id === id) {
          return Object.assign({}, obj, {
            voteScore: obj.voteScore-1
          })
        }
        return obj
      })
    }
    case RECEIVE_DATA:
      return {
        ...state,
        [property]: state[property].concat(data)
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        'comments': data,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        'currentPost': data,
      }
    default:
      return state;
  }
}


export default reducer
