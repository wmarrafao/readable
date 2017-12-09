export const fetchPosts = () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/posts`;

  let promise = fetch(
    url, {
      method: "GET",
      headers: { 'Authorization': 'readable', 'Content-Type': 'application/json' },
    }
  );
  return promise;
};

export const addPost = (post) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/posts`;
  fetch(
    url, {
      method: "POST",
      headers: { 'Authorization': 'readable', 'Content-Type': 'application/json' },
      body: post,
    }
  );
};

export const editPost = (id, updatedPost) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/posts/${id}`;
  console.log(url);
  fetch(
    url, {
      method: "PUT",
      headers: { 'Authorization': 'readable', 'Content-Type': 'application/json' },
      body: updatedPost,
    }
  );
}

export const updateScore = (id, data) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/posts/${id}`;
  fetch(
    url, {
      method: "POST",
      headers: { 'Authorization': 'readable', 'Content-Type': 'application/json' },
      body: data,
    }
  );
}

export const deletePost = (id) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/posts/${id}`;
  fetch(
    url, {
      method: "DELETE",
      headers: { 'Authorization': 'readable', 'Content-Type': 'application/json' },
    }
  );
}
