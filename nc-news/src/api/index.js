const baseUrl = 'https://be-nc-news-example-46vu.onrender.com/api';

export const fetchArticles = async (params = '') =>
  fetch(`${baseUrl}/articles${params}`).then(res => res.json());

export const fetchArticleById = async (id) =>
  fetch(`${baseUrl}/articles/${id}`).then(res => res.json());

export const fetchTopics = async () =>
  fetch(`${baseUrl}/topics`).then(res => res.json());

export const fetchUsers = async () =>
  fetch(`${baseUrl}/users`).then(res => res.json());

export const fetchCommentsByArticle = async (id) =>
  fetch(`${baseUrl}/articles/${id}/comments`).then(res => res.json());

export const postComment = async (id, comment) =>
  fetch(`${baseUrl}/articles/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  }).then(res => res.json());

export const patchArticleVotes = async (id, inc_votes) =>
  fetch(`${baseUrl}/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inc_votes }),
  }).then(res => res.json());

export const deleteComment = async (comment_id) =>
  fetch(`${baseUrl}/comments/${comment_id}`, { method: 'DELETE' });