import { useState } from 'react'
import axios from 'axios'

function CommentForm({ article_id, onCommentPosted }) {
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (!username.trim() || !body.trim()) {
      setError('Please fill out all fields.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(
        `https://be-nc-news-example-46vu.onrender.com/api/articles/${article_id}/comments`,
        { username, body }
      )
      setSuccess(true)
      setBody('')
      onCommentPosted(res.data.comment)
    } catch (err) {
      setError('Failed to post comment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 rounded p-4 shadow mb-6">
      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Add a Comment</h4>
      <input
        type="text"
        placeholder="Your username"
        className="w-full mb-2 p-2 rounded border border-gray-300 dark:border-gray-600"
        value={username}
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
      />
      <textarea
        placeholder="Write your comment"
        className="w-full mb-2 p-2 rounded border border-gray-300 dark:border-gray-600"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={3}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-pink-600 text-black px-4 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
      {success && <div className="mt-2 text-green-600">Comment posted!</div>}
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </form>
  )
}

export default CommentForm